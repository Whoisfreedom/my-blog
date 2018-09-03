<template>
  <div class="bg_fix">
  	<nuxt/>
    <div class="fixed_buttons">
      <ul class="fixed_lists">
        <li>
          <a href="#art_title">
            <img src="../assets/img/top.png" alt="图片丢失了" title="返回顶部">
          </a>
        </li>
        <li>
          <img src="../assets/img/home.png" @click="backHome" alt="图片丢失了" title="主页">
        </li>
        <li>
          <img src="../assets/img/back.png" @click="back" alt="图片丢失了" title="返回">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: ''
    }
  },
  mounted() {
    // this.searchArticle()
    // this.searchComment()
  },
  methods: {
    backHome() {
      this.$router.push({name: 'index'})
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.fixed_buttons{
  width: 60px;
  padding: 5px;
  position: fixed;
  right: 40px;
  bottom: 10%;
}
.fixed_lists{
  padding: 0;
}
.fixed_lists li{
  background-color: rgba(255, 255, 255, .8);
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  line-height: 60px;
  margin: 10px 0;
  cursor: pointer;
  text-align:center;
  vertical-align: middle;
  transition: all .5s ease-out; 
}
.fixed_lists li img{
  vertical-align: middle;
}
.fixed_lists li:hover{
  box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
            0 .5em 1em rgba(0, 0, 0, 0.6);
}
</style>
