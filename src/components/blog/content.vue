<template>
  <div class="blog_container">
    <div class="picture">
      <div class="img_blur"></div>
    </div>
    <div class="top">
      <div class="title">梦境窃贼</div>
      <div class="actor">作者：</div>
      <div class="actor_name">黑泽宇</div>
      <div class="date">Oct 24,2018</div>
      <div class="right">
        <div class="agree">推荐：2600</div>
        <div class="watch">阅读：102400</div>
      </div>
    </div>
    <div class="article">This is balabalabala</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { onMounted } from 'vue'

export default defineComponent({
  name: 'Content',
  setup() {
    onMounted(() => {
      window.scrollTo({ top: 0 })
    })
    return {}
  },
})
</script>

<style lang="scss" scoped>
.blog_container {
  background-color: #fcfcfc;
  padding-bottom: 30px;
  .picture {
    position: relative;
    overflow: hidden; // 去除白边
    .img_blur {
      width: 100%;
      height: 350px;
      background-image: url(../../assets/img/5.jpg);
      background-position: 0 -50px;
      background-repeat: no-repeat;
      background-size: cover;
      transform: scale(1.2); // 去除白边
      -webkit-filter: blur(5px) brightness(55%); // 浏览器兼容
      filter: blur(5px) brightness(55%); // 变暗模糊
    }
  }
  .top {
    position: absolute;
    top: 28%;
    left: 25%;
    width: 50%;
    color: #eee;
    .title {
      font-size: 40px;
    }
    .actor {
      float: left;
      font-size: 16px;
      margin-top: 30px;
    }
    .actor_name {
      float: left;
      font-size: 16px;
      font-weight: 600;
      margin-top: 30px;
      text-decoration: underline;
    }
    .date {
      float: left;
      font-size: 14px;
      color: rgba(#eee, 0.8);
      margin: 34px 0 0 30px;
    }
    .right {
      float: right;
      margin-top: 30px;
      font-size: 14px;
      color: rgba(#eee, 0.8);
      .agree {
        float: left;
      }
      .watch {
        float: left;
        margin-left: 20px;
      }
    }
  }
  .article {
    margin: 30px;
    display: flex;
    text-align: center;
    justify-content: center;
  }
}
</style>
