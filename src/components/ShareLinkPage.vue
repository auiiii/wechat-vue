<template>
  <div class="share">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" 
      @select="handleSelect" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">白嫖区</template>
          <el-menu-item index="1-1"><a href="https://www.yahehb.com/" target="_blank">国剧云播tv</a></el-menu-item>
          <el-menu-item index="1-2"><a href="https://www.meijutt.net" target="_blank">美剧天堂</a></el-menu-item>
          <el-menu-item index="1-3"><a href="https://movie.douban.com" target="_blank">生于理想死于欲望</a></el-menu-item>
          <el-menu-item index="1-4"><a href="https://www.bilibili.com/v/dance/otaku" target="_blank">绅士拔剑自然神区</a></el-menu-item>
        </el-submenu>
      <el-menu-item index="2"><a href="https://www.zhihu.com" target="_blank">高质量人类交友区</a></el-menu-item>
      <el-menu-item index="3"><a href="https://music.163.com/#/playlist?id=7027990070" target="_blank">到点了,该网抑云了</a></el-menu-item>
      <el-menu-item index="4" disabled>处理中心-敬请期待</el-menu-item>
    </el-menu>
    <img src="../assets/tom.png">
      <h1>{{ msg }}</h1>
    <el-divider></el-divider>
    <h2>
        <router-link to="/">回到首页</router-link>
        <router-view/>
    </h2>
  </div>
</template>

<script>
export default {
  name: 'ShareLinkPage',
  data () {
    return {
      msg: '那东西我们早就不屑了',
      activeIndex: '1'
    };
  },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2{
  font-weight: normal;
}
a{
  color: #66CCFF;
}
</style>
