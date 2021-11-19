<template>
  <div class="footer_container">
    <div class="footer_content">© Zkyu is the King of the Human Community!</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Footer',
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.footer_container {
  height: 100px;
  background-color: #121212;
  .footer_content {
    display: flex;
    line-height: 100px;
    text-align: center;
    justify-content: center;
    font-size: 20px;
    font-family: 'Coda';
    color: #e2e8f2;
  }
}
</style>
