<template>
  <div class="headerBox">
    <div class="toggle-icon" @click="changeToggle()">
      <el-icon :size="20">
        <component :is="toggleIcon" />
      </el-icon>
    </div>
    <div class="user-box">
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
  </div>
</template>

<script setup>
import { markRaw } from "vue";
import { onMounted, ref } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { Setting } from "@element-plus/icons-vue";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const expandIcon = markRaw(Expand);
const foldIcon = markRaw(Fold);

const handleCommand = function (command) {
  if (command == "2") {
    // that.loginout();
  }
};
let toggleState = ref(true); //true展开false收齐
let toggleIcon = ref(foldIcon);
const changeToggle = function () {
  toggleState.value = !toggleState.value;
  toggleIcon.value = toggleState.value == true ? foldIcon : expandIcon;
  appStore.toggleSidebar();
};
// mounted
onMounted(() => {
});
</script>


<style lang="scss" scoped>
@import "@/assets/css/header.scss";
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>