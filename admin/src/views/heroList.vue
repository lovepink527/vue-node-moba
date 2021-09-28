<template>
  <div>
    <h1>英雄列表</h1>
    <el-table :data="heroes"
              style="width: 100%">
      <el-table-column prop="_id"
                       label="ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="英雄名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="title"
                       label="称号"
                       width="180">
      </el-table-column>
      <el-table-column prop="icon"
                       label="图标"
                       width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar"
               style="height:3rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/heroes/edit/${scope.row._id}`)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="remove(scope.row)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      heroes: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/heroes')
      this.heroes = res.data
    },
    remove (row) {
      console.log(row)
      this.$confirm(`是否删除分类` + row.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/heroes/${row._id}`)
        this.fetch()
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>