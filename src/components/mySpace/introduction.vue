<template>
  <div class="in_container">
    <div class="header">
      <div class="img_blur"></div>
    </div>
    <div class="personal">Helloooooooo</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Introduction',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.in_container {
  background-color: #fcfcfc;
  .header {
    position: relative;
    overflow: hidden;
    .img_blur {
      width: 100%;
      height: 250px;
      background-image: url(../../assets/img/ld.jpg);
      background-position: 0 -50px;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.2);
      -webkit-filter: blur(5px) brightness(55%);
      filter: blur(5px) brightness(55%);
    }
  }
}
</style>
