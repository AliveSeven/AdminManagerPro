import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      redirect : '/home',
      children : []
    },
    {
      path : '/home',
      component : () => import('@/views/HomeView.vue'),
      redirect : '/login',
      children : [
        {
          path : 'dashBoard',
          name : 'DashBoard',
          component : () => import('@/views/System/DashBoard.vue')
        },
        {
          path : 'system',
          name : 'System',
          children : [
            {
              path: 'userTable',
              name: 'UserTable',
              component: () => import('@/views/User/UserTableView.vue')
            },
            {
              path : 'menu',
              name : 'Menu',
              component : () => import('@/views/System/MenuView.vue')
            },
            {
              path : 'role',
              name : 'Role',
              component : () => import('@/views/System/RoleView.vue')
            },
            {
              path : 'file',
              name : 'File',
              component : () => import('@/views/System/FileView.vue')
            }
          ]
        },
        {
          path : 'department',
          name : 'Department',
          component : () => import('@/views/User/Department.vue')
        },
        {
          path : 'userInfo',
          name : 'UserInfo',
          component : () => import('@/views/User/UserInfo.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path : '/404',
      name : '404',
      component : () => import('@/views/Exception/404.vue')
    },
    {
      path : '/403',
      name : '403',
      component : () => import('@/views/Exception/403.vue')
    },
    {
      path : '/500',
      name : '500',
      component : () => import('@/views/Exception/500.vue')
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
