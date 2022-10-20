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
          path: 'userTable',
          name: 'UserTable',
          component: () => import('@/views/User/UserTableView.vue')
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
        {
          path : 'dashBoard',
          name : 'DashBoard',
          component : () => import('@/views/System/DashBoard.vue')
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
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
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
