<template>
  <div id="app">

    <el-container style="height: 100%;">

      <el-header style="text-align: center; font-size: 13px">
          <h2>
            有志青年志已不在千里~
          </h2>
      </el-header>

      <el-container style="height: 100%;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['2']" :default-active="this.$route.path" router
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    >
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>互动区域</template>
              <el-menu-item-group>
                <template slot="title">留言板</template>
                <el-menu-item index="/opinion">留下意见</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">图文交友区</template>
                <el-menu-item index="/upload">上传表情包</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="原创文章">
                <el-menu-item index="/article">公众号文章</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="打赏区">
                <el-menu-item index="/money">打赏爷点钱吧</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>扩展功能区</template>
              <el-menu-item-group>
                <template slot="title">投递文案</template>
                <el-menu-item index="/submit">投递文案</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">图文媒体工具</template>
                <el-menu-item index="/tool">图文媒体工具</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="回到首页">
                <el-menu-item index="/">回到首页</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>愿您有个好心情</el-footer>
        </el-container>

      </el-container>
    </el-container>

  </div>
</template>

<style>

  #app {
    color: #2c3e50;
    height: 100%;
  }

  .el-header {
    background-color: #3F5164;
    text-align: center;
    color: #333;
    line-height: 70px;
  }

  .el-footer {
    background-color: #3F5164;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

   .el-main {
    background-color: #AFB3B6;
    color: #333;
    text-align: center;
    line-height: 30px;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
    color: #333;
  }

  .el-menu{
    height:100vh
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>

<script>
  export default {
    name: 'ContactPage',
    data() {
      return {
      }
    }
  };
</script>
