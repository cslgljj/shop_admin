<template>
    <el-container class="home">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    height: 60px;
    background: #b3c1cd;
  }
  .el-aside {
    width: 200px;
    background: rgb(84, 92, 100);
  }
  .el-main {
    background: #eaeef1;
  }
}
</style>
