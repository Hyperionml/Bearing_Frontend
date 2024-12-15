import VueRouter from 'vue-router'
import House from '../page/House'
import Bearing01 from '../page/Bearing01'
import Bearing02 from '../page/Bearing02'
import Bearing03 from '../page/Bearing03'
// import DataLook from '../page/DataLook'

export default new VueRouter({
    routes: [
        {
            path: '/',
            component:House,
        },
        {
            path: '/bearing01',
            component: Bearing01
        },
        {
            path: '/bearing02',
            component: Bearing02,
        },
        {
            path: '/bearing03',
            component: Bearing03
        },
        // {
        //     path: '*',
        //     redirect: '/',
        // },
    ]
})