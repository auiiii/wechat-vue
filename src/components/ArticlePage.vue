<template>
	<div class="article">
		<el-tabs v-model="activeName">
            <el-tab-pane label="公众号文章" name="first" :key="'first'">
                    <div style="background: yellow; display: inline">
						<el-row class="table-grid-content">
							<el-col :span="16" class="grid">
								<el-input v-model="input" ref="Name" placeholder="请输入搜索内容"></el-input>
							</el-col>
							<el-col :span="2" class="grid" :gutter="3">
								<el-button type="success" icon="el-icon-search" @click="searchAritile()">搜索</el-button>
							</el-col>
							<el-col :span="2" class="grid" :gutter="3">
								<el-button type="success" @click="getData()">重置</el-button>
							</el-col>
						</el-row>
						<el-card>
						<el-table key="tab01" v-if="tableData.length > 0"
                      		:data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :stripe="true" :border="true" width="100%">
							<el-table-column label="名称" prop="title"></el-table-column>
							<el-table-column label="作者" prop="author"></el-table-column>
                            <el-table-column label="摘要" prop="digest"></el-table-column>
							<el-table-column label="原文地址" prop="url">
							    <template slot-scope="{row}">
									<el-link :href="row.url" target="_blank" class="buttonText"  type="primary" :underline="false">跳转链接</el-link>
        						</template>
							</el-table-column>
							<el-table-column label="序号" prop="article_id"></el-table-column>
							<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="primary" @click="getDescription(scope.row)">详情</el-button>
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

	<el-dialog :visible.sync="isDescShow">
		<el-form :model="editForm">
		<el-descriptions class="margin-top" title="文章信息" :column="3" :size="medium" border>
			<el-descriptions-item label="标题">{{this.editForm.title}}</el-descriptions-item>
    		<el-descriptions-item label="作者">{{this.editForm.author}}</el-descriptions-item>
			<el-descriptions-item label="编号">{{this.editForm.article_id}}</el-descriptions-item>
    		<el-descriptions-item label="摘要">{{this.editForm.digest}}</el-descriptions-item>
    		<el-descriptions-item label="缩略图">{{this.editForm.thumb_url}}</el-descriptions-item>
		</el-descriptions>
		</el-form>
    </el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	var _index;
	export default {
		name: 'ArticlePage',
		inject: ['reload'],  //注入reload方法
		data() {
			return {
				activeName: "first",
				total:0,//总条目数
        		pagesize:10,//每页显示条目个数
        		currentPage:1,//当前页数
				centerDialogVisible: false,
				isDescShow: false,
				editForm: [],
				input: '',
				tableData: [
				]
			}
		},
		// 钩子渲染数据
		mounted() {
    		this.getData();
  		},
		methods: {
			closeDialog() {
				this.isDescShow = false
			},
			//唤醒详情
			getDescription(row) {
				this.isDescShow = true
				this.editForm = Object.assign({}, row); //重置对象
			},
			//获取列表数据
			getData() {
      			axios.get("http://117.50.175.161:80/article/list").then(
        		response => {
          			this.tableData = response.data.data;
        		});
    		},
			searchAritile()
			{
				let reg = new RegExp(this.$refs.Name.value)
				let list = this.tableData.filter(item => reg.test(item.title))
        		this.tableData= list
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
