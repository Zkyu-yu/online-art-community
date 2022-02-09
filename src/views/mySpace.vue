<template>
  <div class="container">
    <Navbar :active-tab="4"></Navbar>
    <Introduction></Introduction>
    <div v-if="showSetting" class="tabs">
      <ul>
        <li :class="{ active: activeTab === 1 }" @click="activeTab = 1">Blog</li>
        <li :class="{ active: activeTab === 2 }" @click="activeTab = 2">Like</li>
        <li :class="{ active: activeTab === 3 }" @click="activeTab = 3">Chart</li>
      </ul>
    </div>
    <div class="mainContent">
      <Card v-if="activeTab === 1" :card-state="1"></Card>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Introduction from '../components/mySpace/introduction.vue'
import Card from '../components/card.vue'
import Footer from '../components/footer.vue'
import { ref } from 'vue'
import router from '../router'

export default defineComponent({
  name: 'MySpace',
  components: {
    Navbar,
    Introduction,
    Card,
    Footer,
  },
  setup() {
    const activeTab = ref(1)
    const actor = router.currentRoute.value.query.actor
    // 不是当前用户不显示tab
    const showTab = ref(false)
    showTab.value = actor === window.localStorage.getItem('userName') ? true : false
    provide('actor', actor)
    return { activeTab, actor, showTab }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 60px;
  background-color: #121212;
  .tabs {
    position: absolute;
    top: 275px;
    left: 50%;
    transform: translate(-36%);
    color: #fcfcfc;
    ul li {
      float: left;
      list-style: none;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      margin-right: 150px;
      margin-bottom: 5px;
      font-size: 18px;
      font-family: 'Coda';
      &:hover {
        color: #fff;
        font-weight: 600;
      }
    }
    ul .active {
      text-decoration: underline;
    }
  }
}
</style>
