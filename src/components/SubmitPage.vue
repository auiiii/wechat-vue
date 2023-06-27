<template>
  <div class="hello">
    <h2>
      <el-form :rules="rules" ref="opinionForm" :model="opinionForm">
        <el-form-item label="标题">
          <el-input v-model="opinionForm.name" ref = "title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <br>
          <el-radio-group v-model="opinionForm.resource" style="float:left">
            <el-radio label="情绪杂念" @change="onchange($event)"></el-radio>
            <el-radio label="世间万物"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="投递稿件" prop="text">
          <el-input v-model="opinionForm.text" placeholder="直接输入文字即可" ref = "inputarea" type="textarea" prefix-icon="iconfont icon-user">
          </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="info" @click="submit" style="float:right">提交</el-button>
        </el-form-item>
        </el-form>
      <el-divider></el-divider>
    </h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SubmitPage',
  data () {
    return {
      msg: '投递稿件',
      radio:'',
      opinionForm: []
    }
  },
  // 钩子渲染数据
	mounted() {

  },
  methods: {
    //获取列表数据
		notifySuccess() {
			this.$notify({
          title: '成功',
          message: '感谢投稿',
          dangerouslyUseHTMLString: true,
          type: 'success',
      });
		},
    onchange(val)
    {
      console.log('radio-change:' + val);
      this.radio = val;
    },
    submit(){
      let data = {
        title: this.$refs.title.value,
        type: this.radio,
        text: this.$refs.inputarea.value
      };
      console.log(data);
      axios.post("http://117.50.175.161:80/article/submit", data).then(
				(resp) => {
					this.notifySuccess();
          this.opinionForm.name = '';
          this.opinionForm.text = '';
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: normal;
}
</style>
