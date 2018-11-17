<template>
    <div class="goodAdd">
        <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" description="基本信息"></el-step>
        <el-step title="步骤 2" description="商品图片"></el-step>
        <el-step title="步骤 3"></el-step>
        </el-steps>
        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="基本信息" name="basic" >
                <el-form ref="addForm" :model="addForm" label-width="80px">
                  <el-form-item label="商品名称">
                    <el-input v-model="addForm.goods_name"></el-input>
                  </el-form-item>
                  <el-form-item label="商品价格">
                    <el-input v-model="addForm.goods_price"></el-input>
                  </el-form-item>
                  <el-form-item label="商品重量">
                    <el-input v-model="addForm.goods_weight"></el-input>
                  </el-form-item>
                  <el-form-item label="商品数量">
                    <el-input v-model="addForm.goods_number"></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <el-cascader
                      :props="props"
                      :options="options"
                      v-model="addForm.goods_cat"
                      >
                    </el-cascader>
                  </el-form-item>
                   <el-form-item label="是否促销">
                    <el-radio v-model="addForm.is_promote" :label="true">是</el-radio>
                    <el-radio v-model="addForm.is_promote" :label="false">否</el-radio>
                  </el-form-item>
                  <el-button type="primary" @click="next(1,'pic')">下一步</el-button>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="pic" >
              <el-upload
                :headers="headers"
                class="upload-demo"
                action="http://localhost:8888/api/private/v1/upload"
                :on-success="handleSuccess"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <el-button type="primary" @click="next(2,'content')">下一步</el-button>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="content" description="商品内容">
              <quillEditor v-model="addForm.goods_introduce"></quillEditor>
              <el-button type="primary" @click="addProduct">添加</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      headers: { Authorization: localStorage.getItem('token') },
      activeName: 'basic',
      radio: '1',
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedOptions: [],
      addForm: {
        goods_name: '',
        is_promote: false,
        goods_cat: [],
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        pics: [],
        goods_introduce: ''
      },
      active: 0,
      tabPosition: 'left'
    }
  },
  methods: {
    async addProduct() {
      const res = await this.$axios.post('goods', { ...this.addForm, goods_cat: this.addForm.goods_cat.join() })
      const { meta: { status } } = res
      if (status === 201) {
        this.$router.push('/goods')
        this.$message.success('商品添加成功')
      }
    },
    next(active, name) {
      this.active = active
      this.activeName = name
    },
    handleSuccess(res) {
      const {
        meta: { status },
        data: { tmp_path: tmpPath }
      } = res
      if (status === 200) {
        this.addForm.pics.push({
          pic: tmpPath
        })
      }
    },
    handleClick(tab) {
      // 设置active的值
      this.active = +tab.index
    }
  },
  async created() {
    const res = await this.$axios.get('categories', { type: 3 })
    const { data, meta: { status } } = res
    if (status === 200) {
      this.options = data
    }
  }
}
</script>

<style lang="less" scoped>
.quill-editor {
  background: #fff;
  /deep/ .ql-editor {
    height: 300px;
  }
}
</style>
