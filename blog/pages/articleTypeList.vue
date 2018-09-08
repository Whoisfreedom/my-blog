<template>
    <div class="article_container" id="art_title">
      <h3>{{articleType}}</h3>
      <ul>
        <li v-for="(item, index) in articleList" :key="index" class="article_list">
          <span @click="goDetail(item)" class="list_title">{{(index+1) + '.' + item.title}}</span>
          <span class="list_date">{{item.createTime.substr(0,10)}}</span>
        </li>
      </ul>
      <FixedButtons></FixedButtons>
    </div>
</template>
<script>
import FixedButtons from '../components/FixedButtons.vue'

export default {
  layout: 'default', // 你可以为错误页面指定自定义的布局
  data() {
    return {
      articleType: '',
      articleList: []
    }
  },
  components: {
    FixedButtons
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
    goDetail(item) {
      this.$router.push({'name': 'articleDetail', 'query': {id: item.Aid}})
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
  padding: 20px;
  width: 80%;
  min-height: calc(100% - 40px);
  background: rgba(253, 246, 226, .7);
  margin: 20px 5%;
  border-radius: 20px;
  box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
            0 .5em 1em rgba(0, 0, 0, 0.6);
}
.article_list{
  height: 30px;
}
.list_title{
  float: left;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  max-width: 500px;
  display: inline-block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap; 
}
.list_date{
  height: 30px;
  line-height: 30px;
  float: right;
}
</style>
