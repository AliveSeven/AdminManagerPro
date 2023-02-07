import { createRouter, createWebHistory } from 'vue-router'
import { useState } from '@/stores/state';
import { isExpiration } from '@/utils/api'

// 路由
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
          path : 'userInfo',
          name : 'UserInfo',
          component : () => import('@/views/User/UserInfo.vue'),
        },
        {
          path : 'personal',
          name : 'Personal',
          children : [
            {
              path: 'todoList',
              name: 'TodoList',
              component: () => import('@/views/Personal/TodoList.vue')
            },
            {
              path: 'project',
              name: 'Project',
              component: () => import('@/views/Personal/Project.vue')
            },
            {
              path: 'momentsEdit',
              name: 'MomentsEdit',
              component: () => import('@/views/Personal/MomentsEdit.vue')
            },
            {
              path: 'favorites',
              name: 'Favorites',
              component: () => import('@/views/Personal/Favorites.vue')
            },
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path : '/register',
      name : 'Register',
      component : () => import('@/views/Register.vue')
    },
    {
      path : '/404',
      name : '404',
      component : () => import('@/views/Exception/Ex404.vue')
    },
    {
      path : '/403',
      name : '403',
      component : () => import('@/views/Exception/Ex403.vue')
    },
    {
      path : '/500',
      name : '500',
      component : () => import('@/views/Exception/Ex500.vue')
    },
  ]
})

// 路由监听
router.beforeEach((to , from , next) =>{
  const { setRouteName } = useState()
  localStorage.setItem('currentRouteName', to.name as string)
  // 设置当前路由
  setRouteName()

  // 如果当前路由是登录
  if(to.name === 'Login'){  
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).token : ''
    if(token != ''){
      // 检查token是否过期
      isExpiration(token).then(res =>{
        // 如果token没有过期，之间跳到主控台
        if(res.data){
          next("/home/dashBoard")
        }else {
          next()
        }
      })
    } else {
      next()
    }
  }

  // 未找到路由的情况
  else if (!to.matched.length) {
    const storeMenus = localStorage.getItem("menus")
    if (storeMenus) {
      next("/404")
    } else {
      // 跳回登录页面
      next("/login")
    }
  }

  else{
    // 其他的情况都放行
    next()
  }

})

const setRouter = () =>{
  const storeMenus = localStorage.getItem("currentMenuInfo") ? JSON.parse(localStorage.getItem("currentMenuInfo") as string) : null
  if(storeMenus != null){
    
  }
}


export default router