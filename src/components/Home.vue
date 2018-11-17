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
                :default-active="$route.path.slice(1).split('-')[0]"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu :index="level1.path" v-for="level1 in menuList" :key="level1.id">
                  <template slot="title" >
                    <i class="el-icon-location"></i>
                    <span>{{level1.authName}}</span>
                  </template>
                  <el-menu-item :index="level2.path" v-for="level2 in level1.children" :key="level2.id">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{level2.authName}}</span>
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
      dialogVisible: false,
      menuList: []
    }
  },
  async created() {
    const res = await this.$axios.get('/menus')
    const { data, meta: { status } } = res
    if (status === 200) {
      this.menuList = data
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
