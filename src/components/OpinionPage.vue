<template>
  <div class="hello">
    <h2>
      <el-form :rules="rules" ref="opinionForm" :model="opinionForm">
        <el-form-item label="留言板" prop="text">
          <el-input v-model="opinionForm.text" ref = "textarea" prefix-icon="iconfont icon-user" type="textarea" clearable="true" >
          </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="info" @click="submit" style="float:right">提交</el-button>
        </el-form-item>
        </el-form>
      <el-divider></el-divider>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>历史留言</span>
        </div>
        <div v-for="o in opinions" :key="o" class="text item">
          {{o}}
        </div>
      </el-card>
    </h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'OpinionPage',
  data () {
    return {
      msg: '留言板',
      opinionForm: [],
      opinions:['测试\n']
    }
  },
  // 钩子渲染数据
	mounted() {
    this.getData();
  },
  methods: {
    //获取列表数据
		getData() {
      axios.get("http://159.138.46.191:80/opinion/list").then(
        response => {
          this.opinions = response.data.data;
        	});
    },
		notifySuccess() {
			this.$notify({
          title: '成功',
          message: '提交成功',
          dangerouslyUseHTMLString: true,
          type: 'success',
      });
		},
    submit(){
      let data = {
        text: this.$refs.textarea.value
      };
      axios.post("http://159.138.46.191:80/opinion/submit", data).then(
				(resp) => {  
					this.notifySuccess();
					this.opinionForm.text = '';
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .el-card {
    background-color: #AFB3B6;
  }

 .text {
    font-size: 14px;
  }

  .item {
    padding: 14px 0;
  }

  .box-card {
    width: 300px;
  }
</style>
