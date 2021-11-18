<template>
  <div class="container">
    <Navbar></Navbar>
    <el-carousel :height="bannerHeight + 'px'">
      <el-carousel-item v-for="(img, index) in imgList" :key="index">
        <img class="img" :src="getImageUrl(img.img_name)" />
      </el-carousel-item>
    </el-carousel>
    <Test></Test>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Test from '../components/test.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Navbar,
    Test,
  },
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
      bannerHeight.value = (2304 / 3840) * screenWidth.value
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
    return { bannerHeight, screenWidth, imgList, getImageUrl, setSize }
  },
})
</script>

<style lang="scss">
.container {
  width: 100%;
  .img {
    width: 100%;
    height: inherit;
  }
}
</style>
