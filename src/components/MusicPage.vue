<template>
	<div class="music">
		<h1>却道天凉好个秋</h1>
		<el-tabs v-model="activeName">
            <el-tab-pane label="夜半歌单" name="first" :key="'first'">
                    <div style="background: yellow; display: inline">
						<el-row class="table-grid-content">
							<el-col :span="16" class="grid">
								<el-input v-model="input" ref="musicKeyWord" placeholder="请输入搜索内容"></el-input>
							</el-col>
							<el-col :span="2" class="grid" :gutter="3">
								<el-button type="success" icon="el-icon-search" @click="searchMusic()">搜索</el-button>
							</el-col>
							<el-col :span="2" class="grid" :gutter="3">
								<el-button type="success" @click="getData()">重置</el-button>
							</el-col>
							<el-col :span="3" class="grid" :gutter="15">
								<el-button type="primary" @click="addMusic()">增加分享</el-button>
							</el-col>
						</el-row>
						<el-card>
						<el-table key="tab01" v-if="tableData.length > 0"
                      		:data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :stripe="true" :border="true" width="100%">
							<el-table-column label="序号" prop="id"></el-table-column>
							<el-table-column label="名称" prop="title"></el-table-column>
							<el-table-column label="歌手" prop="author"></el-table-column>
							<el-table-column label="描述" prop="description"></el-table-column>
							<el-table-column label="播放链接" prop="musicUrl"></el-table-column>
							<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="primary" @click="modifyMusic(scope.row)">修改</el-button>
								<el-button type="danger" @click="deleteMusic(scope.row)">删除</el-button>
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

            <el-tab-pane label="深夜光影" name="second" :key="'second'">
                    <div style="background: green; display: inline">
                        <el-row class="table-grid-content">
							<el-col :span="16" class="grid">
								<el-input v-model="input" ref="movieKeyWord" placeholder="请输入搜索内容"></el-input>
							</el-col>
							<el-col :span="2" class="grid" :gutter="3">
								<el-button type="success" icon="el-icon-search" @click="searchMovie()">搜索</el-button>
							</el-col>
							<el-col :span="2" class="grid" :gutter="3">
								<el-button type="success" @click="getMovieData()">重置</el-button>
							</el-col>
							<el-col :span="3" class="grid" :gutter="15">
								<el-button type="primary" @click="addMovie()">增加分享</el-button>
							</el-col>
						</el-row>
						<el-card>
						<el-table key="tab02" v-if="movieData.length > 0"
                      		:data="movieData.slice((movieCurrentPage-1)*moviePagesize,movieCurrentPage*moviePagesize)" :stripe="true" :border="true" width="100%">
							<el-table-column label="序号" prop="id"></el-table-column>
							<el-table-column label="名称" prop="title"></el-table-column>
							<el-table-column label="导演" prop="author"></el-table-column>
							<el-table-column label="海报链接" prop="picUrl"></el-table-column>
							<el-table-column label="影评链接" prop="movieUrl"></el-table-column>
							<el-table-column label="描述" prop="description"></el-table-column>
							<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button type="primary" @click="modifyMovie(scope.row)">修改</el-button>
								<br>
								<el-button type="danger" @click="deleteMovie(scope.row)">删除</el-button>
							</template>
							</el-table-column>
						</el-table>
						 <!--分页区域-->
  						<el-pagination
      						@size-change="movie_size_change" 
      						@current-change="movie_current_change"  
      						:current-page="movieCurrentPage"  
      						:page-sizes="[10,20,30]"   
      						:page-size="moviePagesize"  
      						layout="total, sizes, prev, pager, next, jumper"  
      						:total="movieData.length
      						"> 
  						</el-pagination>
						</el-card>
                    </div>
            </el-tab-pane>
        </el-tabs>

		<!-- music的 -->
		<el-dialog :visible.sync="centerDialogVisible">
			<el-form :model="editForm">
				<el-form-item label="序号">
					<el-input v-model="editForm.id"></el-input>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="editForm.title"></el-input>
				</el-form-item>
				<el-form-item label="歌手">
					<el-input v-model="editForm.author"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="editForm.description"></el-input>
				</el-form-item>
				<el-form-item label="播放链接">
					<el-input v-model="editForm.musicUrl"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button type="primary" @click="sumbitEditRow()">确定</el-button>
				<el-button @click="closeDialog()">取消</el-button>	
			</div>
		</el-dialog>
		<el-dialog :visible.sync="isAddMembers">
			<el-form ref="form"
					:model="addForm">
				<el-form-item label="名称">
					<el-input v-model="addForm.title"></el-input>
				</el-form-item>
				<el-form-item label="歌手">
					<el-input v-model="addForm.author"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="addForm.description"></el-input>
				</el-form-item>
				<el-form-item label="播放链接">
					<el-input v-model="addForm.musicUrl"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button @click="closeDialog()">取消</el-button>
				<el-button type="primary" @click="sumbitAddRow('form')">确定</el-button>
			</div>
		</el-dialog>

		<!-- movie的 -->
		<el-dialog :visible.sync="centerDialogMovieVisible">
			<el-form :model="editMovieForm">
				<el-form-item label="序号">
					<el-input v-model="editMovieForm.id"></el-input>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="editMovieForm.title"></el-input>
				</el-form-item>
				<el-form-item label="导演">
					<el-input v-model="editMovieForm.author"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="editMovieForm.description"></el-input>
				</el-form-item>
				<el-form-item label="影评链接">
					<el-input v-model="editMovieForm.movieUrl"></el-input>
				</el-form-item>
				<el-form-item label="海报链接">
					<el-input v-model="editMovieForm.picUrl"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button type="primary" @click="sumbitMovieEditRow()">确定</el-button>
				<el-button @click="closeMovieDialog()">取消</el-button>	
			</div>
		</el-dialog>
		<el-dialog :visible.sync="isAddMovieMembers">
			<el-form ref="movieForm"
					:model="addMovieForm">
				<el-form-item label="名称">
					<el-input v-model="addMovieForm.title"></el-input>
				</el-form-item>
				<el-form-item label="导演">
					<el-input v-model="addMovieForm.author"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="addMovieForm.description"></el-input>
				</el-form-item>
				<el-form-item label="影评链接">
					<el-input v-model="addMovieForm.movieUrl"></el-input>
				</el-form-item>
				<el-form-item label="海报链接">
					<el-input v-model="addMovieForm.picUrl"></el-input>
				</el-form-item>
			</el-form>
			<div>
				<el-button @click="closeMovieDialog()">取消</el-button>
				<el-button type="primary" @click="sumbitMovieAddRow('form')">确定</el-button>
			</div>
		</el-dialog>
    	<h2>
        	<router-link to="/">回到首页</router-link>
        	<router-view/>
    	</h2>
	</div>
</template>

<script>
	import axios from 'axios'
	var _index;
	export default {
		name: 'MusicPage',
		inject: ['reload'],  //注入reload方法
		data() {
			return {
				activeName: "first",
				total:0,//总条目数
        		pagesize:10,//每页显示条目个数
        		currentPage:1,//当前页数
				movieTotal:0,
        		moviePagesize:10,
        		movieCurrentPage:1,
				centerDialogVisible: false,
				isAddMembers: false,
				centerDialogMovieVisible: false,
				isAddMovieMembers: false,
				editForm: [],
				addForm: [],
				editMovieForm: [],
				addMovieForm: [],
				searchData: '',
				input: '',
				tableData: [
				],
				movieData: [
				]
			}
		},
		// 钩子渲染数据
		mounted() {
    		this.getData();
			this.getMovieData();
  		},
		methods: {
			deleteMusic(row) {
				console.log(row);
				let data = {  // 需要传递的参数
        			ids: [row.id]
      			};
      			axios.post("http://159.138.46.191:80/music/delete", data).then(
				(resp) => {  
					this.notifySuccess();
					this.reload();
      			});
			},
			deleteMovie(row) {
				console.log(row);
				let data = {  // 需要传递的参数
        			ids: [row.id]
      			};
      			axios.post("http://159.138.46.191:80/movie/delete", data).then(
				(resp) => {  
					this.notifySuccess();
					this.reload();
      			});
			},
			modifyMusic(row) {
				this.centerDialogVisible = true
				this.editForm = Object.assign({}, row); //重置对象
			},
			modifyMovie(row) {
				this.centerDialogMovieVisible = true
				this.editMovieForm = Object.assign({}, row);
			},
			sumbitEditRow() {
				console.log("待修改的值" + this.editForm)
				let data = {
        			title: this.editForm.title,
					description: this.editForm.description,
        			author: this.editForm.author,
        			musicUrl: this.editForm.musicUrl
      			};
      			axios.post("http://159.138.46.191:80/music/update?id=" + this.editForm.id, data).then(
				(resp) => {  
					this.notifySuccess();
					this.reload();	
      			});
				this.centerDialogVisible = false;
			},
			sumbitMovieEditRow() {
				console.log("待修改的值" + this.editMovieForm)
				let data = {
        			title: this.editMovieForm.title,
					description: this.editMovieForm.description,
        			author: this.editMovieForm.author,
        			movieUrl: this.editMovieForm.movieUrl,
					picUrl: this.editMovieForm.picUrl
      			};
      			axios.post("http://159.138.46.191:80/movie/update?id=" + this.editMovieForm.id, data).then(
				(resp) => {  
					this.notifySuccess();
					this.reload();	
      			});
				this.centerDialogMovieVisible = false;
			},
			closeDialog() {
				this.centerDialogVisible = false
				this.isAddMembers = false
			},
			closeMovieDialog() {
				this.centerDialogMovieVisible = false
				this.isAddMovieMembers = false
			},
			//唤醒新增函数窗口
			addMusic() {
				this.isAddMembers = true
			},
			addMovie() {
				this.isAddMovieMembers = true
			},
			//提交新增
			sumbitAddRow() {				
				console.log(this.addForm);
				let data = {
        			title: this.addForm.title,
					description: this.addForm.description,
        			author: this.addForm.author,
        			musicUrl: this.addForm.musicUrl
      			};
      			axios.post("http://159.138.46.191:80/music/add", data).then(
				(resp) => {  
					this.notifySuccess();
					//实时刷新
					this.reload();	
      			});
				this.isAddMembers = false;
			},
			//提交新增
			sumbitMovieAddRow() {				
				console.log(this.addMovieForm);
				let data = {
        			title: this.addMovieForm.title,
					description: this.addMovieForm.description,
        			author: this.addMovieForm.author,
        			movieUrl: this.addMovieForm.movieUrl,
					picUrl: this.addMovieForm.picUrl
      			};
      			axios.post("http://159.138.46.191:80/movie/add", data).then(
				(resp) => {  
					this.notifySuccess();
					//实时刷新
					this.reload();	
      			});
				this.isAddMovieMembers = false;
			},
			//获取音乐列表数据
			getData() {
      			axios.get("http://159.138.46.191:80/music/list?limit=200&keyWord=").then(
        		response => {
          			this.tableData = response.data.data;
        		});
    		},
			//获取电影列表数据
			getMovieData() {
      			axios.get("http://159.138.46.191:80/movie/list?limit=200&keyWord=").then(
        		response => {
          			this.movieData = response.data.data;
        		});
    		},
			searchMusic()
			{
				let keyWord = this.$refs.musicKeyWord.value
				console.log(keyWord)
				axios.get("http://159.138.46.191:80/music/list?limit=200&keyWord=" + keyWord).then(
        		response => {
          			this.tableData = response.data.data;
        		});
			},
			searchMovie()
			{
				let keyWord = this.$refs.movieKeyWord.value
				console.log(keyWord)
				axios.get("http://159.138.46.191:80/movie/list?limit=200&keyWord=" + keyWord).then(
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
			//movie
   			movie_size_change(newSize){
       			this.moviePagesize = newSize
   			},
   			movie_current_change(newPage){
       			this.movieCurrentPage = newPage
   			}
		},
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