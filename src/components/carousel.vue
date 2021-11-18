<template>
  <el-carousel :height="bannerHeight + 'px'" indicator-position="none">
    <el-carousel-item v-for="(img, index) in imgList" :key="index">
      <img class="img" :src="getImageUrl(img.img_name)" />
    </el-carousel-item>
  </el-carousel>
  <div class="start" @click="goHome">LET'S START ➩</div>
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
    const goHome = () => {
      console.log(111)
    }

    onMounted(() => {
      // 首次加载时,需要调用一次
      screenWidth.value = window.innerWidth
      setSize()
      // 窗口大小发生改变时,调用一次
      window.onresize = () => {
        screenWidth.value = window.innerWidth
        setSize()
      }
    })
    return { bannerHeight, imgList, getImageUrl, goHome }
  },
})
</script>

<style lang="scss">
.el-carousel {
  position: relative;
  margin: 0 auto;
  width: 80%;
}
.img {
  width: 100%;
  height: inherit;
}
.start {
  position: absolute;
  display: block;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -95%);
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  padding: 5px 30px;
  border: 2px solid #fff;
}
</style>
