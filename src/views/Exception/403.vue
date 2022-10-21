<template>
  <div class="exceptionView">
    <div class="text-center">
      <img src="@/assets/403.svg" alt="">
    </div>
    <div class="text-center">
      <h3>抱歉，你无权访问该页面</h3>
      <div class="btn">
        <el-button type="primary" @click="router.push({path : '/home'})">回到首页</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.exceptionView{
    width: 100%;
    border-radius: 4px;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .text-center{
      text-align: center;

      img{
        width: 550px;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
        display: block;
      }

      h3{
        color: #666;
        padding: 20px 0;
        font-size: 1rem;
        line-height: 1.5rem;
        margin: 0;
      }
    }
    
}
</style>

<script lang="ts" setup>
import router from '@/router';
</script>
