<template>
  <div>
    {{articleName}}
  </div>
</template>
<script>

export default {
  data() {
    return {
      articleName: '文章详情'
    }
  },
  mounted() {
    this.axios.post('/getArticles').then(response => {
      this.articleList = response.data
    })
  }
}
</script>
