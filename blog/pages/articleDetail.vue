<template>
  <div class="article_container" id="art_title">
    <h3 class="art_title">{{articleInfo.title}}</h3>
    <h4 class="art_time">{{articleInfo.createTime.substr(0,10)}}</h4>
    <div class="art_inner" v-html="articleInfo.innerHtml"></div>
    <div class="art_comment">
      <div class="write_comment">
        <h4>留言:</h4>
        <ul class="comments_lists">
          <li v-for="(item, index) in commentInfoList" :key="index" class="comments_list">
            <h5>{{item.name}}:</h5>
            <p>{{item.text}}</p>
            <h5 class="comment_time">{{item.createTime.substr(0,10)}}</h5>
          </li>
        </ul>
      </div>
      <div class="show_comment">
        <h4>写评论:</h4>
        <form>
          <div class="form_item">
            <label class="form_label" for="name">昵称</label>
            <input class="form_input" type="text" id="name" v-model="comment.name">
          </div>
          <div class="form_item">
            <label class="form_label" for="text">评论</label>
            <textarea class="form_textarea" name="text" id="text" v-model="comment.text" rows="5"></textarea>
          </div>
        </form>
        <div class="botton_list">
          <button @click="submit" class="form_button">提交</button>
          <button @click="back" class="form_button form_button_cancel">返回</button>
        </div>
      </div>
    </div>
    <FixedButtons></FixedButtons>
  </div>
</template>
<script>
import FixedButtons from '../components/FixedButtons.vue'

export default {
  layout: 'default', // 你可以为错误页面指定自定义的布局
  data() {
    return {
      articleInfo: {
        Aid: '',
        createTime: '',
        innerHtml: '',
        title: '',
        type: ''
      },
      commentInfoList: [],
      comment: {
        name: '',
        text: ''
      }
    }
  },
  components: {
    FixedButtons
  },
  mounted() {
    this.searchArticle()
    this.searchComment()
  },
  methods: {
    searchArticle() {
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
    },
    searchComment() {
      // 查询当前文章所有评论
      let params = {
        bindAid: this.$route.query.id
      }
      this.axios.post('/getComments', params).then(response => {
        this.commentInfoList = response.data
      })
    },
    backHome() {
      console.log('返回首页')
      this.$router.push({name: 'index'})
    },
    back() {
      console.log('返回')
      this.$router.go(-1)
    },
    // 提交评论
    submit() {
      // 查询当前文章所有评论
      if (!this.comment.text) {
        alert('请输入评论内容')
        return
      }
      if (!this.comment.name) {
        alert('请输入评论昵称')
        return
      }
      let params = {
        bindAid: this.$route.query.id,
        text: this.comment.text,
        name: this.comment.name
      }
      this.axios.post('/setComment', params).then(response => {
        if (response.data.code === 0) {
          this.searchComment()
          this.comment.text = ''
          this.comment.name = ''
        } else {
          alert(response.data.errorMsg)
        }
      })
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
  margin-top: 40px;
}
.art_comment{
  margin-top: 50px;
  padding: 10px;
  border-top: 1px solid rgb(105, 131, 143);
}
.comment_time{
  text-align: right;
  margin: 0;
  padding: 0;
  padding: 20px;
  border-bottom: 1px dashed rgb(105, 131, 143);
}
.form_item{
  vertical-align: text-top;
  margin-bottom: 20px;
}
.form_item:after{
  content: '';
  display: block;
  width: 0;
  height: 0;
  clear: both;
}
.form_label{
  display: inline-block;
  line-height: 30px;
  width: 80px;
  float: left;
  margin-left: 20px;
}
.form_input{
  display: inline-block;
  line-height: 30px;
  width: 500px;
  float: left;
  border-radius: 4px;
  padding-left: 5px;
}
.form_textarea{
  display: inline-block;
  line-height: 30px;
  width: calc(100% - 150px);
  float: left;
  border-radius: 4px;
  padding-left: 5px;
}
.form_button{
  display: inline-block;
  width: 80px;
  height: 30px;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  background-color: rgb(28, 158, 254);
  border-color: rgb(28, 158, 254);
  margin-left: 10px;
  cursor: pointer;
}
.botton_list{
  padding-left: 90px;
}
.form_button_cancel{
  color: rgb(28, 158, 254);
  background-color: #fff;
  border-color: #fff;
}
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
