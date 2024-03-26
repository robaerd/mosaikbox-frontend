<template>
<!--  <va-card class="flex dashboard-selected-song-detail" v-if="uploadedSongList?.length == 0">-->
  <va-card class="col-span-12 lg:col-span-6 p-4">

<!--    only if list not empty-->
    <va-list class="py-4">

      <va-list-label>
        Mix Generation Model
      </va-list-label>
      <div class="flex md:col-span-6 col-span-12">
        <va-select
          v-model="mixModelSelectModel"
          text-by="description"
          track-by="id"
          :options="mixModelOptions"
        />
      </div>

      <div v-if="mixModelSelectModel.id === mixModelOptions[0].id">
        <va-list-separator fit spaced />

        <va-list-label>
          Contextual Similarity
        </va-list-label>

        <va-list-item class="mb-2">
          <va-checkbox v-model="mixToggleSettings.contextualSimilarity" class="mr-2" />
          <va-list-item-section>
            <va-list-item-label>Contextual Similarity</va-list-item-label>
            <va-list-item-label caption>Uses contextual information in addition to audio-based information for the mix generation</va-list-item-label>
          </va-list-item-section>
        </va-list-item>

        <va-list-separator fit spaced />

        <va-list-label>
           Stem Removal
        </va-list-label>
        <va-list-item class="mb-2">
          <va-checkbox v-model="mixToggleSettings.drumStemRemoval" class="mr-2" />
          <va-list-item-section>
            <va-list-item-label>Drum Removal</va-list-item-label>
            <va-list-item-label caption>Removes drum stems to ensure a smooth transition if the rhythmic compatibility is low</va-list-item-label>
          </va-list-item-section>
        </va-list-item>
        <va-list-item class="mb-2">
          <va-checkbox v-model="mixToggleSettings.vocalClashRemoval" class="mr-2" />
          <va-list-item-section>
            <va-list-item-label>Vocal Clashing Removal</va-list-item-label>
            <va-list-item-label caption>Removes vocal stems to ensure a smooth transition if vocal clashing occurs</va-list-item-label>
          </va-list-item-section>
        </va-list-item>
      </div>

    </va-list>
    <va-alert v-model="mixGenerationIsError" class="w-full" color="danger" closeable>
      <template #icon>
        <va-badge color="danger" text="Mix generation failed" />
      </template>
        {{ mixGenerationErrorMessage }}
    </va-alert>
    <va-alert v-model="shouldShowMixCompletedAlert" class="w-full" color="info" closeable>
      <template #icon>
        <va-badge color="info" text="Mix generation completed" />
      </template>
      You can now view the song schedule and listen to the mix.
    </va-alert>

    <div class="flex md:col-span-4 col-span-12 mb-4" v-if="shouldShowProgressBar">
      <va-progress-bar :model-value="getMixProgress()">{{ getMixProgressText() }}</va-progress-bar>
    </div>

    <va-button v-if="!shouldShowProgressBar" class="mb-2 mr-2" @click="showSelectStartSongModal = true" :disabled="uploadedSongs.length == 0"> Generate Mix </va-button>
    <va-button v-if="shouldShowProgressBar" color="danger" class="mb-2 mr-2" @click="cancelAnalysis"> Cancel Mix </va-button>

    <va-modal
      v-model="showSelectStartSongModal"
      :title="'Start Song'"
      :message="'Select the song you want to start the mix with.'"
      :ok-text="'Generate Mix'"
      :cancel-text="'Cancel'"
      @ok="analyse"
      blur
    >
      <va-input v-model="searchTerm" placeholder="Search for song" />
      <va-list class="py-4">
        <va-list-label> Songs </va-list-label>

        <template v-for="(file, i) in filteredSongs" :key="file.name">
          <va-list-item>
            <va-radio v-model="selectedFileName" :option="file.name">
              <va-list-item-section>
                <va-list-item-label>
                  {{ file.name }}
                </va-list-item-label>

                <va-list-item-label caption>
                  {{ humanFileSize(file.size) }}
                </va-list-item-label>
              </va-list-item-section>
            </va-radio>
          </va-list-item>

          <va-list-separator v-if="i < filteredSongs.length - 1" :key="'separator' + file.name" class="my-1" fit />
        </template>
      </va-list>
    </va-modal>

  </va-card>
</template>

<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {storeToRefs} from "pinia";
import {useGlobalStore} from "@/stores/global-store";
import {AnalysisState} from "@/dtos/AnalysisState";
import {
  cancelMixingSession,
  getMixStatus,
  getSongSchedule,
  requestMixingSession,
  startAnalysis,
  startMixing,
  uploadAudioFile
} from "@/services/mixService";
import {AnalysisStartRequestDto, MixModel} from "@/dtos/AnalysisStartRequestDto";
import {useToast} from "vuestic-ui";
import {timeout, useTask} from "vue-concurrency";
import {MixStartRequestDto} from "@/dtos/MixStartRequestDto";

const globalStore = useGlobalStore()
const { songSchedule, mixSessionId, uploadedSongs, mixGenerationState, mixGenerationIsError, mixGenerationErrorMessage } = storeToRefs(globalStore)
const mixGenerationStarted = computed(() => mixGenerationState.value != AnalysisState.NOT_STARTED)
const shouldShowProgressBar = computed(() => mixGenerationState.value != AnalysisState.NOT_STARTED && mixGenerationState.value != AnalysisState.COMPLETED && mixGenerationState.value != AnalysisState.FAILED && mixGenerationState.value != AnalysisState.CANCELLED)

const { init: initToast } = useToast();

const shouldShowMixCompletedAlert = ref(false)
const mixToggleSettings = ref({
  contextualSimilarity: false,
  drumStemRemoval: true,
  vocalClashRemoval: true,
})

const mixModelOptions = ref([
  {
    id: 1,
    description: 'Mosaikbox (Default)',
    enumValue: MixModel.MOSAIKBOX
  },
  {
    id: 2,
    description: 'Automatic MashUpper (AMU)',
    enumValue: MixModel.AMU

  }
])

const mixModelSelectModel = ref(mixModelOptions.value[0])

const showSelectStartSongModal = ref(false)
const searchTerm = ref('')
const selectedFileName = ref('')

  // let mixStatus = ref<AnalysisStatusDto>()


function getMixProgress(): number {
  switch (mixGenerationState.value) {
    case AnalysisState.STARTED:
      return 0/8;
    case AnalysisState.UPLOAD:
      return 100/8;
    case AnalysisState.LYRICS_DOWNLOADING:
      return 200/8;
    case AnalysisState.MSS:
      return 300/8;
    case AnalysisState.ANALYSIS:
      return 400/8;
    case AnalysisState.SCHEDULING:
      return 500/8;
    case AnalysisState.WAITING_FOR_MIXING:
      return 600/8;
    case AnalysisState.MIXING:
      return 700/8;
    case AnalysisState.COMPLETED:
      return 800/8;

    default:
      return 0;
  }
}

function getMixProgressText(): string {
  switch (mixGenerationState.value) {
    case AnalysisState.STARTED:
      return "Mix started";
    case AnalysisState.UPLOAD:
      return "Uploading audio files";
    case AnalysisState.LYRICS_DOWNLOADING:
      return "Downloading lyrics";
    case AnalysisState.MSS:
      return "Seperating stems";
    case AnalysisState.ANALYSIS:
      return "Analyzing songs";
    case AnalysisState.SCHEDULING:
      return "Scheduling songs";
    case AnalysisState.WAITING_FOR_MIXING:
      return "Waiting for mixing";
    case AnalysisState.MIXING:
      return "Mixing songs";
    case AnalysisState.COMPLETED:
      return "Mix completed";

    default:
      return "Mix not started";
  }
}

const cancelAnalysis = async () => {
  console.log("Canceling mix session")
  try {
    await cancelMixingSession(mixSessionId.value);
    notify("Mix canceled.");
  } catch (error) {
    console.error('Error canceling mix session:', error);
    notifyError("Error while canceling mix session: " + error.message)
  }
};


const analyse = async () => {
  console.log("Requesting mix session")
  const dto: AnalysisStartRequestDto = {
    start_song_name: selectedFileName.value,
    is_contextual_information_enabled: mixToggleSettings.value.contextualSimilarity,
    mix_model: mixModelSelectModel.value.enumValue

  };
  try {
    const session_id = await requestMixingSession();
    console.log("Registered mix session with id: " + session_id)
    notify("Registered Mix. Watiting for audio upload.");

    getMixStatusLoop.perform()

    // fixme: comment in after testing
    for(let file of uploadedSongs.value) {
      console.log("Uploading file: " + file.name);
      await uploadAudioFile(file, session_id);
      notify("Uploaded file: " + file.name);
      // TODO: change to progress bar
    }
    notify("All files uploaded. Starting analysis.");
    await startAnalysis(session_id, dto);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      // Now TypeScript knows that error is an Error object and you can access its properties
      notifyError("Error while starting mix analysis: " + error.message);
    } else {
      // Handle cases where the error is not an Error object
      notifyError("An unknown error occurred while starting mix analysis.");
    }
  }
};

watch(() => mixGenerationState.value,  async (newVal, oldVal) => {
  console.log('mixGenerationState changed from', oldVal, 'to', newVal)
  if (newVal == AnalysisState.WAITING_FOR_MIXING) {
    console.log("Starting mixing")
    const dto: MixStartRequestDto = {
      is_drum_removal_enabled: mixToggleSettings.value.drumStemRemoval,
      is_vocal_removal_enabled: mixToggleSettings.value.vocalClashRemoval,
      mix_model: mixModelSelectModel.value.enumValue
    }
    await startMixing(mixSessionId.value, dto);
  }
});

const getMixStatusLoop = useTask(function* (signal) {
  console.log("Starting mix status loop")
  let mixingStarted = false;
  let scheduleDownloaded = false;
  globalStore.setMixGenerationState(AnalysisState.STARTED)
  while (mixGenerationState.value != AnalysisState.COMPLETED && mixGenerationState.value != AnalysisState.FAILED && mixGenerationState.value != AnalysisState.NOT_STARTED && mixGenerationState.value != AnalysisState.CANCELLED) {
    try {
      console.log("Getting mix status")
      const mixStatusDto = yield getMixStatus(mixSessionId.value);
      console.debug("Mix state: " + mixStatusDto.state);
      if (mixStatusDto.state == AnalysisState.FAILED) {
        console.error("Mix failed: " + mixStatusDto.error_message);
        const error_message: string = mixStatusDto.error_message ?? "Unknown error occurred";
        globalStore.setMixGenerationErrorMessage(error_message);
        globalStore.setMixGenerationIsError(true);
      }
      globalStore.setMixGenerationState(mixStatusDto.state);
      if (mixStatusDto.state == AnalysisState.COMPLETED) {
        shouldShowMixCompletedAlert.value = true;
      }
      if (mixStatusDto.state == AnalysisState.CANCELLED) {
        notify("Mix generation successfully canceled");
      }

      // if (mixStatusDto.stat == AnalysisState.WAITING_FOR_MIXING && !mixingStarted) {
      //   console.log("Starting mixing")
      //   mixingStarted = true;
      //   const dto: MixStartRequestDto = {
      //     is_drum_removal_enabled: mixToggleSettings.value.drumStemRemoval,
      //     is_vocal_removal_enabled: mixToggleSettings.value.vocalClashRemoval
      //   }
      //   startMixing(mixSessionId.value, dto);
      // }

      // if (mixStatusDto.state in [AnalysisState.WAITING_FOR_MIXING, AnalysisState.MIXING, AnalysisState.COMPLETED] && !scheduleDownloaded) {
      //   console.log("Downloading schedule")
      //   scheduleDownloaded = true;
      //   const songSchedule = await getSongSchedule(mixSessionId.value);
      //   globalStore.setSongSchedule(songSchedule);
      // }
    } catch (error) {
      console.error('Error getting mix status:', error);
      notifyError("Error while getting mix status: " + error.message);
    }

    // Delay for 4 seconds before the next loop
    yield timeout(4000);
  }
  console.log("Mix status loop ended with state: " + mixGenerationState.value)
});

function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

  return bytes.toFixed(dp) + ' ' + units[u]
}

const filteredSongs = computed(() => {
  if (!searchTerm.value) {
    return uploadedSongs.value
  }
  return uploadedSongs.value.filter((file) => file.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

function notify(message: string) {
  initToast({
    message: message,
    position: 'bottom-right',
  })
}

function notifyError(message: string) {
  initToast({
    message: message,
    position: 'bottom-right',
    color: 'danger',
  })
}

</script>

<style scoped lang="scss">
  .dashboard-selected-song-detail {
    flex-direction: column;
  }

  .checkbox-container > * {
    margin-bottom: 15px;  // adjust this value as needed
  }

</style>
