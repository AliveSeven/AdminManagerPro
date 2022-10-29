<template>
    <RouterView v-slot="{ Component }">
      <transition name="el-fade-in" >
        <keep-alive>
          <component :is="Component" :key="key" v-show="is_show"/>
        </keep-alive>
      </transition>
    </RouterView>

    <Ex403 v-show="!is_show"></Ex403>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { useState } from '@/stores/state'
import { computed } from "vue";
import { getRoleMenuByUserId } from '@/utils/api'
import Ex403 from '@/views/Exception/Ex403.vue'

interface Menu{
  id : number
  name : string
  path : string
  icon : string
  description : string
  is_hide : number
  pid : number
}

// 状态管理器
const state = useState()
// 当前路由页面
const currentRoutePage : any = ref([])
// 获取当前用户信息id
const is_show = ref(false);

const getCurrentMenuPath = () =>{
  // console.log('Main中的state.currentMenuInfo' , state.currentMenuInfo)
  state.currentMenuInfo.forEach((element : Menu) => {
    currentRoutePage.value.push(element.path)
  });
}

// 获取当前角色的权限菜单
getCurrentMenuPath()

// 路由中添加key解决切换路由时页面不展示内容，刷新后才展示内容问题
const route = useRoute();
const key = computed(() => {
  if(currentRoutePage.value.indexOf(route.path) != -1){
    is_show.value = true
  } else {
    is_show.value = false
  }
  return route.path;
});


</script>
