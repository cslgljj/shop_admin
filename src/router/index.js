import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
// import Home from '@/components/Home'
// import Users from '@/components/User/Users'
// import Roles from '@/components/Right/Roles'
// import Rights from '@/components/Right/Rights'
// import Categories from '@/components/Product/Categories'
// import Goods from '@/components/Product/Goods'
// import GoodsAdd from '@/components/Product/GoodsAdd'
// 定义异步组件
const Login = () => import(/* webpackChunkName: "login" */ '@/components/Login')
const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home')
const Users = () => import(/* webpackChunkName: "user" */ '@/components/User/Users')
const Roles = () => import(/* webpackChunkName: "right" */ '@/components/Right/Roles')
const Rights = () => import(/* webpackChunkName: "right" */ '@/components/Right/Rights')
const Categories = () => import(/* webpackChunkName: "product" */ '@/components/Product/Categories')
const Goods = () => import(/* webpackChunkName: "product" */ '@/components/Product/Goods')
const GoodsAdd = () => import(/* webpackChunkName: "product" */ '@/components/Product/GoodsAdd')
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
    }, {
      path: '/categories',
      component: Categories
    }, {
      path: '/goods',
      component: Goods
    }, {
      path: '/goods-add',
      component: GoodsAdd
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
