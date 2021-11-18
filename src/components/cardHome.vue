<template>
  <!-- <div class="test">Welcome to the Human Community</div> -->
  <div class="card_home">
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
    <Card></Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Card from './card.vue'

export default defineComponent({
  name: 'CardHome',
  components: {
    Card,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.card_home {
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
</style>
