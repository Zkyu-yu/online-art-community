<template>
  <div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>
