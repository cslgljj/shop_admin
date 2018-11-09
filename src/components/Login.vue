<template>
  <div class="login">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
        <img src="../assets/gf.png" alt="">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin('form')">登陆</el-button>
          <el-button @click = "handleReset('form')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleReset(formName) {
      this.$refs[formName].resetFields()
    },
    submitLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8888/api/private/v1/login', this.form).then((res) => {
            if (res.data.meta.status === 200) {
              this.$message({
                showClose: true,
                message: '登陆成功',
                type: 'success'
              })
              localStorage.setItem('token', res.data.data.token)
              this.$router.push('/home')
            } else {
              this.$message.error(res.data.meta.msg)
              return false
            }
          })
        } else {
          this.$message.error('请输入正确的用户名和密码')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: #324057;
  overflow: hidden;
  .el-form {
    width: 400px;
    border-radius: 20px;
    padding: 75px 40px 20px;
    margin: 200px auto;
    background: #fff;
    position: relative;
    img {
      width: 112px;
      height: 112px;
      border: 10px solid #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -90px;
    }
    .el-button + .el-button {
      margin-left: 50px;
    }
  }
}
</style>
