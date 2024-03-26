<template>
  <div :style="`--primary-text-color: ${colors.textPrimary}`">
    <div style="display: flex; align-items: center; width:100%">
      <button
          @click="togglePlayPause"
          style="margin-left: 15px; margin-right: 10px; width: 5%; background: none; border: none; padding: 0; display: flex; align-items: center; justify-content: center;"
          v-if="props.audioUrl != null"
      >
        <va-icon class="icon-button" v-if="isPlaying" name="fa-pause" size="large"/>
        <va-icon class="icon-button" v-else name="fa-play" size="large"/>
      </button>

      <div ref="parentDiv" style="width:90%">
        <div ref="audioWaveDiv" v-if="props.audioUrl != null" :key="audioWaveRerenderKey">
          <audio ref="player" :src="props.audioUrl"/>
          <canvas ref="canvas" :width="canvWidth"/>
        </div>
      </div>
      <a :href="props.audioUrl" download style="margin-left: 10px" v-if="props.audioUrl != null">
        <button>
          <va-icon class="icon-button" name="fa-download"/>
        </button>
      </a>
    </div>
    <div v-if="props.audioUrl == null">
      <p :style="{'margin': 'auto', 'text-align': 'center', 'margin-bottom': '10px', color: colors.secondary}">Loading
        audio</p>
      <HollowDotsSpinner style="margin: auto" :color='spinnerConfig.color'
                         :animation-duration="spinnerConfig.duration" :size="spinnerConfig.size"/>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref, watch, defineProps} from "vue";
import {useAVWaveform} from "vue-audio-visual";
import {useColors} from "vuestic-ui";
import {HollowDotsSpinner} from "epic-spinners";

const props = defineProps({
  audioUrl: {
    type: String,
  },
});

const { colors } = useColors()

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

const spinnerConfig = ref({
  size: 70,
  duration: 1000,
  color: colors.primary,
})

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

</script>

<style scoped>
  .icon-button {
    color: var(--primary-text-color);
  }
</style>
