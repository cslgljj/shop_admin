<template>
    <div class="category">
        <el-button type="success" @click="showAddDialog">添加分类</el-button>
        <el-table
        :data="categoryList"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255,255,255, 0.8)"
        style="width: 100%">
        <element-tree-item
            width="180"
            treeKey="cat_id"
            levelKey="cat_level"
            parentKey="cat_pid"
            prop="cat_name"
            label="分类名称"
            >
        </element-tree-item>
        <el-table-column
            width="180"
            prop="cat_deleted"
            label="是否删除"
            >
            <template slot-scope="scope">
          {{scope.row.cat_deleted?'是':'否'}}
        </template>
        </el-table-column>
        <el-table-column
            width="180"
            prop="cat_level"
            label="排序">
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope = "scope">
                <el-button size="small" @click="showEditDialog(scope.row)" type="primary" icon="el-icon-edit" plain></el-button>
                <el-button size="small"   type="danger" icon="el-icon-delete" plain></el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8, 10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 添加分类 -->
      <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" :rules="rules" ref="addForm">
          <el-form-item label="分类名称" prop="cat_name"  label-width="100px">
            <el-input v-model="addForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级名称" label-width="100px">
            <el-cascader
              :options="options"
                :props="{
               label: 'cat_name',
               value: 'cat_id',
               children:'children'
               }"
               :change-on-select="true"
              v-model="addForm.selectedOptions"
              >
            </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate" >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改分类 -->
      <el-dialog title="编辑分类" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm" :rules="rules" ref="editForm">
          <el-form-item label="分类名称" prop="cat_name"  label-width="100px">
            <el-input v-model="editForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级名称" label-width="100px">
            <el-cascader
              :options="options"
                :props="{
               label: 'cat_name',
               value: 'cat_id',
               children:'children'
               }"
               :change-on-select="true"
              v-model="editForm.selectedOptions"
              >
            </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      addForm: {
        name: '',
        cat_name: '',
        selectedOptions: []
      },
      editForm: {
        name: '',
        cat_name: '',
        selectedOptions: []
      },
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'change' }
        ]
      },
      currentPage: 1,
      loading: false,
      categoryList: [],
      pagesize: 10,
      pagenum: 1,
      total: 0
    }
  },
  methods: {
    async showEditDialog(row) {
      console.log(row)
      const res = await this.$axios.get('categories', { params: { type: 2 } })
      const { data, meta: { status } } = res
      if (status === 200) {
        this.options = data
      }
      this.editDialogFormVisible = true
      this.editForm.cat_name = row.cat_name
      this.editForm.selectedOptions.push(row.cat_id)
    },
    addCate() {
      this.$refs.addForm.validate(async(valid) => {
        if (!valid) return false
        const { cat_name: catName, selectedOptions } = this.addForm
        const res = await this.$axios.post('categories', {
          cat_name: catName,
          cat_pid: selectedOptions[selectedOptions.length - 1] || 0,
          cat_level: selectedOptions.length
        })
        const { meta: { status } } = res
        if (status === 201) {
          this.getCategoryList()
          this.addDialogFormVisible = false
          this.$message.success('创建成功')
        }
      })
    },
    async showAddDialog() {
      this.addDialogFormVisible = true
      const res = await this.$axios.get('categories', { params: { type: 2 } })
      const { data, meta: { status } } = res
      if (status === 200) {
        this.options = data
      }
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getCategoryList()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getCategoryList()
    },
    async getCategoryList() {
      this.loading = true
      const res = await this.$axios.get('categories', { params: { type: 3, pagesize: this.pagesize, pagenum: this.pagenum } })
      const { data: { result, total }, meta: { status } } = res
      if (status === 200) {
        this.total = total
        setTimeout(() => {
          this.loading = false
        }, 500)
        this.categoryList = result
      }
    }
  },
  created() {
    this.getCategoryList()
  }
}
</script>

<style>
</style>
