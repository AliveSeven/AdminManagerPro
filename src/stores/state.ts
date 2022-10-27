import { ref, reactive ,computed } from 'vue'
// 想要使用必须先引入 defineStore
import { defineStore } from 'pinia'
import { getRoleMenu } from '@/utils/api'

export const useState = defineStore('main',{   
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
      currentMenuInfo : ref([])
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
      }
    },

    // 改变当前用户信息
    changeCurrentUserInfo(UserData : any){
      Object.assign(this.currentUserInfo , UserData)
    },

    // 获取当前用户的权限菜单
    getCurrentUserMenu(){
      const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null
      if(currentUser != null){
        getRoleMenu(currentUser.id).then(res =>{
          if(res.code === '200'){
            this.currentMenuInfo.values = res.data
            // Object.assign(this.currentMenuInfo , res.data)
            console.log(this.currentMenuInfo)
            // 存在浏览器本地存储中
            localStorage.setItem("currentMenuInfo" , JSON.stringify(res.data))
          }
        })
      }
    }

  }

})

