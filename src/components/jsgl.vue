<template>
  <div class="table_list">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="管理员角色" name="type"></el-checkbox>
          <el-checkbox label="普通用户" name="type"></el-checkbox>
          <el-checkbox label="测试用户" name="type"></el-checkbox>
          <el-checkbox label="数据管理员" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
	import util from '../common/util'
  import NProgress from 'nprogress'
	import { getUserListPage, removeUser, editUser, addUser } from '../api/api';

	export default {
    name:'jsgl',
		data() {
			return {
              form: {
                name: '李明',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
              },
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				editFormVisible: false,//编辑界面显是否显示
				editFormTtile: '编辑',//编辑界面标题
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				editLoading: false,
				btnEditText: '提 交',
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
        //用户列表请求每个分页的条数数据和总共分页的数据
				getUserListPage(para).then((res) => {
          //请求到获取数据的条数
					this.total = res.data.total;
          //请求到每个分页要是显示的数据
					this.users = res.data.users;
          //隐藏加载loadding图标
					this.listLoading = false;
				});
			},
			//删除
			handleDel: function (row) {
				var _this = this;
				this.$confirm('确认删除该记录吗?', '提示', {
				}).then(() => {
					_this.listLoading = true;
					let para = { id: row.id };
					removeUser(para).then((res) => {
						_this.listLoading = false;
						_this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						_this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (row) {
				this.editFormVisible = true;
				this.editFormTtile = '编辑';
				this.editForm.id = row.id;
				this.editForm.name = row.name;
				this.editForm.sex = row.sex;
				this.editForm.age = row.age;
				this.editForm.birth = row.birth;
				this.editForm.addr = row.addr;
			},
			//编辑 or 新增
			editSubmit: function () {
				var _this = this;
				_this.$refs.editForm.validate((valid) => {
					if (valid) {
						_this.$confirm('确认提交吗？', '提示', {}).then(() => {
						_this.editLoading = true;
						_this.btnEditText = '提交中';
							if (_this.editForm.id == 0) {
								//新增
								let para = {
									name: _this.editForm.name,
									sex: _this.editForm.sex,
									age: _this.editForm.age,
									birth: _this.editForm.birth == '' ? '' : util.formatDate.format(new Date(_this.editForm.birth), 'yyyy-MM-dd'),
									addr: _this.editForm.addr,
								};
								addUser(para).then((res) => {
									_this.editLoading = false;
									_this.btnEditText = '提 交';
									_this.$notify({
										title: '成功',
										message: '提交成功',
										type: 'success'
									});
									_this.editFormVisible = false;
									_this.getUsers();
								});
							} else {
								//编辑
								let para = {
									id: _this.editForm.id,
									name: _this.editForm.name,
									sex: _this.editForm.sex,
									age: _this.editForm.age,
									birth: _this.editForm.birth == '' ? '' : util.formatDate.format(new Date(_this.editForm.birth), 'yyyy-MM-dd'),
									addr: _this.editForm.addr,
								};
								editUser(para).then((res) => {
									_this.editLoading = false;
									_this.btnEditText = '提 交';
									_this.$notify({
										title: '成功',
										message: '提交成功',
										type: 'success'
									});
									_this.editFormVisible = false;
									_this.getUsers();
								});
							}
						});
					}
				});
			},
			//显示新增界面
			handleAdd: function () {
				var _this = this;
				this.editFormVisible = true;
				this.editFormTtile = '新增';
				this.editForm.id = 0;
				this.editForm.name = '';
				this.editForm.sex = 1;
				this.editForm.age = 0;
				this.editForm.birth = '';
				this.editForm.addr = '';
			}
		},
		mounted() {
			this.getUsers();
		}
	}
</script>

<style lang="css">
  .path_box{
    width: calc(100% - 24px);
    position: absolute;
    z-index: 999;
    background-color: #fff;
    padding: 18px 12px;
    border-top:1px solid #f3f3f3;
    border-bottom:1px solid #f3f3f3;
  }
  .table_list_content{
    background-color: #fff;
    width: calc(100% - 24px);
    padding: 0px 12px 12px 12px;
    position: absolute;
    top: 50px;
  }
  .page{
    float:right;
    margin-top: 12px;
  }
  .list_content{
    width: 100%;
    float: left;
    margin-top: -28px;
  }

</style>
