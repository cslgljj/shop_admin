import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Users from '@/components/Users'
import Roles from '@/components/Roles'
import Rights from '@/components/Rights'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/', // 默认进入路由
    redirect: '/login' // 重定向
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/users',
      component: Users
    }, {
      path: '/roles',
      component: Roles
    }, {
      path: '/rights',
      component: Rights
    }]
  }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // debugger
  // console.log(to, from)
  // console.log(1111)
  if (to.path === '/login' || token) {
    // console.log(666)
    next()
  } else {
    next('/login')
  }
})

export default router
