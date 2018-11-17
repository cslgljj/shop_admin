<template>
    <div class="right">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
            :data="rightsList"
            style="width: 100%">
            <el-table-column type="index" :index="indexMethod">

            </el-table-column>
            <el-table-column
                prop="authName"
                label="权限名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="path"
                label="路径"
                width="180">
            </el-table-column>
            <el-table-column label="层级" width="180">
                <template slot-scope = "scope">
                   {{level[scope.row.level]}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: [],
      level: { 0: '一级', 1: '二级', 2: '三级' }
    }
  },
  methods: {
    indexMethod(index) {
      return index
    }
  },
  async created() {
    const res = await this.$axios.get('rights/list')
    const { data, meta: { status } } = res
    if (status === 200) {
      this.rightsList = data
    }
  }
}
</script>

<style>
</style>
