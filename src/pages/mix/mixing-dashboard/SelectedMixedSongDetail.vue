<template>
  <va-card class="flex dashboard-selected-song-detail">
    <va-card-title>
      <h1>Song Details</h1>
    </va-card-title>

    <va-card-content class="overflow-auto" v-if="selectedSong != null">
      <table class="va-table va-table--striped va-table--hoverable w-full">
        <tbody>
        <tr>
          <td>Title</td>
          <td>{{ getFilename(selectedSong.audio_path) }}</td>
        </tr>
        <tr>
          <td>Start time</td>
          <td>{{convertSeconds( selectedSong.start_time)}}</td>
        </tr>
        <tr>
          <td>End time</td>
          <td>{{convertSeconds( selectedSong.end_time)}}</td>
        </tr>
        <tr>
          <td>Mixability</td>
          <td>{{ selectedSong.mashability.toFixed(3) }}</td>
        </tr>
        <tr>
          <td>Harmonic similarity</td>
          <td>{{ selectedSong.h_contr.toFixed(3) }}</td>
        </tr>
        <tr>
          <td>Spectral balance</td>
          <td>{{ selectedSong.l_contr.toFixed(3) }}</td>
        </tr>
        <tr>
          <td>Rhythmic similarity</td>
          <td>{{ selectedSong.r_contr.toFixed(3) }}</td>
        </tr>
        <tr>
          <td>Timbral similarity</td>
          <td>{{ selectedSong.timbral_contr.toFixed(3) }}</td>
        </tr>
        <tr>
          <td>Original key</td>
          <td>{{ selectedSong.original_key }}</td>
        </tr>
        <tr>
          <td>Target key</td>
          <td>{{ selectedSong.target_key }} {{ getShiftAmountString(selectedSong.key_shift) }}</td>
        </tr>
        <tr>
          <td>Original tempo</td>
          <td>{{ selectedSong.original_tempo }}</td>
        </tr>
        <tr>
          <td>Target tempo</td>
          <td>{{ selectedSong.target_tempo }}</td>
        </tr>
        </tbody>
      </table>
    </va-card-content>
<!--    <va-card-content v-if="selectedSong != null">-->
<!--      <p class="mt-2">testooo test</p>-->
<!--      <p>Title: {{ selectedSong.title }}</p>-->
<!--      <p>Start Time: {{ selectedSong.startTime }}</p>-->
<!--      <p>End Time: {{ selectedSong.endTime }}</p>-->
<!--    </va-card-content>-->
    <va-card-content class="center-content" v-else>
      <p class="center-text">Select a song from the schedule</p>
    </va-card-content>
  </va-card>
</template>

<script setup>
  import { inject } from 'vue'
  import {INJECTION_KEYS_MIXING} from "@/constants/injection-keys";
  import {useGlobalStore} from "@/stores/global-store";
  import {storeToRefs} from "pinia";

  const selectedSong = inject(INJECTION_KEYS_MIXING.selectedSong)

  // function that returns the filename of a path
  const getFilename = (path) => {
    return path.split('/').pop();
  }

  const getShiftAmountString = (shiftAmount) => {
    if (shiftAmount === 0) {
      return ''
    }
    if (shiftAmount > 0) {
      return `(+${shiftAmount})`
    } else {
      return `(${shiftAmount})`
    }
  }

  function convertSeconds(inputSeconds) {
    // Extract minutes
    const minutes = Math.floor(inputSeconds / 60);

    // Extract remaining seconds
    const seconds = Math.floor(inputSeconds % 60);

    // Extract milliseconds (rounded to the nearest whole number)
    const milliseconds = Math.round((inputSeconds - Math.floor(inputSeconds)) * 1000);

    // Format the output
    return `${minutes}:${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  }



</script>

<style scoped lang="scss">
  .dashboard-selected-song-detail {
    flex-direction: column;

    .inner-loading {
      height: 100%;
    }
  }

  .center-content {
    position: relative;
    height: 100%;                 /* parent height */
  }
  .center-text {
    text-align: center;
  }
</style>
