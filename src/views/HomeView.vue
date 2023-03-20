<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="--el-aside-width">
      <el-scrollbar>
        <Aside></Aside>
      </el-scrollbar>
    </el-aside>

    <el-container class="layout-container-right">
      <el-header style="text-align: right; font-size: 12px" class="to-header">
        <Header></Header>
      </el-header>

      <el-main class="main-container">
        <el-scrollbar>
          <Main></Main>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Aside from '@/layout/Aside.vue'
import Main from '@/layout/Main.vue'
import Header from '@/layout/Header.vue'

// import { useState } from './stores/state'

// const state = useState();
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  box-shadow: 5px 5px 5px #0000001f;
  z-index: 999;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.main-container{
  margin: 5px;
}
</style>