<template>
  <div>
    <h1>{{id ? '编辑': '创建'}}管理员</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-form-item label="姓名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    props: {
        id: {}
    },
    data() {
        return {
            model: {}
        };
    },
    created() {
        this.id && this.fetch();
    },
    methods: {
        async save() {
            let res = {};
            console.log(res);
            if (this.id) {
                res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/admin_users', this.model);
            }
            this.$router.push('/admin_user/list');
            this.$message({
                type: 'success',
                message: '成功'
            });
        },
        async fetch() {
            const res = await this.$http.get(`rest/admin_users/${this.id}`);
            this.model = res.data;
        }
    }
};
</script>

