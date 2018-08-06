import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '@/config/env'

Vue.use(Router)

const NotFound = r => require.ensure([], () => (require('@/components/NotFound')), 'NotFound')
const login = r => require.ensure([], () => (require('@/view/login/login')), 'login')
const management = r => require.ensure([], () => (require('@/view/management/')), 'management')
const user = r => require.ensure([], () => (require('@/view/userManagement/')), 'userManagement')
const wechat = r => require.ensure([], () => (require('@/view/wechat/')), 'wechat')

let routes = [{
  path: '/',
  component: management,
  redirect: '/user',
  children: [
    {
      path: '/user',
      component: user,
      meta: {
        id: '1000',
        permission: 'user_view'
      }
    },
    {
      path: '/wechat',
      component: wechat,
      meta: {
        id: '2000',
        permission: 'wechat_view'
      }
    }
  ]
}, {
  path: '/login',
  component: login
}]

/**
 * [path 404跳转]
 * @type {String}
 */
routes.push({
  path: '*',
  component: NotFound
})

const router = new Router({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production'
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
