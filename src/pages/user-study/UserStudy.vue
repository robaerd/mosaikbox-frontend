<template>
  <h1 class="mb-3 song-title" v-if="survey.currentPage.jsonObj.modelNum != null">
    Model {{ survey.currentPage.jsonObj.modelNum + 1 }} / 4
  </h1>

  <div class="rounded-rectangle-outer mb-5" v-if="pageHasSong1 && pageHasSong2">
    <div class="rounded-rectangle" :style="`--font-color: ${colors.textPrimary}`">
      <div v-if="pageHasSong1">
        <p class="mb-4 song-title">{{ survey.currentPage.jsonObj.songName1 }}</p>
        <audio-waveform-player :audio-url="songUrl1" :key="audioPlayer1RenderKey" />
      </div>
      <va-divider class="m-5 pt-2 px-2" />
      <div v-if="pageHasSong2">
        <p class="mb-4 song-title">{{ survey.currentPage.jsonObj.songName2 }}</p>
        <audio-waveform-player :audio-url="songUrl2" :key="audioPlayer2RenderKey" />
      </div>
    </div>
  </div>

  <div class="rounded-rectangle-outer" v-if="pageHasSchedule">
    <div class="dashboard">
      <song-timeline-view :song-schedule="songSchedule" :audio-url="audioUrl" />
    </div>
  </div>
  <SurveyComponent :model="survey" />
</template>

<script async setup lang="ts">
  import 'survey-core/defaultV2.css'
  import { Model } from 'survey-core'
  import { HollowDotsSpinner } from 'epic-spinners'
  import { computed, inject, onMounted, provide, ref, watch } from 'vue'
  import { useAVWaveform } from 'vue-audio-visual'
  import { INJECTION_KEYS_MIXING } from '@/constants/injection-keys'
  import { useColors, useToast } from 'vuestic-ui'
  import AudioWaveformPlayer from '@/pages/user-study/AudioWaveformPlayer.vue'
  import { downloadSongAudioAndReturnUrl, removeDownloadedAudio, uploadSurveyResults } from '@/services/surveyService'
  import { themeJson } from '@/pages/user-study/themeJson'
  import { Converter } from 'showdown'
  import InitTestData from '@/pages/mix/mixing-dashboard/InitTestData.vue'
  import SongTimeline from '@/pages/mix/mixing-dashboard/SongTimeline.vue'
  import SelectedMixedSongDetail from '@/pages/mix/mixing-dashboard/SelectedMixedSongDetail.vue'
  import SongTimelineView from '@/pages/mix/mixing-dashboard/SongTimelineView.vue'
  import { SongScheduleItemDto } from '@/dtos/SongScheduleItemDto'
  import { downloadMixAudioAndReturnUrl, getSongSchedule } from '@/services/mixService'
  import { clearSurveyOrder, generateSurvey } from '@/services/surveyCreationService'
  // import { Survey } from "survey-vue3-ui"

  const { colors } = useColors()

  // re-render the whole component to get a clean state after changing the audio url
  const audioPlayer1RenderKey = ref(1)
  const audioPlayer2RenderKey = ref(-1)

  const spinnerConfig = ref({
    size: 70,
    duration: 1000,
    color: colors.primary,
  })

  const { init: initToast } = useToast()

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

  const songUrl1 = ref(null)
  const songUrl2 = ref(null)

  const storageItemKey = 'my-survey'

  const surveyJson = await generateSurvey()
  console.log(surveyJson)
  const survey = new Model(surveyJson)
  survey.applyTheme(themeJson)
  //Create showdown markdown converter
  let converter = new Converter()
  survey.onTextMarkdown.add(function (survey, options) {
    //convert the markdown text to html
    let str = converter.makeHtml(options.text)
    //remove root paragraphs <p></p>
    str = str.substring(3)
    str = str.substring(0, str.length - 4)
    //set html
    options.html = str
  })

  function saveSurveyData(survey) {
    const data = survey.data
    data.pageNo = survey.currentPageNo
    window.localStorage.setItem(storageItemKey, JSON.stringify(data))
  }

  survey.onComplete.add(async (sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3))
    console.log(sender.data)
    try {
      await uploadSurveyResults(sender.data)
    } catch (e) {
      notifyError(
        'Failed to upload survey results. Your results have been saved locally. Please reload this survey and try again.',
      )
      throw e
    }
    // Empty the local storage after the survey is completed
    clearSurveyOrder()
    window.localStorage.setItem(storageItemKey, '')
  })

  const pageHasSong1 = computed(() => {
    return survey.currentPage.jsonObj.songName1 != null
  })

  const pageHasSong2 = computed(() => {
    return survey.currentPage.jsonObj.songName2 != null
  })

  const pageHasSchedule = computed(() => {
    return survey.currentPage.jsonObj.isSchedulePage != null && survey.currentPage.jsonObj.isSchedulePage
  })

  survey.onValueChanged.add(saveSurveyData)
  survey.onCurrentPageChanged.add(async (sender, options) => {
    console.log('current page changed')
    console.log('saving survey data')
    saveSurveyData(sender)

    console.log('Removing songUrl1 and songUrl2')
    if (songUrl1.value != null) {
      removeDownloadedAudio(songUrl1.value)
      songUrl1.value = null
      audioPlayer1RenderKey.value += 1
    }
    if (songUrl2.value != null) {
      removeDownloadedAudio(songUrl2.value)
      songUrl2.value = null
      audioPlayer2RenderKey.value -= 1
    }

    const sessionId = sender.currentPage.jsonObj.sessionId
    if (sender.currentPage.jsonObj.songName1 != null) {
      console.log('downloading audio for song preview 1')
      const songName1 = sender.currentPage.jsonObj.songName1
      songUrl1.value = await downloadSongAudioAndReturnUrl(sessionId, songName1)
    }
    if (sender.currentPage.jsonObj.songName2 != null) {
      const songName2 = sender.currentPage.jsonObj.songName2
      console.log('downloading audio for song preview 2')
      songUrl2.value = await downloadSongAudioAndReturnUrl(sessionId, songName2)
    }

    console.log('Removing songSchedule and audioUrl')
    songSchedule.value = []
    audioUrl.value = null

    if (sender.currentPage.jsonObj.isSchedulePage) {
      try {
        songSchedule.value = await getSongSchedule(sessionId)
      } catch (e) {
        notifyError('Failed to load song schedule')
      }
      try {
        audioUrl.value = await downloadMixAudioAndReturnUrl(sessionId)
      } catch (e) {
        notifyError('Failed to load audio mix')
      }
    }
  })

  // Restore survey results
  const prevData = window.localStorage.getItem(storageItemKey) || null
  if (prevData) {
    const data = JSON.parse(prevData)
    survey.data = data
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo
    }
  }
</script>

<style scoped>
  .rounded-rectangle {
    background-color: white;
    border-radius: 5px;
    width: auto;
    height: auto;
    padding: 40px; /* Padding for medium and larger screens */
  }

  @media (max-width: 576px) {
    /* Vuestic's breakpoint for small screens might be different */
    .rounded-rectangle {
      background-color: white;
      border-radius: 5px;
      width: auto;
      height: auto;
      padding: 24px; /* Padding for medium and larger screens */
    }
  }

  .rounded-rectangle-outer {
    background-color: rgb(243, 243, 243);
    border-radius: 5px;
    width: auto;
    height: auto;
    padding: 40px; /* Padding for medium and larger screens */
  }

  @media (max-width: 576px) {
    /* Vuestic's breakpoint for small screens might be different */
    .rounded-rectangle-outer {
      background-color: rgb(243, 243, 243);
      border-radius: 5px;
      width: auto;
      height: auto;
      padding: 24px; /* Padding for medium and larger screens */
    }
  }

  .song-title {
    font-size: 18px; /* Increase the font size */
    color: var(--font-color);
    font-weight: bold; /* Make the text bold */
    text-transform: uppercase; /* Convert text to uppercase */
    letter-spacing: 1px; /* Increase spacing between letters */
  }
</style>
