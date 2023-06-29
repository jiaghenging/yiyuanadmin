import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
    state: () => {
        return {
            Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
        }
    },
    getters: {},
    actions: {
        changeLogin(user) {
            this.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        }
    }
})