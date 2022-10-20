<template>
  <div id="app">
    <RouterView v-slot="{ Component }">
      <transition name="el-fade-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<style scoped>

</style>