import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import DevicesIndex from '../views/Devices/Index.vue'
import DevicesDetail from '../views/Devices/Detail.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      }, {
        path: 'devices',
        name: 'devicesIndex',
        component: DevicesIndex
      }, {
        path: 'devices/:id',
        name: 'devicesDetail',
        component: DevicesDetail
      }, {
        path: 'setting',
        name: 'setting',
        component: Setting
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
