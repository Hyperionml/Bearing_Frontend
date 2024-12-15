import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
Vue.config.productionTip = false

Vue.use(VueRouter)
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
})