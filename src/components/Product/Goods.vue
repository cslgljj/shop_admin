<template>
    <div class="good">
        <el-button type="success" @click="$router.push('/goods-add')">添加商品</el-button>
        <el-table
        :data="productList"
        style="width: 100%">
        <el-table-column
            prop="goods_name"
            label="商品名称"
            >
        </el-table-column>
        <el-table-column
            prop="goods_price"
            label="商品价格"
            >
        </el-table-column>
        <el-table-column
            prop="goods_weight"
            label="商品重量">
        </el-table-column>
        <el-table-column
            label="创建时间">
            <template slot-scope="scope">
              {{scope.row.add_time | DateFilter}}
            </template>
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope = "scope">
                <el-button size="small"   type="primary" icon="el-icon-edit" plain></el-button>
                <el-button  size="small"   type="danger" icon="el-icon-delete" plain></el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      productList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  methods: {
    async getGoods() {
      const res = await this.$axios.get('goods', { params: { pagenum: this.pagenum, pagesize: this.pagesize } })
      const { data: { goods, total }, meta: { status } } = res
      if (status === 200) {
        this.productList = goods
        this.total = total
      }
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getGoods()
    },
    handleCurrentChange(val) {
      this.pagenum = val
      this.getGoods()
    }
  },
  created() {
    this.getGoods()
  }
}
</script>

<style>
</style>
