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
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
              <el-breadcrumb-item
                ><a href="/">promotion management</a></el-breadcrumb-item
              >
              <el-breadcrumb-item>promotion list</el-breadcrumb-item>
              <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>
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
                        <el-dropdown-item :icon="CircleCloseFilled">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { useState } from '../stores/state'
import { User, CircleCloseFilled } from '@element-plus/icons-vue'
import router from '@/router';

// import { getUserById } from '@/utils/api'
// import { ElMessage } from 'element-plus'
const state = useState();

// 获取当前用户数据
state.getCurrentUserInfo()
// state.getCurrentMenuInfo()
// const currentUserId : number = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).id : null
// function getAvatarInfo(){
//     if( currentUserId != null){
//         // 根据id获取当前用户的名字
//         getUserById(currentUserId).then((res) =>{
//             if(res.code === '200'){
//                 currentUserName.value = res.data.nickname
//             }
//         }).catch(err =>{
//             console.log(err)
//         })
//     }else{
//         ElMessage({
//           message: '无法获取当前用户的昵称',
//           type: 'error',
//         })
//     }
// }



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