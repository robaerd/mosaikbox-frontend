<template>
  <div class="dashboard">
    <song-timeline-view :song-schedule="songSchedule" :audio-url="audioUrl" />
    <div class="pt-6 grid grid-cols-12 gap-6">
    <selected-mixed-song-detail class="col-span-12 sm:col-span-6 lg:col-span-6" v-if="songSchedule.length > 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, provide, ref} from 'vue'

import {INJECTION_KEYS_MIXING} from "@/constants/injection-keys";
import SongTimelineView from "@/pages/mix/mixing-dashboard/SongTimelineView.vue";
import {downloadMixAudioAndReturnUrl, getSongSchedule} from "@/services/mixService";
import {SongScheduleItemDto} from "@/dtos/SongScheduleItemDto";
import SelectedMixedSongDetail from "@/pages/mix/mixing-dashboard/SelectedMixedSongDetail.vue";
import {useToast} from "vuestic-ui";

const props = defineProps({
  mixSessionId: {
    type: String,
    required: true
  }
});

const { init: initToast } = useToast();

function notifyError(message: string) {
  initToast({
    message: message,
    position: 'bottom-right',
    color: 'danger',
  })
}

const songSchedule = ref([] as SongScheduleItemDto[])
const audioUrl = ref(null as string | null)

const selectedSong = ref(null)
provide(INJECTION_KEYS_MIXING.selectedSong, selectedSong)

onMounted(async () => {
  try {
    songSchedule.value = await getSongSchedule(props.mixSessionId)
  } catch (e) {
    notifyError("Failed to load song schedule")
  }
  try {
    audioUrl.value = await downloadMixAudioAndReturnUrl(props.mixSessionId);
  } catch (e) {
    notifyError("Failed to load audio mix")
  }
})


</script>

<style lang="scss">
.dashboard {
  .va-card {
    margin-bottom: 0 !important;
    &__title {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
