<template>
    <div class="page-article">
        <div class="d-flex py-3 px-2 bg-white">
            <div class="text-blue icon-Back">《</div>
            <strong class="flex-1 text-left text-blue pl-2" v-if="model">
                {{model.title}}
            </strong>
            <div class="text-grey fs-xs">
                2019-06-08
            </div>
        </div>
        <div v-if="model" v-html="model.body" class="px-3 w-100 article-body fs-lg">
        </div>
        <div class="px-3 border-top py-2">
            <div class="d-flex ai-center">
                <i class="iconfont icon-Menu">
                </i>
                <strong class="text-blue fs-lg ml-1 text-left">相关资讯</strong>
            </div>
            <div class="pt-2 text-left" v-if="model">
                <router-link class="py-1" tag="div" :to="`/articles/${item._id}`" v-for="item in model.related" :key="item._id">
                    {{item.title}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        id: { required: true }
    },
    data() {
        return {
            model: null
        }
    },
    watch: {
        id: 'fetch'
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(`articles/${this.id}`)
            this.model = res.data
        }
    },
    created() {
        this.fetch()
    }

}
</script>

<style scope lang="scss">
.icon-Back {
    font-size: 1.375rem;
}
.article-body {
    img {
        max-width: 100%;
        height: auto;
    }
    iframe {
        width: 100%;
        height: auto;
    }
}
</style>