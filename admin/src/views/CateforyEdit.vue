<template>
  <div>
    <h1>{{id ? '编辑': '创建'}}分类</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="items in parentOptions"
                     :key="items._id"
                     :label="items.name"
                     :value="items._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级名称">
        <el-input v-model="model.name"></el-input>
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
  data () {
    return {
      model: {},
      parentOptions: []
    }
  },
  created () {
    this.id && this.fetch()
    this.fetchParentOptions()
  },
  methods: {
    async save () {
      let res = {}
      console.log(res)
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/categories', this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParentOptions () {
      const res = await this.$http.get(`rest/categories`)
      this.parentOptions = res.data
    }
  }
}
</script>
