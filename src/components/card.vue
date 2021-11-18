<template>
  <div class="card_container">
    <div class="pic">
      <img src="../assets/img/ld.jpg" alt="" />
    </div>
    <div class="title">Hello World</div>
    <div class="content">1111 0000 1101 0010 1001 0110 1011 0100</div>
    <div class="personal">
      <div class="actor">zkyu</div>
      <div class="date">Oct 24,2018</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'Card',
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.card_container {
  float: left;
  box-sizing: border-box;
  width: 25%;
  height: 600px;
  margin: 50px 0 50px 110px;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  font-family: 'Coda';
  .pic {
    img {
      width: 100%;
      height: 280px;
    }
  }
  .title {
    font-size: 24px;
    padding: 20px 0 20px 20px;
  }
  .content {
    font-size: 16px;
    padding-left: 20px;
    color: #505153;
  }
  .personal {
    font-size: 15px;
    margin-top: 50px;
    padding: 20px 0 0 20px;
    border-top: 1px solid #f0f0f0;
    color: #aaa;
    .date {
      padding-top: 10px;
    }
  }
}
</style>
