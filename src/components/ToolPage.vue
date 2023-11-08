<template>
  <div class="hello">
    <h2>

      <template>
      <el-form :rules="rules" ref="mainForm" :model="mainForm">
        <el-form-item label="多媒体功能区" prop="text">
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      </template>


      <el-dropdown @command="handleCommand" placement="bottom" class="el-dropdown">
        <el-button type="primary">
          功能列表
          <el-icon class="el-icon--left">
            <arrow-down />
          </el-icon>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">压缩图片</el-dropdown-item>
          <el-dropdown-item command="b">转换扩展</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-divider></el-divider>
        <el-dialog :visible.sync="isAddMembers">
          <el-form :rules="rules" ref="uploadForm" :model="uploadForm">
            <el-form-item label="指定图片大小" prop="name">
              <el-input v-model="uploadForm.name" ref="size"></el-input>
            </el-form-item>
            <el-form-item>
              <el-upload ref="upfile"
                         style="display: inline"
                         :auto-upload="false"
                         :multiple="true"
                         :on-change="handleChange"
                         :before-upload="beforePicUpload"
                         :file-list="fileList"
                         action="#">
                <template #trigger>
                  <el-button type="primary">选择图片</el-button> <!-- 两个button公用一个input会导致上传成功也触发选取文件弹窗，通过template隔离 -->
                </template>
                <el-button  type="success" @click="upload">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-dialog>

    </h2>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ToolPage',
  data () {
    return {
      fileList: [],
      uploadForm: [],
      mainForm: [],
      isAddMembers: false,
    }
  },
  // 钩子渲染数据
	mounted() {

  },
  methods: {
    closeDialog() {
      this.isAddMembers = false
    },
    //唤醒新增函数窗口
    addPic() {
      this.isAddMembers = true
    },
    // 上传图片前，自定义校验
    beforePicUpload(file) {
      console.log("图片格式检查")
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt1M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$notify({
          title: '错误',
          message: '上传图片只能是 JPG / PNG 格式!',
          dangerouslyUseHTMLString: true,
          type: 'danger',
        });
      }
      if (!isLt1M) {
        this.$notify({
          title: '错误',
          message: '上传图片大小不能超过 10MB!',
          dangerouslyUseHTMLString: true,
          type: 'danger',
        });
      }
      return isJPG && isLt1M;
    },
    //通过onchange触发方法获得文件列表
    handleChange(file, fileList) {
      this.fileList = fileList;
      console.log(fileList)
    },
    upload(){
      let fd = new FormData();
      let size = this.$refs.size.value
      this.fileList.forEach(item=>{
        //文件信息中raw才是真的文件
        fd.append("file", item.raw);
        fd.append("size", size);
      })
      axios.post("http://117.50.175.161:80/func/ysPic", fd, { responseType: 'blob' }).then(res => {
        const a = document.createElement('a');
        const href = window.URL.createObjectURL(new Blob([res.data]));
        a.href = href;
        a.download = '压缩图片.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(href);
        });
      this.isAddMembers = false;//关闭菜单
      this.notifySuccess();//显示成功
    },
    // 提示操作成功
    notifySuccess() {
      this.$notify({
        title: '成功',
        message: '操作成功',
        dangerouslyUseHTMLString: true,
        type: 'success',
      });
    },
    //处理下拉框
    handleCommand(command) {
      switch(command) {
        case 'a':
          this.addPic();
          break;
        case 'b':
          break;
        default:
          this.$message('功能待扩展' );
          break;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-dropdown {
    text-align: left;
    display: flex;
  }
h2 {
  font-weight: normal;
}
</style>
