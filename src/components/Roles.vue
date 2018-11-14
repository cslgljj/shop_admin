<template>
<div class="role">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" @click="showAddDialog" plain>添加角色</el-button>
    <el-table
      :data="rolesData"
      style="width: 100%">
      <el-table-column type="expand">
          <template slot-scope="scope">
              <el-row v-if="scope.row.children.length === 0">
                  暂无权限
              </el-row>
              <el-row v-for="item in scope.row.children" :key="item.id">
                <el-col :span="4">
                    <el-tag
                    closable
                    @close="handleClose(scope.row,item.id)">
                    >
                    {{item.authName}}
                    </el-tag>

                </el-col>
                <el-col :span="20">
                    <el-row class="level2" v-for="level2 in item.children" :key="level2.id">
                        <el-col :span="4">
                            <el-tag
                            closable
                            type="success"
                            >
                            {{level2.authName}}
                            </el-tag>
                        </el-col>
                        <el-col :span="20">
                            <span class="level3" v-for="level3 in level2.children" :key="level3.id">
                                <el-tag
                                type="danger"
                                closable
                                >
                                {{level3.authName}}
                                 </el-tag>
                            </span>
                        </el-col>
                    </el-row>
                </el-col>
              </el-row>
          </template>
      </el-table-column>
      <el-table-column type="index" :index="indexMethod" />
      <el-table-column
        prop="roleName"
        label="角色名称"
        >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述"
        >
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
                <el-button size="small" @click="showEditDialog(scope.row)"  type="primary" icon="el-icon-edit" plain></el-button>
                <el-button @click="delRole(scope.row)" size="small"   type="danger" icon="el-icon-delete" plain></el-button>
                <el-button @click="assignRight(scope.row)" size="small" type="success" icon="el-icon-check" plain>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配角色授权 -->
    <el-dialog
        title="角色授权"
        :visible.sync="assigndialogVisible"
        >
        <el-tree
        :data="rightsList"
        default-expand-all
         ref="tree"
        show-checkbox
        node-key="id"
        :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
            <el-button @click="assigndialogVisible = false">取 消</el-button>
            <el-button @click="save()" type="primary" >确 定</el-button>
        </span>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" ref="editForm" :rules = "rules" status-icon>
        <el-form-item label="角色名称" prop = "roleName">
          <el-input v-model="editForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop ="roleDesc">
          <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </div>
  </el-dialog>
  <!-- 添加角色 -->
  <el-dialog title="编辑角色" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" ref="addForm" :rules = "rules" status-icon>
        <el-form-item label="角色名称" prop = "roleName">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop ="roleDesc">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      rolesData: [],
      assigndialogVisible: false,
      editDialogFormVisible: false,
      addDialogFormVisible: false,
      rightsList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      addForm: {
        roleName: '',
        roleDesc: '',
        rid: ''
      },
      editForm: {
        roleName: '',
        roleDesc: '',
        rid: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入名称', trigger: 'change' }
        ]
      },
      rowId: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    addRole() {
      this.$refs.addForm.validate(async(valid) => {
        if (!valid) return false
        const res = await this.$axios.post('roles', this.addForm)
        const { meta: { status } } = res
        if (status === 201) {
          this.addDialogFormVisible = false
          this.getRoleList()
          this.$message.success('创建角色成功')
        }
      })
    },
    showAddDialog() {
      this.addDialogFormVisible = true
    },
    // 更新角色
    updateRole() {
      this.$refs.editForm.validate(async(valid) => {
        if (!valid) return false
        const res = await this.$axios.put(`roles/${this.editForm.rid}`, this.editForm)
        const { meta: { status } } = res
        if (status === 200) {
          this.editDialogFormVisible = false
          this.getRoleList()
          this.$message.success('更新角色成功')
        }
      })
    },
    // 展示编辑角色对话框
    showEditDialog({ id, roleName, roleDesc }) {
      console.log(id)
      this.editDialogFormVisible = true
      this.editForm.rid = id
      this.editForm.roleName = roleName
      this.editForm.roleDesc = roleDesc
    },
    // 删除角色
    async delRole({ id }) {
      try {
        await this.$confirm('你确定要删除这个角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.$axios.delete(`roles/${id}`)
        const { meta: { status } } = res
        if (status === 200) {
          this.$message.success('删除成功')
          this.getRoleList()
        }
      } catch (e) {
        this.$message.error('取消成功')
      }
    },
    async getRoleList() {
      const res = await this.$axios.get('roles')
      const { data, meta: { status } } = res
      if (status === 200) {
        this.rolesData = data
      }
    },
    // 确定分配权限
    async save(row) {
      console.log(row)
      const keys = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      const res = await this.$axios.post(`roles/${this.rowId}/rights`, { rids: keys.join() })
      const { meta: { status } } = res
      if (status === 200) {
        this.assigndialogVisible = false
        this.getRoleList()
      }
    },
    // 分配权限
    async assignRight(row) {
      this.assigndialogVisible = true
      this.rowId = row.id
      const res = await this.$axios.get('rights/tree')
      const { data, meta: { status } } = res
      if (status === 200) {
        this.rightsList = data
        this.$nextTick(() => {
          const CheckedKeys = []
          row.children.forEach((level1) => {
            level1.children.forEach((level2) => {
              level2.children.forEach((level3) => {
                CheckedKeys.push(level3.id)
              })
            })
          })
          this.$refs.tree.setCheckedKeys(CheckedKeys)
        })
      }
    },
    indexMethod(index) {
      return index
    },
    async handleClose(role, rightId) {
      const res = await this.$axios.delete(`roles/${role.id}/rights/${rightId}`)
      const { data, meta: { status } } = res
      if (status === 200) {
        role.children = data
        this.$message({
          message: '删除权限成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.role {
  .level2 {
    margin-bottom: 10px;
    .level3 {
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }
}
</style>
