
const main = () => import('@/views/layout.vue')
const routes = [
  {
    path: '/',
    component: main,
    show: false,
    redirect: '/news/newslist',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/news/newslist.vue'),
        name: 'Index',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: false }
      }
    ]
  },
  {
    path: '/news',
    title: '新闻管理',
    show: true,
    component: main,
    redirect: 'noRedirect',
    name: 'Daohang',
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
    title: '系统管理',
    show: true,
    component: main,
    redirect: 'noRedirect',
    name: 'System',
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