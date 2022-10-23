<template>
  <div class="aside">
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="route.path"
      text-color="#333639"
      :default-openeds="['1', '2']"
      style="height : 100vh"
      :collapse="state.isCollapse"
      :router = true
    >
      <div class="aside-logo">
        <img src="https://tangjiusheng.com/d/file/image/20200715/1594805355828805.jpg">
        <div class="logo-title">
          <span v-show="!state.isCollapse" >Admin Work Pro</span>
        </div>
      </div>
      <el-menu-item index="/home/dashBoard">
        <el-icon><PieChart /></el-icon>
        <span class="title">主控台</span>
      </el-menu-item>
      <el-sub-menu index="/home/system">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span class="title" >系统管理</span>
        </template>
        <el-menu-item index="/home/system/role"><el-icon><Operation /></el-icon>角色管理</el-menu-item>
        <el-menu-item index="/home/system/usertable"><el-icon><Operation /></el-icon>用户管理</el-menu-item>
        <el-menu-item index="/home/system/menu"><el-icon><Operation /></el-icon>菜单管理</el-menu-item>
        <el-menu-item index="/home/system/file"><el-icon><Operation /></el-icon>文件管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/home/userInfo" class="title">
        <el-icon><User /></el-icon>
        <span class="title">个人信息</span>
      </el-menu-item>
    </el-menu>
  </div>

</template>

<script lang="ts" setup>
import { useState } from '../stores/state'
import { PieChart , Operation, Setting, Menu, User } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const state = useState();

</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.aside-logo{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 60px;

  img{
    height: 30px;
    width: 30px;
  }

  .logo-title{
    margin-left: 10px;
    color: #333333;
    font-weight: 700;
    font-size: 14px;
    overflow: hidden;

    span{
      display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
      -webkit-line-clamp: 1; /* 显示的行数，这里限制为两行 */
      -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式，这里为向下排 */
      overflow: hidden; /* 超出盒子部分隐藏 */
      text-overflow: ellipsis;  /* 文字超出两行的部分为省略号 */
      word-break: break-all;  /* break-all(允许在单词内换行。) */  
    }
  }
}
</style>