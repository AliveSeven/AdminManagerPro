<template>
    <div class="video-wrap">
        <div class="main-top">
            <div class="cover">
                <el-image :src="props.menu.cover" lazy></el-image>
            </div>

            <div class="content-wrap">
                <div class="tag">菜单描述</div>
                <div class="title">{{ props.menu.name }}</div>
                <div class="info">
                    {{ props.menu.description }}
                </div>
            </div>
            <!-- <div class="bg-mask"></div> -->
        </div>

        <div class="main-content">
            <div class="">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

const props = defineProps({
    menu : {
        type : Object ,
        default : {
            id : 1 ,
            name : '1111',
            cover : 'https://dummyimage.com/400x400/797ff2/a3f279&text=Frank',
            description : '123213213'
        }
    }
})

onMounted(() =>{

})

</script>

<style lang="less" scoped>
.main-top{
    padding: 20px;
    height: 150px;
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    margin: 10px;
    border-bottom: 1px solid #e5e9ef;
    .cover{
        width: 150px;
        height: 150px;
        margin-right: 20px;
        z-index: 1;
    }
    .content-wrap{
        z-index: 1;
        .tag{
            color: #dfac67;
            border: 1px solid #dfac67;
            width: 100px;
            height: 30px;
            text-align: center;
            border-radius: 5px;
            font-size: 16px;
            line-height: 30px;
            cursor: pointer;
        }
        .title{
            // color: #fff;
            padding-top: 10px;
        }
        .info{
            color: #99a2aa;
            font-size: 14px;
            padding-top: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
        }
    }
    .bg-mask{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 0;
    }
}
</style>