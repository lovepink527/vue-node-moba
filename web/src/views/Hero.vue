<template>
    <div class="hero" v-if="model">
        <div class="topbar bg-black py-2 text-white px-3 d-flex ai-center">
            <img src="../assets/logo.png" alt="" height='30'>
            <div class="text-white ml-3">王者荣耀</div>
            <div class="text-white ml-2 flex-1 text-left">攻略战</div>
            <router-link to="/" tag="div">更多英雄&gt;</router-link>
        </div>
        <div class="top" :style="{'background-image': `url(${model.banner})`}">
            <div class="info text-white h-100 p-3 d-flex flex-column jc-end text-left">
                <div class="fs-sm">
                    {{model.title}}
                </div>
                <div class="my-2 fs-xl">{{model.name}}</div>
                <div class="fs-sm">{{model.categories.map(v=> v.name).join('/')}}</div>
                <div class="d-flex jc-between pt-2" v-if="model.scores">
                    <div class="scores d-flex ai-center">
                        <span>难度</span>
                        <span class="badge bg-primary">{{model.scores.difficult}}</span>
                        <span>技能</span>
                        <span class="badge bg-blue1">{{model.scores.skills}}</span>
                        <span>攻击</span>
                        <span class="badge bg-danger">{{model.scores.attack}}</span>
                        <span>生存</span>
                        <span class="badge bg-dark">{{model.scores.survive}}</span>
                    </div>
                    <router-link to="/" tag="span" class="text-grey fs-sm">
                        皮肤：2 &gt;
                    </router-link>
                </div>

            </div>
        </div>
        <!-- end of top -->
        <div>
            <div class="px-3 bg-white">
                <div class="nav d-flex jc-around py-2 border-bottom">
                    <div class="nav-item active">
                        <div class="nav-item">英雄初识</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-item">进阶攻略</div>
                    </div>
                </div>
            </div>
            <swiper>
                <swiper-slide>
                    <div class="p-3 bg-white border-bottom">
                        <div class="d-flex">
                            <router-link tag="button" to="/" class="btn btn-lg flex-1">
                                <i class="iconfont icon-Menu"></i>
                                英雄介绍视频
                            </router-link>
                            <router-link tag="button" to="/" class="btn flex-1">
                                <i class="iconfont icon-Menu"></i>
                                一图识英雄
                            </router-link>
                        </div>
                    </div>

                    <!-- skills -->

                    <div class="skills bg-white mt-4 py-3">
                        <div class="d-flex jc-around">
                            <img class="icon" @click="currentSkillIndex = i" :class="{active: currentSkillIndex === i}" :src="item.icon" v-for="(item,i) in model.skills" :key="item.name" width="60" height="60">
                        </div>
                        <div v-if="currentSkills" class="px-3">
                            <div class="d-flex py-3">
                                <h3 class="m-0">{{currentSkills.name}}</h3>
                                <span class="text-grey-1 ml-4">
                                    (冷却值：{{currentSkills.delay}}
                                    消耗值：{{currentSkills.cost}}
                                    )
                                </span>
                            </div>
                            <p class="text-left">{{currentSkills.description}}</p>
                            <div class='border-bottom'></div>
                            <p class="text-grey-1 text-left">{{currentSkills.tip}}</p>
                        </div>
                    </div>
                    <m-card plain icon="Menu" title="出装推荐" class="hero-items">
                        <div class="fs-xl text-left">顺风出装</div>
                        <div class="d-flex jc-around text-center mt-3">
                            <div v-for="item in model.item1" :key="item.name">
                                <img :src="item.icon" class="icon">
                                <div class="fs-xs">{{item.name}}</div>
                            </div>
                        </div>
                        <div class="border-bottom mt-3"></div>
                        <div class="fs-xl text-left mt-3">逆风出装</div>
                        <div class="d-flex jc-around text-center mt-3">
                            <div v-for="item in model.item2" :key="item.name">
                                <img :src="item.icon" class="icon">
                                <div class="fs-xs">{{item.name}}</div>
                            </div>
                        </div>
                    </m-card>
                    <m-card plain icon="Menu" title="使用技巧">
                        <p class="m-0 text-left">{{model.usageTips}}</p>
                    </m-card>
                    <m-card plain icon="Menu" title="对抗技巧">
                        <p class="m-0 text-left">{{model.battleTips}}</p>
                    </m-card>
                    <m-card plain icon="Menu" title="团战思路">
                        <p class="m-0 text-left">{{model.usageTips}}</p>
                    </m-card>
                    <m-card plain icon="Menu" title="英雄关系">
                        <div class="fs-xl text-left">最佳搭档</div>
                        <div v-for="item in model.partners" :key="item._id" class="d-flex ai-center pt-3">
                            <img :src="item.hero.avatar" height="50">
                            <p class="flex-1 m-0 ml-3 text-left">
                                {{item.description}}
                            </p>
                        </div>
                        <div class="border-bottom mt-3"></div>
                    </m-card>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            required: true
        }
    },
    data() {
        return {
            model: null,
            currentSkillIndex: 0
        }
    },
    computed: {
        currentSkills() {
            return this.model.skills[this.currentSkillIndex]
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(`heroes/${this.id}`)
            this.model = res.data
        }
    },
    created() {
        this.fetch()
    }
}
</script>

<style lang="scss" scope>
@import "../assets/scss/_variables.scss";
.hero {
    .top {
        height: 60vw;
        background: #fff no-repeat top center;
        background-size: 100% 100%;
    }
}

.info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
        .badge {
            margin: 0 0.25rem;
            display: inline-block;
            width: 1rem;
            height: 1rem;
            line-height: 0.9rem;
            text-align: center;
            border-radius: 50%;
            font-size: 0.6rem;
            border: 1px solid rgba($color: #000000, $alpha: 0.2);
        }
    }
}

.skills {
    img.icon {
        border: 3px solid map-get($map: $colors, $key: "white");
        border-radius: 45%;
        &.active {
            border: 3px solid map-get($map: $colors, $key: "primary");
        }
    }
}

.hero-items {
    img.icon {
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
}
</style>