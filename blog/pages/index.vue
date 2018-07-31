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
              <span>{{item.createTime.substr(0,10)}}</span>
            </li>
    			</ol>
    		</div>
    		<div class="bottom_titles mt50 container_box">
    			<h3 class="model_title">最近评论</h3>
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
              <span :title="item.codeName" class="title_list_left"><span>{{item.codeName}}</span></span>
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
      typeList: []
    }
  },
  created() {
    this.axios.post('/getArticles').then(response => {
      this.articleList = response.data
    })
    this.axios.post('/getCodeList').then(response => {
      this.typeList = response.data.codeList.articleTypeList
    })
  },
  methods: {
    goDetail(item) {
      this.$router.push({'name': 'articleDetail', 'query': {id: item.Aid}})
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
</style>
