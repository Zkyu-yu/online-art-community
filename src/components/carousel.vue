<template>
  <div class="carousel_container">
    <el-carousel :height="bannerHeight + 'px'" indicator-position="none">
      <el-carousel-item v-for="(img, index) in imgList" :key="index">
        <img class="img" :src="getImageUrl(img.img_name)" />
      </el-carousel-item>
    </el-carousel>
    <div class="title">This is Earth Space, now here's Human Community.</div>
    <div class="emo">●ˍ●</div>
    <div class="start" @click="letsScroll">LET'S START ➩</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: 'Carousel',
  setup() {
    // 图片父容器高度
    const bannerHeight = ref(1000)
    // 浏览器宽度
    const screenWidth = ref(0)
    const imgList = reactive([{ img_name: '1' }, { img_name: '2' }, { img_name: '3' }, { img_name: '4' }])

    // vite静态资源处理方法（不可用require）
    const getImageUrl = (name: string) => {
      return new URL(`../assets/img/${name}.jpg`, import.meta.url).href
    }
    // 通过浏览器宽度(图片宽度)计算高度
    const setSize = () => {
      bannerHeight.value = (2304 / 3840) * screenWidth.value * 0.8
    }
    // 点击滚动
    const letsScroll = () => {
      window.scrollTo({ top: bannerHeight.value + 70, behavior: 'smooth' })
    }

    onMounted(() => {
      // 首次加载时用
      screenWidth.value = window.innerWidth
      setSize()
      // 窗口大小发生改变时调用
      window.onresize = () => {
        screenWidth.value = window.innerWidth
        setSize()
      }
    })
    return { bannerHeight, imgList, getImageUrl, letsScroll }
  },
})
</script>

<style lang="scss">
.carousel_container {
  position: relative;
  width: 100%;
  height: 100%;
  color: #e2e8f2;
  cursor: default;
  .el-carousel {
    margin: 0 auto;
    width: 80%;
    opacity: 0.9;
  }
  .img {
    width: 100%;
    height: inherit;
  }
  .title {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -80%);
    font-size: 35px;
    font-family: 'Aldrich';
  }
  .emo {
    position: absolute;
    top: 87%;
    left: 50%;
    transform: translate(-50%, -87%);
    font-size: 25px;
    font-family: 'Aldrich';
  }
  .start {
    position: absolute;
    top: 95%;
    left: 50%;
    transform: translate(-50%, -95%);
    cursor: pointer;
    font-size: 24px;
    font-family: 'Aldrich';
    padding: 5px 30px;
    border: 2px solid #e2e8f2;
  }
}
</style>
