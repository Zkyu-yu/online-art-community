<template>
  <div class="container">
    <Navbar></Navbar>
    <div class="searchTitle">
      Search Results for:
      <strong v-if="searchTitle">{{ searchTitle }}</strong>
      <strong v-else>{{ searchActor }}</strong>
    </div>
    <Card v-if="searchTitle" :card-state="2"></Card>
    <Card v-else :card-state="3"></Card>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from '@vue/runtime-core'
import Navbar from '../components/navbar.vue'
import Card from '../components/card.vue'
import Footer from '../components/footer.vue'
import router from '../router'

export default defineComponent({
  name: 'SearchResult',
  components: {
    Navbar,
    Card,
    Footer,
  },
  setup() {
    const searchTitle = router.currentRoute.value.query.title
    const searchActor = router.currentRoute.value.query.actor
    provide('searchTitle', searchTitle)
    provide('searchActor', searchActor)
    return { searchTitle, searchActor }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 60px;
  background-color: #121212;
  .searchTitle {
    padding-top: 20px;
    padding-left: 10%;
    font-size: 20px;
    font-family: 'Coda';
    color: rgba(#121212, 0.9);
    background-color: #fcfcfc;
    strong {
      padding-left: 10px;
      text-decoration: underline;
    }
  }
}
</style>
