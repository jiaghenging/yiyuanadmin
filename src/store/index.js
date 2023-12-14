// import { defineStore } from 'pinia'

// export const userStore = defineStore('user', {
//     state: () => {
//         return {
//             Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
//         }
//     },
//     getters: {},
//     actions: {
//         changeLogin(user) {
//             this.Authorization = user.Authorization;
//             localStorage.setItem('Authorization', user.Authorization);
//         }
//     }
// })
// import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

// 全局注册 store
export function setupStore(app) {
  app.use(store);
}

export { store };
