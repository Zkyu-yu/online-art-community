<template>
  <div class="blog_container">
    <div class="picture">This is picture</div>
    <div class="article">This is balabalabala</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Content',
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.blog_container {
  background-color: #fcfcfc;
  padding-bottom: 30px;
}
</style>
