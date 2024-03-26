<template>
  <div class="pt-6 grid grid-cols-12 gap-6">
    <selected-mixed-song-detail class="col-span-12 sm:col-span-6 lg:col-span-6" v-if="songSchedule.length > 0" />
    <song-upload class="col-span-12 sm:col-span-6 lg:col-span-6" />
    <config-and-start-mix-generation class="col-span-12 sm:col-span-6 lg:col-span-6" />
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  import SelectedMixedSongDetail from './SelectedMixedSongDetail.vue'
  import SongUpload from './SongUpload.vue'
  import ConfigAndStartMixGeneration from "@/pages/mix/mixing-dashboard/ConfigAndStartMixGeneration.vue";
  import {useGlobalStore} from "@/stores/global-store";
  import {storeToRefs} from "pinia";

  const globalStore = useGlobalStore()

  const { songSchedule } = storeToRefs(globalStore)

  const { t } = useI18n()
</script>

<style scoped>
  .chart {
    height: 400px;
  }
</style>
