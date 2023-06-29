<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-aside width="200px" style="background-color: rgb(84, 92, 100)">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <div class="left_header">
            <h1>一元管理系统</h1>
          </div>
          <el-sub-menu v-for="(item_f, index_f) in routeMsg" :title="item_f.title" :key="index_f"
            :index="index_f + '' + 1">
            <template #title>
              <el-icon :size="20">
                <Location />
              </el-icon>
              <span>{{ item_f.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(item_c, index_c) in item_f.children" :key="index_f + '-' + index_c"
                :index="index_f + '-' + index_c" @click="topath(item_f.path, item_c.path)">{{ item_c.meta.title
                }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          
          <el-dropdown :hide-on-click="false" @command="handleCommand">
            <el-icon><Setting /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="1">查看</el-dropdown-item>
              <el-dropdown-item command="2">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span class="userName">admin</span>
        </el-header>
          <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>

import routes from "@/router/routes.js";

import {useRouter} from 'vue-router'
const router=useRouter()
import { onMounted, ref } from 'vue';
import { Location, Setting, Menu, Document } from '@element-plus/icons-vue'
const routeMsg = ref([]);
const handleOpen = function () {

}
const handleClose = function () {

}
const handleCommand = function (command) {
  if (command == "2") {
    // that.loginout();
  }
}
//todo 搞路由
function topath(fp, sp) {
  let path_ls = fp + "/" + sp;
  router.push({ path: path_ls });
}
function setRoutes() {
  let routearrls = routes;
  let routearrls2 = [];
  routearrls.forEach((item, index) => {
    if (item.show) {
      routearrls2.push(item);
    }
  });
  routeMsg.value = routearrls2;
  console.log(routeMsg.value);
}
onMounted(() => {
  console.log(routes);
  setRoutes()

})
</script>

<style lang="scss" scoped>
@import '@/assets/css/index.scss'
</style>