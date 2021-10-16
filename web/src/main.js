import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import axios from 'axios'

import VueAwesomeSwiper from 'vue-awesome-swiper'


Vue.config.productionTip = false;

import './assets/scss/style.scss';
import '../node_modules/swiper/dist/css/swiper.min.css'
import './assets/iconfont/iconfont.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )

Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3001/web/api'
})

import Card from './components/Card.vue'

Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue'

Vue.component('m-list-card', ListCard)

new Vue({
    render: h => h(App),
    router
}).$mount('#app');