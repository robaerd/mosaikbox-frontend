<template>
  <div class="dashboard">
    <song-timeline />
    <dashboard-charts />

    <div class="flex justify-center mt-2">
      <va-button
        class="mr-2"
        size="small"
        preset="plain"
        href="https://www.iubenda.com/privacy-policy/19055770"
        title="Privacy Policy"
      >
        Privacy Policy
      </va-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, provide, ref} from 'vue'

  import DashboardCharts from './MixingDashboardCharts.vue'
  import SongTimeline from './SongTimeline.vue'
  import InitTestData from './InitTestData.vue'
  import {INJECTION_KEYS_MIXING} from "@/constants/injection-keys";
  import {useGlobalStore} from "@/stores/global-store";


// publish songs
  // const songs = ref([]) // Your shared data
  // provide(INJECTION_KEYS_MIXING.songSchedule, songs)
  // publish selected song in graph
  const selectedSong = ref(null)
  provide(INJECTION_KEYS_MIXING.selectedSong, selectedSong)
  // publish uploaded audio files
  // const uploadedSongList = ref([])
  // provide(INJECTION_KEYS_MIXING.uploadedSongList, uploadedSongList)
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
