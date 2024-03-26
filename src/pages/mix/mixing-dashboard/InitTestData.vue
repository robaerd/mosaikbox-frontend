<template>
  <div>
    <va-button @click="injectTestData">Create Test Data</va-button>
  </div>
</template>

<script setup lang="ts">
  import {useGlobalStore} from "@/stores/global-store";
  import {storeToRefs} from "pinia";
  import {SongScheduleItemDto} from "@/dtos/SongScheduleItemDto";
  import {MixModel} from "@/dtos/AnalysisStartRequestDto";

  const globalStore = useGlobalStore()
  const { songSchedule } = storeToRefs(globalStore)


  const testData = [
    {
      position: 1,
      title: 'Song 1',
      startTime: 0.0,
      endTime: 60.4,
      totalStartTime: 0,
      totalEndTime: 60.4,
      crossoverStartDuration: 15,
      crossoverEndDuration: 15,
    },
    {
      position: 2,
      title: 'Song 2',
      startTime: 90.0,
      endTime: 201.0,
      totalStartTime: 60.4,
      totalEndTime: 120,
      crossoverStartDuration: 15,
      crossoverEndDuration: 15,
    },
    {
      position: 3,
      title: 'Song 3',
      startTime: 38.9,
      endTime: 103.45,
      totalStartTime: 120,
      totalEndTime: 192.54566743,
      crossoverStartDuration: 15,
      crossoverEndDuration: 15,
    },
    {
      position: 4,
      title: 'Song 4',
      startTime: 201.2,
      endTime: 250.1,
      totalStartTime: 192.54566743,
      totalEndTime: 300.2,
      crossoverStartDuration: 15,
      crossoverEndDuration: 15,
    },
    {
      position: 5,
      title: 'Song 5',
      startTime: 0.0,
      endTime: 60.4,
      totalStartTime: 300.2,
      totalEndTime: 380.2,
      crossoverStartDuration: 15,
      crossoverEndDuration: 15,
    },
    {
      position: 6,
      title: 'Song 6',
      startTime: 90.0,
      endTime: 201.0,
      totalStartTime: 380.2,
      totalEndTime: 440.2,
      crossoverStartDuration: 15,
      crossoverEndDuration: 15,
    },
    {
      position: 7,
      title: 'Song 7',
      startTime: 38.9,
      endTime: 103.45,
      totalStartTime: 440.2,
      totalEndTime: 510.2,
      crossoverStartDuration: 15,
      crossoverEndDuration: 15,
    },
    {
      position: 8,
      title: 'Song 8',
      startTime: 201.2,
      endTime: 250.1,
      totalStartTime: 510.2,
      totalEndTime: 600.2,
      crossoverStartDuration: 15,
      crossoverEndDuration: 15,
    },
    // Add more songs as needed
  ]

  const songScheduleItemDtos: SongScheduleItemDto[] = testData.map(item => ({
    audio_path: `path/to/song/${item.title}`,
    mashability: 0.5,
    start_time: item.startTime,
    end_time: item.endTime,
    total_play_time_start: item.totalStartTime,
    total_play_time_end: item.totalEndTime,
    original_tempo: 120,
    target_tempo: 100,
    original_key: '3A',
    target_key: '4A',
    key_shift: 2,
    h_contr: 0.3,
    l_contr: 0.4,
    r_contr: 0.5,
    timbral_contr: 0.6,
    segment_factor: 0.7,
    mix_model: MixModel.MOSAIKBOX
  }));

  function injectTestData() {
    globalStore.setSongSchedule(songScheduleItemDtos)
  }
</script>
