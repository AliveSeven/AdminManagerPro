<template>
    <div class="favorites">
        <div class="favorites-nav">
            <div class="my-wrap">
                <el-menu
                    class="el-menu-vertical-demo"
                    text-color="#333639"
                    style="height : 100%"
                    :collapse="state.isCollapse"
                    >
                        <el-menu-item index="new" class="title">
                            <el-icon><CirclePlus /></el-icon>
                            <span class="title">新建收藏夹</span>
                        </el-menu-item>
                        <el-sub-menu index="my">
                            <template #title>
                            <el-icon><Setting /></el-icon>
                            <span class="title">我创建的</span>
                            </template>
                            <el-menu-item v-for="(item, index) in myFavorites" :key="index" :index="`my${index}`" >
                                <el-icon><VideoPlay /></el-icon>
                                <span> {{ item.name }} </span>
                            </el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="mysub">
                            <template #title>
                            <el-icon><Setting /></el-icon>
                            <span class="title">我的收藏和订阅</span>
                            </template>
                            <el-menu-item v-for="(item, index) in myFavorites" :key="index" :index="`mysub${index}`" >
                                <el-icon><VideoPlay /></el-icon>
                                <span> {{ item.name }} </span>
                            </el-menu-item>
                        </el-sub-menu>
                </el-menu>
            </div>
        </div>
        <div class="favorites-main">
            <div class="main-top">
                <div class="">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useState } from '@/stores/state';

const state = useState();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


const myFavorites = ref([
    {
        name : '视频收藏夹'
    },
    {
        name : '动态收藏夹'
    },
    {
        name : '学习收藏夹'
    },
    {
        name : '学习收藏夹'
    },
])

function changeItemActive(){}

onMounted(() =>{

})

</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.favorites{
    background-color: #fff;
    height: 80vh;
    width: 100%;

    .favorites-nav{
        height: 100%;
        border-right: 1px solid #e4e7ed;
        
        .my-wrap{
            height: 100%;

            // .title{
            //     padding: 20px 20px 0 30px;
            //     display: flex;
            //     align-items: center;
            //     justify-content: space-between;
            //     cursor: pointer;
            // }

            // .my-favorites{
            //     padding: 14px;

            //     .item{
            //         display: flex;
            //         align-items: center;
            //         padding: 14px;
            //         user-select: none;
            //         cursor: pointer;
            //         color: black;

            //         i{
            //             margin-right: 5px;
            //         }

            //         &:hover{
            //             background-color: rgb(244, 245, 247);
            //         }

            //     }
            // }
        }
    }
}
</style>