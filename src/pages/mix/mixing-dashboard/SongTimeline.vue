<template>
  <div v-if="songSchedule.length > 0">
    <song-timeline-view :audio-url="audioUrl" :song-schedule="songSchedule"/>
  </div>
</template>

<script setup>
import {ref, inject, watch, computed, onMounted} from 'vue'
import {GChart} from 'vue-google-charts'
import {INJECTION_KEYS_MIXING} from "@/constants/injection-keys"
import {useGlobalStore} from '@/stores/global-store'
import {storeToRefs} from "pinia"
import {AnalysisState} from "@/dtos/AnalysisState";
import {downloadMixAudioAndReturnUrl, getMixAudio, getSongSchedule} from "@/services/mixService";
import {AVWaveform, useAVWaveform} from 'vue-audio-visual'
import {useAVBars} from 'vue-audio-visual'
import SongTimelineView from "@/pages/mix/mixing-dashboard/SongTimelineView.vue";

const globalStore = useGlobalStore()

const audioUrl = ref(null)


const {songSchedule, mixGenerationState, mixSessionId} = storeToRefs(globalStore)

// Injecting songs from parent component
// Inject selected song from parent component
const selectedSong = inject(INJECTION_KEYS_MIXING.selectedSong)

watch(() => mixGenerationState.value, async (newVal, oldVal) => {
  console.debug('mixGenerationState changed from', oldVal, 'to', newVal)
  if ((newVal === AnalysisState.WAITING_FOR_MIXING || newVal === AnalysisState.MIXING || newVal === AnalysisState.COMPLETED) && songSchedule.value.length === 0) {
    const songSchedule = await getSongSchedule(mixSessionId.value);
    globalStore.setSongSchedule(songSchedule);
  }
  if (newVal === AnalysisState.COMPLETED) {
    audioUrl.value = await downloadMixAudioAndReturnUrl(mixSessionId.value)
  }
});

</script>

<style scoped>

</style>
