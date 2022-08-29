<template>
  <div class="hello">
  <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>主页链接</h2>
    <ul>
      <li>
        <router-link to="/share">分享emo-你我终将落幕</router-link>
      </li>
      <li>
        <router-link to="/sharelink">站长推荐-看看大千世界</router-link>
      </li>
        <router-view/>
      <li>
        <router-link to="/contact">互动要饭区域</router-link>
      </li>
      <li>
        <a
          href="https://www.zhihu.com/people/hylevine"
          target="_blank"
        >
          与我联系
        </a>
      </li>
      <br>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    return {
      msg: '我听着那少年的声音'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
