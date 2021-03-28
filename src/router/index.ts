import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { publicRoute, protectedRoute } from './config'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = publicRoute.concat(protectedRoute)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
