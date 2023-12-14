import { defineStore } from "pinia";
import { ref } from "vue";
// import { useStorage } from "@vueuse/core";//使用localstorage
// setup
export const useAppStore = defineStore("app", () => {
    // state
    const isCollapse = ref(false)
    // actions
      function toggleSidebar() {
        isCollapse.value=!isCollapse.value
      }

    return {
        isCollapse,
        toggleSidebar
    };
});
