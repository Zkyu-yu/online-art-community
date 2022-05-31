<template>
  <div class="container">
    <Navbar :active-tab="2"></Navbar>
    <div class="show_container">
      <div v-for="(item, index) of showInfoList" :key="index" class="showList">
        <div class="poster">
          <img :src="item.poster" style="width: 180px" />
        </div>
        <div class="content">
          <div class="theme">{{ item.theme }}</div>
          <div class="date">{{ item.date }}</div>
          <div class="address">{{ item.address }}</div>
          <div>{{ item.introduction }}</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import showInfo from '../hook/showInfo'

export default defineComponent({
  name: 'Show',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const { showInfoList } = showInfo()
    return { showInfoList }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 60px;
  background-color: #121212;
  .show_container {
    color: #e2e8f2;
    .showList {
      display: flex;
      margin: 20px;
      padding: 10px;
      border: 1px dashed rgba(#dcdfe6, 0.6);
      .poster {
        margin-right: 20px;
      }
      .content {
        .theme {
          font-weight: bold;
          font-size: 25px;
          line-height: 50px;
        }
        .date,
        .address {
          font-size: 16px;
          line-height: 30px;
          color: rgba(#e2e8f2, 0.6);
        }
      }
    }
  }
}
</style>
