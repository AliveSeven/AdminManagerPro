<template>
    <div class="favorites">
        <div class="favorites-nav">
            <el-menu
                    class="el-menu-vertical-demo"
                    text-color="#333639"
                    style="height : 100%"
                    :collapse="state.isCollapse"
                    >
                        <el-menu-item index="new" class="title" @click="showMain = false">
                            <el-icon><CirclePlus /></el-icon>
                            <span class="title">新建收藏夹</span>
                        </el-menu-item>

                        <el-sub-menu index="my">
                            <template #title>
                            <el-icon><Setting /></el-icon>
                            <span class="title">我创建的</span>
                            </template>
                            <el-menu-item v-for="(item, index) in myFavorites" :key="index" :index="`my${index+1}`" @click="SelectMyMenuItem(item)">
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

        <div class="favorites-main" v-show="showMain">
            <component :is='component'></component>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted , computed , defineAsyncComponent } from 'vue'
import { useState } from '@/stores/state';
import { getFavoritesByUserId } from '@/utils/api'

const state = useState();

// 当前正在激活的菜单item
const currentMyMenuItem = ref(
    {
        name : '',
        cover : '',
        description : '',
        type : ''
    }
)

// 展示main
const showMain = ref(false);
// 点击我创建的菜单触发事件
const SelectMyMenuItem = (item : any) =>{
    currentMyMenuItem.value = item
    console.log(currentMyMenuItem)
    showMain.value = true
}

// 根据菜单类型，动态引入不同的组件，将其返回
const component = computed(() =>{
    if(currentMyMenuItem.value.type == '' || currentMyMenuItem.value.type == 'video'){
        return defineAsyncComponent(() => import('./FavoritesItems/VideoItem.vue'))
    }
})


const myFavorites = ref([
    {
        name : '视频收藏夹'
    }
])


onMounted(() =>{
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).id : null
    // 获取收藏夹
    if(userId != null){
        getFavoritesByUserId(userId).then((res) =>{
            if(res.code === '200'){
                myFavorites.value = res.data
                console.log(res)
            }
        })
    }
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
    display: flex;

    .favorites-nav{
        height: 100%;
        border-right: 1px solid #e4e7ed;
        
    }

    .favorites-main{
        width: 100%;
    }
}
</style>