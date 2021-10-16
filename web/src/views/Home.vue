<template>
    <div class="home">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide :options="swiperOptions">
                <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- <div class="swiper-pagination pagination-home text-right" slot="pagination"></div> -->
        </swiper>
        <!-- end of swiper -->
        <div class="nav-icons bg-white mt-3 d-flex flex-wrap text-center pt-3 text-grey">
            <div class="nav-item mb-3" v-for="n in 10" :key="n">
                <i class="sprite sprite-news"></i>
                <div class="py-2">爆料站</div>
            </div>
        </div>
        <div class="bg-light py-2 fs-sm">
            <i class="sprite sprite-arrow mr-1"></i>
            <span>收起</span>
        </div>
        <!-- end of nav -->
        <!-- <i class="iconfont icon-Menu"></i> -->
        <!-- end of icons -->
        <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
            <template #items="{category}">
                <router-link class="py-2 fs-lg d-flex" v-for="(items,index) in category.newsList" :key="index" tag="div" :to="`/articles/${items._id}`">
                    <span class="text-info">[{{items.categoryName}}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-dark text-ellipsis text-left">{{items.title}}</span>
                    <span class="text-grey">{{items.createdAt | date}}</span>
                </router-link>
            </template>
        </m-list-card>
        <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
            <template #items=" {category}">
                <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
                    <router-link tag="div" :to="`hero/${items._id}`" class="p-2 text-center" style="width: 20%" v-for="(items,index) in category.heroList" :key="index">
                        <img :src="items.avatar" alt="" class="w-100">
                        <div>{{items.name}}</div>
                    </router-link>
                </div>
            </template>
        </m-list-card>
        <m-card icon="Menu" title="新闻资讯">
        </m-card>
        <m-card icon="card-hero" title="精彩视频">
        </m-card>
        <m-card icon="card-hero" title="图文攻略">
        </m-card>
    </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    filters: {
        date(val) {
            return dayjs(val).format('MM/DD')
        }
    },
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination'
                },
                // Some Swiper option/callback...
            },
            newsCats: [
            ],
            heroCats: []
        }
    },
    created() {
        this.fetchNewsCats()
        this.fetchHeroCats()
    },
    mounted() {
    },
    methods: {
        async fetchNewsCats() {
            const res = await this.$http.get('news/list')
            this.newsCats = res.data
            console.log(res.data)
        },
        async fetchHeroCats() {
            const res = await this.$http.get('heroes/list')
            this.heroCats = res.data
        }
    }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
// .pagination-home {
//     .swiper-pagination-bullet {
//         border-radius: 0.1538rem;
//         background-color: #fff;
//         &.swiper-pagination-bullet-active {
//             background-color: map-get($colors, "info");
//         }
//     }
// }

.nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item {
        width: 25%;
        border-left: 1px solid $border-color;
        &:nth-child(4n + 1) {
            border-left: none;
        }
    }
}
</style>
