<template>
  <div>
    <h1>{{id ? '编辑': '创建'}}物品</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader"
                   :action="uploadUrl"
                   :headers="getAuthHeader()"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess">
          <img v-if="model.icon"
               :src="model.icon"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    {{this.model.icon}}
  </div>
</template>

<script>
export default {
    props: {
        id: {}
    },
    data() {
        return {
            model: {},
            parentOptions: []
        };
    },
    created() {
        this.id && this.fetch();
        this.fetchParentOptions();
        // this.getAuthHeader();
    },
    methods: {
        async save() {
            let res = {};
            console.log(res);
            if (this.id) {
                res = await this.$http.put(`rest/items/${this.id}`, this.model);
            } else {
                res = await this.$http.post('rest/items', this.model);
            }
            this.$router.push('/items/list');
            this.$message({
                type: 'success',
                message: '成功'
            });
        },
        async fetch() {
            const res = await this.$http.get(`rest/items/${this.id}`);
            this.model = res.data;
        },
        async fetchParentOptions() {
            const res = await this.$http.get(`rest/items`);
            this.parentOptions = res.data;
        },
        handleAvatarSuccess(res) {
            this.$set(this.model, 'icon', res.url);
            console.log(this.model);
            // this.model.icon = URL.createObjectURL(file.raw);
            // console.log(this.model.icon, 'icon')
            // this.model.url = res.url
            // this.$set(this.model, 'icon', res.url)
        }
    }
};
</script>

