<template>
    <div class="user">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div >
            <el-input placeholder="请输入搜索内容" style="width:300px;margin-right:20px;" v-model="query" class="input-with-select">
                <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
        </div>
        <el-table
            :data="userList"
            style="width: 100%">
            <el-table-column
                prop="username"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="手机号"
                width="180">
            </el-table-column>
            <el-table-column
                label="状态"
                width="180">
                <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    @change="statusChange(scope.row)"
                    inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="editUser(scope.row.id)" type="primary" icon="el-icon-edit" plain></el-button>
                    <el-button size="small"  @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain></el-button>
                    <el-button size="small" type="success" @click="assignRole" icon="el-icon-check" plain>分配角色</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2,4,6,8]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
        <!-- 添加功能 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form status-icon :model="form" ref="form" :rules="rules">
                <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="save('form')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑功能 -->
        <el-dialog title="编辑用户" :rules="rules" :visible.sync="editDialogFormVisible">
            <el-form  :model="editForm" ref="editForm" :rules="rules">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.username" autocomplete="off" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                    <el-input v-model="editForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth">
                    <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleEditCancel">取 消</el-button>
                <el-button type="primary" @click="editSave()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分配角色 -->
        <el-dialog title="编辑用户" :rules="rules" :visible.sync="roleDialogFormVisible">
            <el-form  :model="roleForm" ref="roleForm" :rules="rules">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="editForm.username" autocomplete="off" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="角色列表" prop="email" :label-width="formLabelWidth">
                    <el-input></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleEditCancel">取 消</el-button>
                <el-button type="primary" @click="editSave()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      roleForm: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名字', trigger: 'change' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ] },
      dialogFormVisible: false,
      editDialogFormVisible: false,
      roleDialogFormVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        rid: ''
      },
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      userList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 6
    }
  },
  methods: {
    assignRole() {
      this.roleDialogFormVisible = true
    },
    statusChange(row) {
      this.$axios({
        method: 'put',
        url: `users/${row.id}/state/${row.mg_state}` }).then((res) => {
        const { meta: { status } } = res
        if (status === 200) {
          this.getUserList()
          this.$message({
            showClose: true,
            message: '设置成功',
            type: 'success',
            duration: 1000
          })
        }
      })
    },
    editSave() {
      this.$axios.put(`users/${this.editForm.rid}`,
        {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        }).then((res) => {
        const { meta: { status } } = res
        if (status === 200) {
          this.getUserList()
          this.editDialogFormVisible = false
          this.$message({
            showClose: true,
            message: '更新成功',
            type: 'success',
            duration: 1000
          })
        }
      })
    },
    handleEditCancel() {
      this.editDialogFormVisible = false
      this.$refs.editForm.resetFields()
    },
    async editUser(id) {
      // 根据ID查询用户信息
      const res = await this.$axios.get(`users/${id}`)
      const { meta: { status }, data } = res
      if (status === 200) {
        this.editForm.username = data.username
        this.editForm.email = data.email
        this.editForm.mobile = data.mobile
        this.editForm.rid = data.id
      }
      this.editDialogFormVisible = true
    },
    handleCancel() {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
    },
    handleSearch() {
      this.getUserList()
    },
    save(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (!valid) return false
        const res = await this.$axios.post('users', this.form)
        const { meta: { status } } = res
        if (status === 201) {
          this.getUserList()
          this.dialogFormVisible = false
          this.$message({
            showClose: true,
            message: '创建成功',
            type: 'success',
            duration: 1000
          })
        }
      })
    },
    async del(id) {
      const res = await this.$axios.delete(`users/${id}`)
      const { meta: { status } } = res
      if (status === 200) {
        if (this.userList.length === 1) {
          this.currentPage = this.currentPage - 1
        }
        this.getUserList()
        this.$message.success('删除成功')
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    },
    async getUserList() {
      const res = await this.$axios.get('users', {
        params: { query: this.query, pagenum: this.currentPage, pagesize: this.pageSize }
      })
      const { data, meta: { status } } = res
      if (status === 200) {
        this.total = data.total
        this.userList = data.users
      }
    }
  },
  created() {
    // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算，
    // watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.user {
  .el-pagination {
    margin-top: 10px;
  }
}
</style>
