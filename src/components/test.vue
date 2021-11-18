<template>
  <div class="test">Welcome to the Human Community</div>
  <div class="emoji">●ˍ●</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Test',
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.test {
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  font-family: 'Aldrich';
}
.emoji {
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  padding: 10px 0 50px 0;
}
</style>
