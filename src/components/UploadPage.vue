<template>
	<div class="music">
		<el-tabs v-model="activeName">
            <el-tab-pane label="表情包素材库" name="first" :key="'first'">
                    <div style="background: yellow; display: inline">
						<el-row class="table-grid-content">
							<el-col :span="16" class="grid">
								<el-input v-model="input" ref="picName" placeholder="请输入搜索内容"></el-input>
							</el-col>
							<el-col :span="2" class="grid" :gutter="3">
								<el-button type="success" icon="el-icon-search" @click="searchPic()">搜索</el-button>
							</el-col>
							<el-col :span="2" class="grid" :gutter="3">
								<el-button type="success" @click="getData()">重置</el-button>
							</el-col>
							<el-col :span="3" class="grid" :gutter="15">
								<el-button type="primary" @click="addPic()">上传图片</el-button>
							</el-col>
						</el-row>
						<el-card>
						<el-table key="tab01" v-if="tableData.length > 0"
                      		:data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :stripe="true" :border="true" width="100%">
							<el-table-column label="序号" prop="id"></el-table-column>
							<el-table-column label="名称" prop="name"></el-table-column>
							<el-table-column label="媒体id" prop="mediaId"></el-table-column>
							<el-table-column label="链接" prop="url">
							    <template slot-scope="{row}">
									<el-link :href="row.url" target="_blank" class="buttonText"  type="primary" :underline="false">跳转图片</el-link>
        						</template>
							</el-table-column>
							<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="primary" @click="modifyPic(scope.row)">修改</el-button>
								<el-button type="danger" @click="deletePic(scope.row)">删除</el-button>
							</template>
							</el-table-column>
						</el-table>
						 <!--分页区域-->
  						<el-pagination
      						@size-change="size_change"
      						@current-change="current_change"
      						:current-page="currentPage"
      						:page-sizes="[10,20,30]"
      						:page-size="pagesize"
      						layout="total, sizes, prev, pager, next, jumper"
      						:total="tableData.length
      						">
  						</el-pagination>
						</el-card>
                    </div>
            </el-tab-pane>
        </el-tabs>

		<el-dialog :visible.sync="centerDialogVisible">
			<el-form :model="editForm">
				<el-form-item label="序号">
					<el-input v-model="editForm.id"></el-input>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="媒体id">
					<el-input v-model="editForm.mediaId"></el-input>
				</el-form-item>
				<el-form-item label="链接">
					<el-input v-model="editForm.url"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button type="primary" @click="sumbitEditRow()">确定</el-button>
				<el-button @click="closeDialog()">取消</el-button>
			</div>
		</el-dialog>

	<el-dialog :visible.sync="isAddMembers">
      <el-form :rules="rules" ref="uploadForm" :model="uploadForm">

		<el-form-item label="图片名称" prop="name">
            <el-input v-model="uploadForm.name" ref="uploadName"></el-input>
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
                <el-button  type="success">选择文件</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button  type="primary" @click="upload">点击上传</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	var _index;
	export default {
		name: 'UploadPage',
		inject: ['reload'],  //注入reload方法
		data() {
			return {
				activeName: "first",
				total:0,//总条目数
        		pagesize:10,//每页显示条目个数
        		currentPage:1,//当前页数
				centerDialogVisible: false,
				isAddMembers: false,
				editForm: [],
				addForm: [],
				uploadForm: [],
				searchData: '',
				input: '',
      			headerObj: {},
      			fileList: [],
				tableData: [
				]
			}
		},
		// 钩子渲染数据
		mounted() {
    		this.getData();
  		},
		methods: {
			deletePic(row) {
				console.log(row);
				let data = {  // 需要传递的参数
        			ids: [row.id]
      			};
      			axios.post("http://117.50.175.161:80/pic/delete", data).then(
				(resp) => {
					this.notifySuccess();
					this.reload();
      			});
			},
			modifyPic(row) {
				this.centerDialogVisible = true
				this.editForm = Object.assign({}, row); //重置对象
			},
			sumbitEditRow() {
				console.log("待修改的值" + this.editForm)
				let data = {
        			id: this.editForm.id,
					name: this.editForm.name,
        			mediaId: this.editForm.mediaId,
        			url: this.editForm.url
      			};
      			axios.post("http://117.50.175.161:80/pic/update?id=" + this.editForm.id, data).then(
				(resp) => {
					this.notifySuccess();
					this.reload();
      			});
				this.centerDialogVisible = false;
			},
			closeDialog() {
				this.centerDialogVisible = false
				this.isAddMembers = false
			},
			//唤醒新增函数窗口
			addPic() {
				this.isAddMembers = true
			},
			//获取列表数据
			getData() {
      			axios.get("http://117.50.175.161:80/pic/list?limit=200&keyWord=").then(
        		response => {
          			this.tableData = response.data.data;
        		});
    		},
			searchPic()
			{
				let keyWord = this.$refs.picName.value
				console.log(keyWord)
				axios.get("http://117.50.175.161:80/pic/list?limit=200&keyWord=" + keyWord).then(
        		response => {
          			this.tableData = response.data.data;
        		});
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
			//监听 pagesize 改变的事件
   			size_change(newSize){
       			this.pagesize = newSize
   			},
   			//监听 页码值 改变的事件
   			current_change(newPage){
       			this.currentPage = newPage
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
			//通过onchanne触发方法获得文件列表
         	handleChange(file, fileList) {
            	this.fileList = fileList;
            	console.log(fileList)
       	 	},
        	upload(){
            	let fd = new FormData();
				let name = this.$refs.uploadName.value
            	this.fileList.forEach(item=>{
                //文件信息中raw才是真的文件
                fd.append("file", item.raw);
            	})
            	axios.post("http://117.50.175.161:80/wechat/uploadUrl?name=" + name, fd)
				.then(res=>{
					this.notifySuccess();
                })
				this.isAddMembers = false;
				//实时刷新
				this.reload();
        	}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.table-grid-content {
		border-radius: 4px;
		height: 50 px;
		background: #ebeef5;
		padding: 10px;
	}
	h2{
  		font-weight: normal;
	}
	h2 {
  		color: #6699CC;
	}
</style>
