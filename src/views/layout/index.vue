<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-aside :width="appStore.isCollapse?60+'px':200+'px'" style="background-color: rgb(84, 92, 100); transition: all ease 0.3s;">
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
import { useAppStore } from "@/store/modules/app";
import Header from "./header/index.vue";
import Aside from "./aside/index.vue";
const appStore = useAppStore();
console.log(appStore.isCollapse);
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";
</style>