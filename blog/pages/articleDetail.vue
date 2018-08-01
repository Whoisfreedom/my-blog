<template>
  <div class="article_container">
    <h3 class="art_title">{{articleInfo.title}}</h3>
    <h4 class="art_time">{{articleInfo.createTime.substr(0,10)}}</h4>
    <div class="art_inner" v-html="articleInfo.innerHtml"></div>
    <div class="art_comment">
      <div class="write_comment">写评论</div>
      <div class="show_comment">展示评论</div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      articleInfo: {
        Aid: '',
        createTime: '',
        innerHtml: '',
        title: '',
        type: ''
      },
      commentInfoList: []
    }
  },
  mounted() {
    // 查询当前文章所有评论
    let params = {
      bindAid: this.$route.query.id
    }
    this.axios.post('/getComments', params).then(response => {
      this.commentInfoList = response.data
    })
    // 查询当前文章详情
    let params2 = {
      Aid: this.$route.query.id
    }
    this.axios.post('/articleDetail', params2).then(response => {
      this.articleInfo.Aid = response.data.article.Aid
      this.articleInfo.createTime = response.data.article.createTime
      this.articleInfo.innerHtml = response.data.article.innerHtml
      this.articleInfo.title = response.data.article.title
      this.articleInfo.type = response.data.article.type
    })
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
.art_title{
  text-align: center;
  font-weight: 100;
  font-size: 36px;
  line-height: 50px;
  padding: 15px 0;
}
.art_time{
  padding: 0;
  margin: 0;
  text-align: center;
}
.art_inner{
  padding: 10px;
  font-size: 20px;
}
</style>
