<template>
  <div class="grid grid-cols-1" v-if="props.songSchedule.length > 0">
    <va-card class="grid grid-cols-1">
      <va-card-title>
        <h1>Mix timeline</h1>
      </va-card-title>
      <va-card-content>
        <GChart
          style="padding-right: 35px"
          :settings="{ packages: ['timeline'] }"
          type="Timeline"
          :data="chartData"
          :options="chartOptions"
          @ready="onChartReady"
        />

        <div style="display: flex; align-items: center; width:100%">
          <button
            @click="togglePlayPause"
            style="margin-left: 15px; margin-right: 10px; width: 5%; background: none; border: none; padding: 0; display: flex; align-items: center; justify-content: center;"
            v-if="props.audioUrl != null"
          >
            <va-icon v-if="isPlaying" name="fa-pause" size="large"/>
            <va-icon v-else name="fa-play" size="large"/>
          </button>

          <div ref="parentDiv" style="width:90%">
            <div ref="audioWaveDiv" v-if="props.audioUrl != null" :key="audioWaveRerenderKey">
              <audio ref="player" :src="props.audioUrl"/>
              <canvas ref="canvas" :width="canvWidth"/>
            </div>
          </div>
          <a :href="props.audioUrl" download style="margin-left: 10px" v-if="props.audioUrl != null">
            <button>
              <va-icon name="fa-download"/>
            </button>
          </a>
        </div>
        <div v-if="props.audioUrl == null">
          <p :style="{'margin': 'auto', 'text-align': 'center', 'margin-bottom': '10px', color: colors.secondary}">Loading audio</p>
          <HollowDotsSpinner style="margin: auto" :color='spinnerConfig.color' :animation-duration="spinnerConfig.duration" :size="spinnerConfig.size"/>
        </div>

      </va-card-content>
    </va-card>
  </div>
</template>

<script setup>
import {ref, inject, watch, computed, onMounted} from 'vue'
import {GChart} from 'vue-google-charts'
import {INJECTION_KEYS_MIXING} from "@/constants/injection-keys"
import {useAVWaveform} from 'vue-audio-visual'
import {HollowDotsSpinner} from "epic-spinners";
import {useColors} from "vuestic-ui";


const props = defineProps({
  songSchedule: {
    type: Array
  },
  audioUrl: {
    type: String,
  },
});

console.debug('song-timeline-view: props', props)

const { getColor, colors } = useColors()

const spinnerConfig = ref({
  size: 70,
  duration: 1000,
  color: colors.primary,
})


// const audioUrl = ref(null)
const player = ref(null)
const canvas = ref(null)
const parentDiv = ref(null)
const audioWaveRerenderKey = ref(0)

const isPlaying = ref(false)

const togglePlayPause = () => {
  if (player.value.paused) {
    player.value.play();
    isPlaying.value = true;
  } else {
    player.value.pause();
    isPlaying.value = false;
  }
};

const canvWidth = ref(400);

onMounted(() => {
  window.addEventListener('resize', () => {
    if (parentDiv.value != null) {
      canvWidth.value = parentDiv.value.offsetWidth;
      canvas.value = null
      player.value = null
      useAVWaveform(player, canvas, {
        src: props.audioUrl,
        canvHeight: 40,
        canvWidth: canvWidth.value,
        playtimeSlider: true,
        playtimeWithMs: false,
        audioControls: false,
        playedLineColor: colors.secondary,
        noplayedLineColor: colors.primary,
      })
      audioWaveRerenderKey.value += 1
      console.log('canvWidth-event', canvWidth.value)
    }
  });

});



// Injecting songs from parent component
// Inject selected song from parent component
const selectedSong = inject(INJECTION_KEYS_MIXING.selectedSong)


watch(() => props.audioUrl, (newVal, oldVal) => {
  console.log('audioUrl changed from', oldVal, 'to', newVal)
  if (newVal != null && parentDiv.value != null) {
    // TODO: handle case where parentDiv.value is null -> otherwise this does not get rendered!!!
    canvWidth.value = parentDiv.value.offsetWidth;
    useAVWaveform(player, canvas, {
      src: props.audioUrl,
      canvHeight: 40,
      canvWidth: canvWidth.value,
      playtimeSlider: true,
      playtimeWithMs: false,
      audioControls: false,
      playedLineColor: colors.secondary,
      noplayedLineColor: colors.primary,
    })
    audioWaveRerenderKey.value += 1
    console.log('player', player)
    console.log('player-type', typeof player)
  }
});

// Reactive state
const chartData = ref(null)
const chartOptions = ref({
  height: 165,
  tooltip: {isHtml: true},
  hAxis: {
    title: 'Time',
    format: 'mm:ss',
    gridlines: {count: 15},
  },
  alternatingRowStyle: false,
  colors: ['#1C8D88', '#5FC3BD'],
})

// Methods
const onChartReady = (chart, google) => {
  const dataTable = new google.visualization.DataTable()
  dataTable.addColumn({type: 'string', id: 'Task ID'})
  dataTable.addColumn({type: 'string', id: 'Song Title'})
  dataTable.addColumn({type: 'string', role: 'tooltip', p: {html: true}})
  dataTable.addColumn({type: 'date', id: 'Start'})
  dataTable.addColumn({type: 'date', id: 'End'})

  dataTable.addRows(
    props.songSchedule.map((song, idx) => {
      // TODO: remove hardcoded values with actual crossover timing
      song.crossoverStartDuration = 13
      song.crossoverEndDuration = 13
      const start = new Date(
        (song.position === 1 ? song.total_play_time_start : song.total_play_time_start - song.crossoverStartDuration) * 1000,
      )
      // get last part of audio_path
      const title = song.audio_path.split('/').pop()
      const end = new Date((song.total_play_time_end + song.crossoverEndDuration) * 1000)
      // const tooltipcontent = `<div style='padding:5px;'><b>${title}</b><br>Start: ${song.start_time}<br>End: ${song.end_time}</div>`
      const tooltipContent = `<div style='padding:5px;'><b>${title}</b><br>Start: ${(song.start_time).toFixed(3)} seconds<br>End: ${(song.end_time).toFixed(3)} seconds</div>`
      const deckNum = idx % 2 === 0 ? 'Deck 1' : 'Deck 2'
      console.log('deckNum', deckNum)
      console.log('song.title', title)
      console.log('tooltipContent', tooltipContent)
      console.log('start', start)
      console.log('end', end)
      console.log('title', title)
      return [deckNum, song.title, tooltipContent, start, end]
    }),
  )

  google.visualization.events.addListener(chart, 'select', () => onChartSelect(chart))

  chartData.value = dataTable
}

const onChartSelect = (chart) => {
  console.debug('On chart select callback called')
  const selection = chart.getSelection()
  if (selection.length > 0) {
    const selectedItem = selection[0]
    if (selectedItem.row != null) {
      selectedSong.value = props.songSchedule[selectedItem.row]
      console.debug('Selected song: ', selectedSong.value)
      if (player.value != null) {
        player.value.currentTime = selectedSong.value.total_play_time_start
      }
    }
  } else {
    console.debug('Song selection cleared')
    selectedSong.value = null
  }
}

</script>

<style scoped>
.chart-container {
  //width: 100%;
  //overflow-x: auto;
}

.song-details {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  /* ... other styles ... */
}
</style>
