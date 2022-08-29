<template>
  <div class="hello">
    <h2>
      <el-form :rules="rules" ref="opinionForm" :model="opinionForm">
        <el-form-item label="打赏区" prop="text">
          <el-input v-model="opinionForm.text" placeholder="请输入支付宝口令红包" ref = "inputarea" prefix-icon="iconfont icon-user">
          </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="info" @click="submit" style="float:right">提交</el-button>
        </el-form-item>
        </el-form>
      <el-divider></el-divider>

      <h3>
        <i>
            打赏操作说明，详见百度
        </i>
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1" description="支付宝搜索口令红包"></el-step>
          <el-step title="步骤 2" description="选择发口令红包"></el-step>
          <el-step title="步骤 3" description="支付并拷贝红包口令"></el-step>
          <el-step title="步骤 4" description="将口令粘贴到上方文本框提交"></el-step>
        </el-steps>
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>         
      </h3>

      <el-divider></el-divider>
      <h3>
        暂无商家资质材料,二维码等其他支付方式待扩展中
      </h3>
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
      active: 0,
      opinionForm: [],
      opinions:['测试\n']
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
          message: '栓q',
          dangerouslyUseHTMLString: true,
          type: 'success',
      });
		},
    next(){
        if (this.active++ > 3) this.active = 0;
    },
    submit(){
      let data = {
        code: this.$refs.inputarea.value
      };
      axios.post("http://159.138.46.191:80/money/submit", data).then(
				(resp) => {  
					this.notifySuccess();
					this.reload();
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
h3 {
  font-size: 16px;
  text-align: left;
  color: #2a2d4d;
}
</style>
