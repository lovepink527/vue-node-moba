<template>
    <div class="card bg-white p-3 mt-3">
        <div class="card-header d-flex pb-3" :class="{'border-bottom': !plain,'mt-3': !plain}">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="fs-xl flex-1 px-2 text-left">
                {{title}}
            </div>
        </div>
        <div class="nav-body pt-3">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        plain: {
            type: Boolean
        }

    }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
    // .card-header {
    //     border-bottom: 1px solid $border-color;
    // }
    border-bottom: 1px solid $border-color;
}
</style>