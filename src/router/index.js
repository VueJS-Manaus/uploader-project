import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './authGuard'
import Login from '@/components/Login'
import Uploader from '@/components/Uploader'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/upload',
      name: 'Uploader',
      component: Uploader,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
