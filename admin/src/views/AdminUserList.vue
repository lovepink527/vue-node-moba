<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items"
              style="width: 100%">
      <el-table-column prop="_id"
                       label="ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="username"
                       label="管理员姓名"
                       width="180">
      </el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button @click="$router.push(`/admin_user/edit/${scope.row._id}`)"
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
    data() {
        return {
            items: []
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('rest/admin_users');
            console.log(this.items, '数据');
            this.items = res.data;
        },
        remove(row) {
            console.log(row);
            this.$confirm(`是否删除管理员` + row.name, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    await this.$http.delete(`rest/admin_users/${row._id}`);
                    this.fetch();
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};
</script>