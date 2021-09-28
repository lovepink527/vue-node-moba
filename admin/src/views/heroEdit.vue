<template>
  <div>
    <h1>{{id ? '编辑': '创建'}}英雄</h1>
    <el-form label-width="120px"
             @submit.native.prevent="save">
      <el-tabs value="basic"
               type="border-card">
        <el-tab-pane label="基础信息"
                     name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories"
                       multiple>
              <el-option v-for="item of categories"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader"
                       :action="$http.defaults.baseURL +  '/upload'"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess">
              <img v-if="model.avatar"
                   :src="model.avatar"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="10"
                     show-score
                     v-model="model.scores.difficult"
                     style="margin-top: 0.8rem"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="10"
                     show-score
                     v-model="model.scores.skills"
                     style="margin-top: 0.8rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="10"
                     show-score
                     v-model="model.scores.attack"
                     style="margin-top: 0.8rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="10"
                     show-score
                     v-model="model.scores.surive"
                     style="margin-top: 0.8rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.item1"
                       multiple>
              <el-option v-for="item of items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.item2"
                       multiple>
              <el-option v-for="item of items"
                         :key="item._id"
                         :label="item.name"
                         :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea"
                      v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea"
                      v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea"
                      v-model="model.teamTips"></el-input>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane label="技能">
          <el-button size="small"
                     @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex"
                  style="flex-wrap:wrap">
            <el-col :md="12"
                    v-for="(item,index) in model.skills"
                    :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader"
                           :action="$http.defaults.baseURL +  '/upload'"
                           :show-file-list="false"
                           :on-success="res => $set(item,'icon',res.url)">
                  <img v-if="item.icon"
                       :src="item.icon"
                       class="avatar">
                  <i v-else
                     class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea"
                          v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea"
                          v-model="item.tip"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small"
                           type="danger"
                           @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
        <el-button type="primary"
                   native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data () {
    return {
      model: {
        name: "",
        avatar: "",
        skills: [],
        partners: [],
        scores: {
          difficult: 0
        }
      },
      categories: [],
      items: [],
    }
  },
  created () {
    this.id && this.fetch()
    this.fetchCategories()
    this.fetchItems()
  },
  methods: {
    async save () {
      let res = {}
      console.log(res)
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/heroes', this.model)
      }
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories () {
      const res = await this.$http.get(`rest/category`)
      this.categories = res.data
    },
    async fetchItems () {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },
    handleAvatarSuccess (res) {
      // this.model.avatar = URL.createObjectURL(file.raw);
      // console.log(this.model.avatar, 'avatar')
      // this.model.avatar = URL.createObjectURL('');
      // console.log(this.model.url)
      this.$set(this.model, 'avatar', res.url)
      console.log(this.model)
    }
  }
}
</script>

<style scoped>

</style>
