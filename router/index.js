import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/Article.vue')
    // redirect: '/'

  },
  {
    path: '/article/:id',  //文章子路由
    name: 'ArticleId',
    component: () => import('../views/ArticleId.vue')

  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message.vue')
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('../views/Link.vue')
  },
  {
    path: '/userc',
    name: 'UserC',
    component: () => import('../views/UserC.vue')
  },
  {
    path: '/adminc',
    name: 'AdminC',
    component: () => import('../views/AdminC.vue')
  },
  {
    //配置404
    path: '/:pathMatch(.*)',    //vue3新写法   vue2直接在''中写* 就可以了
    name: '404',
    component: () => import('../views/404')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
