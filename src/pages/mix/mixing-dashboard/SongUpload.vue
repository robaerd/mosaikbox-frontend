<template>
  <va-card class="flex dashboard-song-upload">
    <va-card-title> Upload Songs </va-card-title>
    <va-card-content>
      <va-file-upload
        v-model="uploadedSongs"
        dropzone
        file-types=".mp3, .m4a, .flac, .wav"
        drop-zone-text="Drop songs here"
        upload-button-text="Select songs"
      />



    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
import {computed, inject, ref, watchEffect} from 'vue'
import {useToast} from 'vuestic-ui'
import {
  cancelMixingSession,
  getMixStatus,
  requestMixingSession,
  startAnalysis,
  uploadAudioFile
} from '@/services/mixService';
import {AnalysisStartRequestDto} from '@/dtos/AnalysisStartRequestDto';
import {useGlobalStore} from "@/stores/global-store";
import {AnalysisStatusDto} from "@/dtos/AnalysisStatusDto";
import {AnalysisState} from "@/dtos/AnalysisState";
import {INJECTION_KEYS_MIXING} from "@/constants/injection-keys";
import {storeToRefs} from "pinia";

  const globalStore = useGlobalStore();
  const {mixSessionId, uploadedSongs, mixGenerationState} = storeToRefs(globalStore)




  function selectStartSong(name: string) {
    //selectedFileName.value = name
    // initToast({
    //   message: `Starting song: ${name}`,
    //   position: 'bottom-right',
    // })
  }



  const filterSongs = () => {
    // This function is triggered on input but the actual filtering is handled by the computed property
  }
</script>

<style>
  /* Add your styles here */
  .dashboard-song-upload {
    flex-direction: column;

    .inner-loading {
      height: 100%;
    }
  }
</style>
