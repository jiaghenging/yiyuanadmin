<template>
  <div class="container">
    <div class="bgImg">
      <img src="@/assets/img/login/bg.jpg" class="blockImg" alt="" />
    </div>
    <div class="loginBox">
      <h2 class="login_title">欢迎登录</h2>
      <el-form ref="loginForm" class="loginForm" :model="form" label-width="80px">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.userpwd" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ifremeber">记住密码</el-checkbox>
          <!-- <el-checkbox-group v-model="form.ifrember">
            <el-checkbox label="记住密码" v-model="ifremeber" name="type"></el-checkbox>
          </el-checkbox-group> -->
          <a href="javascript:void(0)" @click="showForgetTip()" class="forgetTip">忘记密码?</a>
        </el-form-item>
        <el-button class="button_login" :loading="loading" type="primary" @click="toLogin()">L O G I N</el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'
import { Base64 } from "js-base64";
import { onMounted, reactive, ref, toRefs } from "vue";
import { login } from '@/api/index'
import { ElMessage } from 'element-plus'
import { userStore } from '@/store'
const userStoreM=userStore();
const router = useRouter()
// import { mapMutations } from "vuex";
const form = reactive({
  username: "",
  userpwd: ""
})
const ifremeber = ref(false)
const loading = ref(false)
function showForgetTip() {
  ElMessage({
    message: '请联系管理人员进行处理',
    type: 'error'
  })
}
// 点击登录
function toLogin() {
  if (form.username != "" && form.userpwd != "") {
    loading.value=true
    login({
      ...form
    }).then(res => {
      if (res.data.state == 0) {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        setTimeout(() => {
          loading.value = false;
          userStoreM.changeLogin({ Authorization: res.data.token });
          // 是否记住密码
          localStorage.setItem('userid', form.username);
          if (ifremeber.value) {
            localStorage.setItem('username', form.username);
            localStorage.setItem('userpwd', Base64.encode(form.userpwd));
          } else {
            localStorage.setItem('username', '');
            localStorage.setItem('userpwd', '');
          }
          router.push({ path: "/" });
        }, 1000);
      } else {
        loading.value = false;
        ElMessage({
          message: res.data.message,
          type: "error",
        });
      }
    })
  } else {
    ElMessage({
      message: '账号密码或不能为空!',
      type: "error",
    });
  }

}
onMounted(() => {
  nextTick(() => {
    let username = localStorage.getItem('username');
    // 检测是否记住了密码
    if (username != '' && username != null) {
      form.username = username;
      form.userpwd = Base64.decode(localStorage.getItem('userpwd'));
    } else {
      form.username = '';
      form.userpwd = '';
    }
  })
})
// ...mapMutations(["changeLogin"])
</script>
<style lang="scss" >
@import '@/assets/css/login.scss'
</style>
