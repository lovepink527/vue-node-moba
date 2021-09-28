<template>
  <div>
    <h1>{{id ? '编辑': '创建'}}文章</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories"
                   multiple>
          <el-option v-for="items in categories"
                     :key="items._id"
                     :label="items.name"
                     :value="items._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body"
                    id="editor"
                    useCustomImageHandler
                    @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {},
      categories: []
    }
  },
  components: {
    VueEditor
  },
  created () {
    this.id && this.fetch()
    this.fetchCatogories()
  },
  methods: {
    async save () {
      let res = {}
      console.log(res)
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/articles', this.model)
      }
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCatogories () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      console.log('上传')
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post('upload', formData)
      console.log(res)
      // 插入光标
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      // 重置上传器
      resetUploader();
    }
  }
}
</script>
