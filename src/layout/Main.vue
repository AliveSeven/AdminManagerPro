<template>
    <RouterView v-slot="{ Component }">
      <transition name="el-fade-in" >
        <keep-alive>
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </RouterView>
</template>

<script lang="ts" setup>
import { useRoute, RouterView } from 'vue-router'

import { computed } from "vue";
 
// 路由中添加key解决切换路由时页面不展示内容，刷新后才展示内容问题
const route = useRoute();
const key = computed(() => {
  return route.path + Math.random();
});
</script>
