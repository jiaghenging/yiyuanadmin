<template>
  <div class="container addnewsBox">
    <el-tabs :tab-position="tabPosition" v-model="newsTab" style="height: 100%">
      <el-tab-pane label="基本信息" name="newstab1">
        <div class="news_msg">
          <p class="news_item_title">新闻基本信息</p>
          <el-form :model="newsform" :rules="rules" ref="ruleForm" label-width="100px" class="news_msg_form">
            <el-form-item label="新闻标题：" prop="title">
              <el-input v-model="newsform.title"></el-input>
            </el-form-item>

            <el-form-item label="发布日期：">
              <el-radio-group v-model="timeType">
                <el-radio label="time1">实时发布日期</el-radio>
                <el-radio label="time2">自定义发布日期</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" v-if="timeType == 'time2'">
              <el-col :span="11">
                <el-form-item prop="fbtime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="newsform.fbtime" value-format="timestamp"
                    style="width: 100%"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="新闻主图：" prop="mainImg">
              <el-upload class="avatar-uploader" action="#" :auto-upload="true" :before-upload="checkFiles"
                :http-request="beforeUpload" :show-file-list="false">
                <img v-if="mainImg" :src="mainImg" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新闻内容" name="newstab2">
        <div class="news_msg">
          <p class="news_item_title">新闻内容</p>
          <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden" v-model="html" :defaultConfig="editorConfig" :mode="mode"
              @onCreated="onCreated" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="btn_addnews">
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </div>
</template>
<script setup>

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
const newsTab = ref('newstab1');
const tabPosition = ref("left");
const timeType = ref("time1")
const imageUrl = ref("")
const mainImg = ref("")
const imgList = ref([])
const newsform = reactive({
  title: "",
  fbtime: "",
})
const rules = ref({
  title: [
    { required: true, message: "请输入新闻标题", trigger: "blur" },
    { min: 1, max: 50, message: "长度在 1到 50 个字符", trigger: "blur" },
  ],
  fbtime: [
    {
      type: "number",
      required: true,
      message: "请选择日期",
      trigger: "change",
    },
  ],
  mainImg: [
    { required: true, message: "请上传一张主图", trigger: "change" },
  ],
})
const editor = ref(null)
const html = ref("")
const toolbarConfig = reactive({
  excludeKeys: [
    'fullScreen',
    'group-video',
    'insertImage'
  ]
})
const editorConfig = reactive({
  placeholder: "请输入内容...",
  MENU_CONF: {
    //配置上传图片
    uploadImage: {
      customUpload: imgUpload(),
    },
  },
})
const mode = ref("default")  // or 'simple'
function submitForm(formName) {
  const that = this;
  this.$refs[formName].validate((valid) => {
    console.log(valid);
    if (valid) {
      if (that.html == '') {
        that.$message({
          message: '新闻内容不能为空奥~',
          type: 'info'
        })
        that.newsTab = 'newstab2';
      } else {
        console.log('开始打包数据');
        //todo 数据已经传输  需要在后端进行接收然后写入数据库 
        // 开始打包数据
        let time = '';
        if (that.timeType == 'time1') {
          let date = new Date();
          time = date.getTime();
        } else {
          time = that.newsform.fbtime;
        }
        let datamsg = {
          title: that.newsform.title.toString(),
          subtime: time,
          mainImg: that.mainImg,
          htmlMsg: that.html.replace(/\"/g, "'"),
          imgList: that.imgList.toString()
        };
        console.log(datamsg);
        that.axios({
          url: '/api/addnews',
          method: 'POST',
          data: datamsg
        }).then((res) => {
          console.log(res);
          if (res.data.state == 0) {
            that.$message({
              message: "新闻发布成功!",
              type: 'success'
            })
            setTimeout(() => {
              that.resetForm('ruleForm');
              that.$router.push({ path: 'newslist' })
            }, 1000);
          } else {
            that.$message({
              message: res.data.message,
              type: 'error'
            });

          }
        }).catch((err) => {
          console.log(err);
          that.$message({
            message: '新闻发布失败，请联系管理员',
            type: 'error'
          });
        })
      }
    } else {
      console.log(that.mainImg);
      console.log("error submit!!");
      return false;
    }
  });
}

function imgUpload(file, insertFn) {//上传富文本中的图片
  const that = this;
  var reader = new FileReader();
  console.log(file);
  reader.onloadend = function () {
    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
    var dataURL = reader.result;
    that
      .axios({
        url: "/api/uploadimg",
        method: "POST",
        data: {
          file: dataURL,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.state == 0) {

          insertFn(res.data.imgUrl);
          // 记录文件名以便删除新闻时删除相关图片
          that.imgList.push(res.data.imgName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  reader.readAsDataURL(file);
}
function checkHtml() {
  const that = this;
  console.log(that.html);
}
function onCreated(editor) {
  this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
}
function beforeUpload(files) {//上传主图
  const that = this;
  let file = files.file;
  var reader = new FileReader();
  console.log(file);
  reader.onloadend = function () {
    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
    var dataURL = reader.result;
    that
      .axios({
        url: "/api/uploadimg",
        method: "POST",
        data: {
          file: dataURL,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.state == 0) {
          that.mainImg = '';
          that.mainImg = res.data.imgUrl;
          that.$refs.ruleForm.clearValidate('mainImg');
          that.rules.mainImg[0].required = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  reader.readAsDataURL(file);
}
function checkFiles(file) {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJPG) {
    this.$message.error("上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    this.$message.error("上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
}
function resetForm(formName) {
  this.$refs[formName].resetFields();
}
onMounted(()=>{
  const that=this;
    that.$nextTick(()=>{
      that.checkUserState().then((res) => {
        if (res.data.state != "0") {
          that.$router.push("/login");
        }
      });
    })
})
onBeforeUnmount(()=>{
  const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
})
</script>
<style lang="scss">
@import "@/assets/css/addnews.scss";
</style>
