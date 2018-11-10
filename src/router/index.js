import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import User from '@/components/User'

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
      path: '/user',
      component: User
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
