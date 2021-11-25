<template>
  <div class="footer_container">
    <div class="footer_content">© Zkyu is the King of the Human Community!</div>
    <el-button class="icon" :icon="CaretTop" circle size="mini" @click="goTop"></el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { CaretTop } from '@element-plus/icons'

export default defineComponent({
  name: 'Footer',
  setup() {
    const goTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return { CaretTop, goTop }
  },
})
</script>

<style lang="scss" scoped>
.footer_container {
  height: 100px;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  .footer_content {
    float: left;
    line-height: 100px;
    font-size: 20px;
    font-family: 'Coda';
    color: #e2e8f2;
  }
  .el-button {
    background-color: #121212;
    border: 2px solid #e2e8f2;
    color: #e2e8f2;
    &:hover {
      color: #fff;
      font-weight: 800;
    }
  }
  .icon {
    float: left;
    margin-left: 20px;
  }
}
</style>
