<template>
    <el-container class="home">
        <el-header>
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="logout">
                <span>欢迎光临</span>
                <a @click="logout">退出</a>
            </div>
            <h1>
                后台管理系统
            </h1>
        </el-header>
        <el-container>
            <el-aside width="200px">
              <el-menu
                router
                unique-opened
                default-active="/user"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                  <template slot="title" >
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item index="/user">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户列表</span>
                  </el-menu-item>
                </el-submenu>
                  <el-submenu index="2">
                    <template slot="title" >
                      <i class="el-icon-location"></i>
                      <span>权限管理</span>
                    </template>
                    <el-menu-item index="2-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">角色列表</span>
                    </el-menu-item>
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title" >
                      <i class="el-icon-location"></i>
                      <span>商品管理</span>
                    </template>
                    <el-menu-item index="3-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">商品列表</span>
                    </el-menu-item>
                  </el-submenu>
                  <el-submenu index="4">
                    <template slot="title" >
                      <i class="el-icon-location"></i>
                      <span>订单管理</span>
                    </template>
                    <el-menu-item index="4-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">订单列表</span>
                    </el-menu-item>
                  </el-submenu>
                  <el-submenu index="5">
                    <template slot="title" >
                      <i class="el-icon-location"></i>
                      <span>数据统计</span>
                    </template>
                    <el-menu-item index="5-1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">数据报表</span>
                    </el-menu-item>
                  </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleOpen() {
    //   console.log(key, keyPath)
    },
    handleClose() {
    //   console.log(key, keyPath)
    },
    logout() {
      this.$confirm('您确定要退出吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('注销成功')
      }).catch(() => {
        this.$message.error('取消登陆')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    height: 60px;
    background: #b3c1cd;
    h1 {
      height: 60px;
      text-align: center;
      line-height: 60px;
      color: #fff;
      font-size: 30px;
      overflow: hidden;
    }
    .logo {
      width: 180px;
      float: left;
      height: 60px;
      img {
        width: 100%;
        height: 60px;
      }
    }
    .logout {
      width: 180px;
      line-height: 60px;
      float: right;
      height: 60px;
      font-weight: 700;
      span + a {
        cursor: pointer;
        color: #b07a17;
      }
    }
  }

  .el-aside {
    background: rgb(84, 92, 100);
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background: #eaeef1;
  }
}
</style>
