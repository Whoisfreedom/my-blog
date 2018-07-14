<template>
  <section class="container">
    <h1 class="title">
      whoisfreedom的随笔小记
    </h1>
    <div class="home_container">
    	<div class="home_left">
    		<div class="top_titles container_box">
    			<h3 class="model_title">最近发表</h3>
    			<ol>
    				<li>这是测试标题</li>
    			</ol>
    		</div>
    		<div class="bottom_titles mt50 container_box">
    			<h3 class="model_title">待确认</h3>
    		</div>
    	</div>
    	<div class="home_right">
    		<div class="bottom_titles  container_box">
    			<calendar></calendar>
    		</div>
    		<div class="top_titles mt50 container_box">
    			<h3 class="model_title">分类</h3>
    		</div>
    	</div>
    </div>
  </section>
</template>
<script>
import Calendar from '../components/Calendar.vue'

export default {
  created() {
    axios.get(`http://localhost:8080/pets`).then(response => {
      console.log(response)
    })
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
 cursor: pointer;
 transition: all .5s ease-out;	
}
.container_box:hover
{
 box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
            0 .5em 1em rgba(0, 0, 0, 0.6);
 text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
}
</style>
