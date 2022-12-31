import { ref, reactive ,computed } from 'vue'
// 想要使用必须先引入 defineStore
import { defineStore } from 'pinia'
import { getRoleMenuByUserId } from '@/utils/api'

export const useState = defineStore('useState',{   
  state(){
    return {
      isCollapse: false ,
      // 当前用户信息，这个是用本地存储取的
      currentUserInfo : reactive({
        id : 100,
        username : '',
        nickname : '',
        avatarUrl : '',
      }),
      // 当前用户的菜单权限
      currentMenuInfo : reactive([]),
      // 路由
      currentRoute : ''
      
    }
  },
  
  actions:{
    // 改变导航栏状态
    changeCollapse(){
        this.isCollapse = !this.isCollapse
    },
    
    // 获取当前用户信息
    getCurrentUserInfo(){
      const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
      if(currentUser != null){
        Object.assign(this.currentUserInfo , currentUser)
        this.currentMenuInfo = localStorage.getItem("currentMenuInfo") ? JSON.parse(localStorage.getItem("currentMenuInfo") as string) : Object.assign(currentUser.menus)
      }
    },

    // 获取当前用户的菜单信息，异步
    getCurrentMenuInfo(){
      const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
      if(currentUser != null){
        getRoleMenuByUserId(currentUser.id).then(res =>{
          this.currentMenuInfo = Object.assign(res.data)
          localStorage.setItem("currentMenuInfo" , JSON.stringify(this.currentMenuInfo))
        })
      }
    },

    // 退出登录，注销
    loginout(){
      localStorage.removeItem('user')
      // 初始化currentUserInfo
      this.currentUserInfo = reactive({
        id : 100,
        username : '',
        nickname : '',
        avatarUrl : '',
      })
      // 后续做路由跳转到login的操作
    },

    // 改变当前用户信息
    changeCurrentUserInfo(UserData : any){
      Object.assign(this.currentUserInfo , UserData)
    },

    // 改变当前用户菜单信息
    changeCurrentMenuInfo(MenuData : any){
      Object.assign(this.currentMenuInfo , MenuData)
    },

    // 获取当前路由
    setRouteName(){
      this.currentRoute = localStorage.getItem('currentRouteName') as string
    }

  }

})

