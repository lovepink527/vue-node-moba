import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('../views/Login.vue'),
    meta: {
        isPublic: true
    }
}, {
    path: '/',
    name: 'Main',
    component: () =>
        import ('../views/Main.vue'),
    children: [{
            path: '/categories/create',
            name: '',
            component: () =>
                import ('../views/CateforyEdit.vue')
        },
        {
            path: '/categories/edit/:id',
            name: '',
            component: () =>
                import ('../views/CateforyEdit.vue'),
            props: true
        }, {
            path: '/categories/list',
            name: '',
            component: () =>
                import ('../views/List.vue')
        },
        {
            path: '/items/create',
            name: '',
            component: () =>
                import ('../views/itemEdit.vue')
        },
        {
            path: '/items/edit/:id',
            name: '',
            component: () =>
                import ('../views/itemEdit.vue'),
            props: true
        },
        {
            path: '/items/list',
            name: '',
            component: () =>
                import ('../views/itemList.vue')
        }, {
            path: '/heroes/create',
            name: '',
            component: () =>
                import ('../views/heroEdit.vue')
        },
        {
            path: '/heroes/edit/:id',
            name: '',
            component: () =>
                import ('../views/heroEdit.vue'),
            props: true
        },
        {
            path: '/heroes/list',
            name: '',
            component: () =>
                import ('../views/heroList.vue')
        }, {
            path: '/articles/create',
            name: '',
            component: () =>
                import ('../views/ArticleEdit.vue')
        },
        {
            path: '/articles/edit/:id',
            name: '',
            component: () =>
                import ('../views/ArticleEdit.vue'),
            props: true
        },
        {
            path: '/articles/list',
            name: '',
            component: () =>
                import ('../views/ArticleList.vue')
        },
        {
            path: '/ads/create',
            name: '',
            component: () =>
                import ('../views/adsEdit.vue')
        },
        {
            path: '/ads/edit/:id',
            name: '',
            component: () =>
                import ('../views/adsEdit.vue'),
            props: true
        },
        {
            path: '/ads/list',
            name: '',
            component: () =>
                import ('../views/adsList.vue')
        },
        {
            path: '/admin_user/create',
            name: '',
            component: () =>
                import ('../views/AdminUserEdit.vue')
        },
        {
            path: '/admin_user/edit/:id',
            name: '',
            component: () =>
                import ('../views/AdminUserEdit.vue'),
            props: true
        },
        {
            path: '/admin_user/list',
            name: '',
            component: () =>
                import ('../views/AdminUserList.vue')
        },
    ]
}];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (!to.meta.isPublic && !localStorage.token) {
        return next('/login');
    }
    next();
});

export default router;