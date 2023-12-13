<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Header from "./header/index.vue";
import Aside from "./aside/index.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";
</style>