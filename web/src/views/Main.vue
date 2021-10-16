<template>
    <div>
        <div class="topbar bg-black py-2 text-white px-3 d-flex ai-center">
            <img src="../assets/logo.png" alt="" height='30'>
            <div class="px-2 flex-1 text-left">
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xxs">团队成就更多</div>
            </div>
            <button type="button" class="btn bg-primary ">立即下载</button>
        </div>
        <div class="nav bg-primary pt-3 pb-2">
            <div class="nav pb-1 nav-inverse d-flex text-white jc-around">
                <div class="nav-item active">
                    <router-link tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link tag="div" to="/">赛事中心</router-link>
                </div>
            </div>

        </div>

        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.topbar {
    position: sticky;
    top: 0;
    z-index: 999;
}
</style>