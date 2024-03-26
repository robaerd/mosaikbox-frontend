<template>
<!--  reference png file -->
  <img src="/mosaikbox-logo.png" alt="Mosaik Logo" :style="{ height: height + 'px' }" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useColors } from 'vuestic-ui'
  const { getColor, shiftHSLAColor } = useColors()

  const props = withDefaults(
    defineProps<{
      height?: number | string
      color?: string
    }>(),
    {
      height: 32,
      color: 'primary',
    },
  )

  const colorsComputed = computed(() => {
    const color = getColor(props.color, 'primary')
    return { start: color, end: shiftHSLAColor(color, { l: -20 }) }
  })
</script>
