<template>
  <div>
    <nuxt/>
    <div class="bg_fix"></div>
  </div>
</template>

<script>
import MyFooter from '../components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
.bg_fix
{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background-image: url(../assets/img/homepage.png);
  background-size: cover;
}
.container
{
  margin: 0;
  width: 100%;
  padding-top: 20px;
}

.button, .button:visited
{
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #3B8070;
}

.title
{
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
