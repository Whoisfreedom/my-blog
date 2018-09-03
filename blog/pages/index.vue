<template>
  <section class="container">
    <h1 class="title">
      whoisfreedom
    </h1>
    <div class="home_container">
    	<div class="home_left">
    		<div class="top_titles container_box">
    			<h3 class="model_title">最近发表</h3>
    			<ol>
    				<li class="article_list" v-for="item in articleList" :key="item.Aid">
              <span :title="item.title" @click="goDetail(item)" class="title_list_left"><span>{{item.title}}</span></span>
              <span class="title_list_right">{{item.createTime.substr(0,10)}}</span>
            </li>
    			</ol>
    		</div>
    		<div class="bottom_titles mt50 container_box">
    			<h3 class="model_title">最近评论</h3>
          <ul>
            <li class="article_list" v-for="(item, index) in commentList" :key="index">
              <span :title="item.text" @click="goDetail2(item)" class="title_list_left"><span>{{item.text}}</span></span>
              <span :title="item.name" class="title_list_right">{{item.name}}</span>
            </li>
          </ul>
    		</div>
    	</div>
    	<div class="home_right">
    		<div class="bottom_titles  container_box">
    			<calendar></calendar>
    		</div>
    		<div class="top_titles mt50 container_box">
    			<h3 class="model_title">分类</h3>
          <ul>
            <li class="article_list" v-for="item in typeList" :key="item.codeKey">
              <span :title="item.codeName" @click="goArtList(item)" class="title_list_left"><span>{{item.codeName}}</span></span>
            </li>
          </ul>
    		</div>
    	</div>
    </div>
  </section>
</template>
<script>
import Calendar from '../components/Calendar.vue'

export default {
  data() {
    return {
      articleList: [],
      typeList: [],
      commentList: []
    }
  },
  created() {
    this.axios.post('/getArticles').then(response => {
      this.articleList = response.data
    })
    this.axios.post('/getCodeList').then(response => {
      this.typeList = response.data.codeList.articleTypeList
    })
    let params = {
      pageIndex: 1,
      pageSize: 5
    }
    this.axios.post('/queryComments', params).then(response => {
      this.commentList = response.data.list
    })
  },
  methods: {
    goDetail(item) {
      this.$router.push({'name': 'articleDetail', 'query': {id: item.Aid}})
    },
    goDetail2(item) {
      this.$router.push({'name': 'articleDetail', 'query': {id: item.bindAid}})
    },
    goArtList(item) {
      this.$router.push({'name': 'articleTypeList', 'query': {key: item.codeKey, name: item.codeName}})
    }
  },
  components: {
    Calendar
  }
}
</script>
<style scoped>
.title
{
 width: 80%;
 margin-left: 10%;
 padding: 20px;
}
.home_container
{
 width: 80%;
 margin-left: 10%;
 height: 800px;
}
.home_left
{
 float: left;
 width: 58.7%;
 height: 100%;
}
.home_right
{
 float: right;
 width: 36%;
 height: 100%;
}
.top_titles
{
 height: 463px;
 width: 100%;
}
.bottom_titles
{
 height: 285px;
 width: 100%;
}
.container_box
{
 background: hsla(0,0%,100%,.25) border-box;
 overflow: hidden;
 border-radius: .3em;
 border: 1px solid rgba(0,0,0,.1);
 transition: all .5s ease-out;	
}
.container_box:hover
{
 box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
            0 .5em 1em rgba(0, 0, 0, 0.6);
 text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
}
.article_list{
  height: 40px;
  line-height: 40px;
}
.title_list_left{
  display: inline-block;
  vertical-align: -14px;
  width: 70%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap; 
}
.title_list_left span{
  cursor: pointer;
}
.title_list_right{
  display: inline-block;
  width: 25%;
  overflow: hidden;
  text-overflow:ellipsis;
  float: right;
  white-space: nowrap; 
}
</style>
