<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="left_header">
      <h1>GKD后台管理系统</h1>
    </div>
    <template v-for="(item_f, index_f) in routeMsg" :key="index_f">
      <el-sub-menu
        v-if="item_f.children"
        :title="item_f.meta.title"
        :index="index_f + '' + 1"
      >
        <template #title>
          <el-icon :size="20">
            <component :is="item_f.meta.icon" />
          </el-icon>
          <span>{{ item_f.meta.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item_c, index_c) in item_f.children"
            :key="index_f + '-' + index_c"
            :index="index_f + '-' + index_c"
            @click="topath1(item_f.path, item_c.path)"
            >{{ item_c.meta.title }}</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="index_f + '' + 1"
        @click="topath2(item_f.path)"
      >
        <el-icon :size="20">
          <component :is="item_f.meta.icon" />
        </el-icon>
        <span>{{ item_f.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import routes from "@/router/routes.js";
const router = useRouter();
const routeMsg = ref([]);
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
const handleOpen = function () {};
const handleClose = function () {};

function topath1(fp, sp) {
  let path_ls = fp + "/" + sp;
  router.push({ path: path_ls });
}
function topath2(fp) {
  let path_ls = fp;
  router.push({ path: path_ls });
}
onMounted(() => {
  console.log(routes);
  setRoutes();
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/index.scss";
</style>