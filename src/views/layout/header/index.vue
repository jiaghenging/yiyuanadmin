<template>
  <div style="text-align: right; font-size: 12px">
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
  </div>
</template>

<script setup>
import { Setting } from "@element-plus/icons-vue";
const handleCommand = function (command) {
  if (command == "2") {
    // that.loginout();
  }
};
</script>


<style lang="scss" scoped>
@import "@/assets/css/header.scss";
</style>