
const main = () => import('@/views/layout/index.vue')
import { markRaw } from 'vue'
import {  Menu,Odometer,Setting } from "@element-plus/icons-vue";
const menuIcon = markRaw(Menu)
const odometerIcon = markRaw(Odometer)
const settingIcon = markRaw(Setting)
const routes = [
  {
    path: '/',
    component: main,
    show: false,
    redirect: '/dashBoard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashBoard/index.vue'),
        name: 'Index',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: false }
      }
    ]
  },
  {
    path: '/dashBoard',
    meta: {
      title: 'DashBoard',
      icon: odometerIcon
    },
    show: true,
    component: main,
    component: () => import('@/views/dashBoard/index.vue')
  },
  {
    path: '/news',
    show: true,
    component: main,
    redirect: 'noRedirect',
    name: 'Daohang',
    meta: {
      title: '新闻管理',
      icon: menuIcon
    },
    children: [
      {
        path: 'newslist',
        component: () => import('@/views/news/newslist.vue'),
        name: 'Newslist',
        meta: {
          title: '新闻列表'
        }
      },
      {
        path: 'addnews',
        component: () => import('@/views/news/addnews.vue'),
        name: 'Addnews',
        meta: {
          title: '新增新闻'
        }
      }

    ]
  },
  {
    path: '/system',
    show: true,
    component: main,
    redirect: 'noRedirect',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: settingIcon
    },
    children: [
      {
        path: 'usergl',
        component: () => import('@/views/system/usergl.vue'),
        name: 'Users',
        meta: {
          title: '用户设置'
        }
      }

    ]
  },
  {
    path: '/login',
    show: false,
    component: () => import('@/views/user/login.vue')
  },

];

export default routes