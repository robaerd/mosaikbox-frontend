<script setup lang="ts">

import UserStudy from "@/pages/user-study/UserStudy.vue";
import {HollowDotsSpinner} from "epic-spinners";
import {ref} from "vue";
import {useColors} from "vuestic-ui";

const { getColor, colors } = useColors()

const spinnerConfig = ref({
  size: 70,
  duration: 1000,
  color: colors.primary,
})
</script>

<template>
  <Suspense>
    <template #default>
      <UserStudy />
    </template>
    <template #fallback>
        <HollowDotsSpinner style="margin: auto" :animation-duration="spinnerConfig.duration" :color='spinnerConfig.color' :size="spinnerConfig.size"/>
    </template>
    </Suspense>
</template>

<style scoped lang="scss">

</style>
