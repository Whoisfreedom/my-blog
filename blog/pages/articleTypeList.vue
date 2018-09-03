<template>
  <div class="article_container" id="art_title">
    <h3>{{articleType}}</h3>
    <ul>
      <li v-for="(item, index) in articleList" :key="index" class="article_list">{{item.title}}</li>
    </ul>
  </div>
</template>
<script>

export default {
  layout: 'fixedButtons', // 你可以为错误页面指定自定义的布局
  data() {
    return {
      articleType: '',
      articleList: []
    }
  },
  mounted() {
    this.searchArticle()
    // this.searchComment()
  },
  methods: {
    searchArticle() {
      this.articleType = this.$route.query.name
      let params = {
        pageIndex: 1,
        pageSize: 10,
        typeCode: this.$route.query.key
      }
      this.axios.post('/searchArticles', params).then(response => {
        this.articleList = response.data.list
      })
    },
    backHome() {
      console.log('返回首页')
      this.$router.push({name: 'index'})
    }
  }
}
</script>
<style scoped>
.article_container{
  width: 80%;
  min-height: calc(100% - 40px);
  background: rgba(253, 246, 226, .7);
  margin: 20px 5%;
  border-radius: 20px;
  box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
            0 .5em 1em rgba(0, 0, 0, 0.6);
}
</style>
