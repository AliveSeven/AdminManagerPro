<template>
    <div class="toolbar">
        <div class="toolbar-left">
            <div class="isExpand" @click="state.changeCollapse()">
                <el-icon :size="22" :style="{'display' : (state.isCollapse ? 'none' : 'block')}">
                    <Expand />
                </el-icon>
                <el-icon :size="22" :style="{'display' : (state.isCollapse ? 'block' : 'none')}">
                    <Fold />
                </el-icon>
            </div>
        </div>

        <div class="toolbar-bread">
            <transition name="slide-fade" >
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="'/home/dashBoard'">首页</el-breadcrumb-item>
                    <el-breadcrumb-item >{{ brands }}</el-breadcrumb-item>
                </el-breadcrumb>
            </transition>
        </div>

        <div class="toolbar-right">
            <div class="avatar-wrapper" style="cursor: pointer;">
                <div class="avatar">
                    <img :src="state.currentUserInfo.avatarUrl" alt="">
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                      {{ state.currentUserInfo.nickname }}
                      <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :icon="User" @click="router.push({path : '/home/userInfo'})">个人中心</el-dropdown-item>
                        <el-dropdown-item :icon="CircleCloseFilled" @click="showLoginOut = true">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>

    <!-- 退出登录的对话框 -->
    <el-dialog v-model="showLoginOut" title="温馨提示" width="30%" center>
      <span>
        要退出当前账号吗？
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showLoginOut = false">取消</el-button>
          <el-button type="primary" @click="LoginOut">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

</template>

<script lang="ts" setup>
import { useState } from '../stores/state'
import { User, CircleCloseFilled } from '@element-plus/icons-vue'
import router from '@/router';
import { computed , ref } from 'vue'
// pinia
const state = useState();
// 面包屑
const brands = computed(() =>{
    return state.currentRoute
})

// 获取当前用户数据
state.getCurrentUserInfo()

// 退出登录的对话框
const showLoginOut = ref(false)
// 点击退出登录
const LoginOut = () =>{
    // 执行退出账号
    state.loginout()
    router.push({path : '/login'})
}

</script>

<style lang="less" scoped>
.toolbar {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
    width: 100%;
    right: 20px;

    .toolbar-left {
        float: left;
        padding-left: 20px;

        .isExpand {
            cursor: pointer;
        }
    }

    .toolbar-bread{
        margin-left: 10px;
    }

    .toolbar-right {
        margin-left: auto;

        .avatar-wrapper{
            display: flex;

            .avatar{
                width: 30px;
                height: 30px;
                margin-right: 10px;

                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .el-dropdown-link{
                display: flex;
                align-items: center;
                
            }
        }
    }
}
</style>