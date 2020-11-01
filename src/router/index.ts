import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Graphs from '../views/Graphs.vue'
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
        path: 'graphs',
        name: 'graphs',
        component: Graphs
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
