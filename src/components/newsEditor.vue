<template>
    <div>
        <el-form :model="editform" :rules="rules" ref="ruleForm" label-width="100px" class="news_msg_form">
            <el-form-item label="新闻标题：" prop="title">
                <el-input v-model="editform.title"></el-input>
            </el-form-item>
            <el-form-item label="发布日期：">
                <el-col :span="11">
                    <el-form-item prop="date">
                        <el-date-picker type="date" placeholder="选择日期" v-model="editform.date"
                            style="width: 100%"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="新闻主图：" prop="mainImg">
                <el-upload class="avatar-uploader" action="#" :auto-upload="true" :before-upload="checkFiles"
                    :http-request="beforeUpload" :show-file-list="false">
                    <img v-if="editform.mainimg != ''" :src="editform.mainimg" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="新闻内容：">
                <div style="border: 1px solid #ccc">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                        :mode="mode" />
                    <Editor style="height: 500px; overflow-y: hidden" v-model="editform.html" :defaultConfig="editorConfig"
                        :mode="mode" @onCreated="onCreated" />
                </div>
            </el-form-item>
        </el-form>

    </div>
</template>

<script setup>
import { reactive, ref, toRefs, watch } from 'vue';
import { uploadImg } from '@/api/'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
import dayjs from 'dayjs'
const props = defineProps({
    rowMsg: {
        type: Object,
        default: "",
    },
});
const emits = defineEmits(["changeEditForm"]);
const ifShowEdit = ref(false)
const formLabelWidth = ref('120px')
const mainImg = ref("")
const editform = reactive({
    id: '',
    title: "",
    date: "",
    mainimg: "",
    html: "",
    imglist: []
})
const getLoading = ref(null);
const tableData = ref([
    {
        id: "",
        title: "",
        date: "",
        imglist: ''
    },
])
watch(
    () => props.rowMsg,
    (newValue, oldValue) => {
        setEditMsg();
    },
    { deep: true, immediate: true }

);
watch(
    () => editform,
    (newValue, oldValue) => {
        emits('changeEditForm', newValue)
    },
    { deep: true }

);
const rules = ref({
    title: [
        { required: true, message: "请输入新闻标题", trigger: "blur" },
        { min: 1, max: 40, message: "长度在 1到 40 个字符", trigger: "blur" },
    ],
    date: [
        {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur",
        },
    ],
    mainimg: [
        { required: true, message: "请上传一张主图", trigger: "change" },
    ],
})
defineExpose({
    validateForm,
});
const ruleForm = ref(null);
async function validateForm() {
    let res = false;
    await proxy.$refs["ruleForm"].validate((valid) => {
        if (valid) {
            res = true
        } else {
            res = false
        }
    })
    return res
}
function setEditMsg() {
    editform.id = props.rowMsg.id;
    editform.title = props.rowMsg.title;
    editform.date = props.rowMsg.date;
    editform.mainimg = props.rowMsg.mainimg;
    editform.html = props.rowMsg.html;
    editform.imglist = props.rowMsg.imglist;
}

const timeType = ref('time1')
const html = ref('')
const editorRef = ref(null)
const mode = ref('default')
const toolbarConfig = ref({})
const editorConfig = ref({
    placeholder: "请输入内容...",
    MENU_CONF: {
        //配置上传图片
        uploadImage: {
            customUpload: imgUpload,
        },
    },
})
function onCreated(editor) {
    editorRef.value = editor; // 一定要用 Object.seal() ，否则会报错
}
function checkFiles(file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG) {
        ElMessage.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
        ElMessage.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
}
function beforeUpload(files) {
    //上传主图
    let file = files.file;
    const reader = new FileReader();
    console.log(file);
    reader.onloadend = function () {
        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
        var dataURL = reader.result;
        uploadImg({
            file: dataURL
        }).then((res) => {
            console.log(res);
            if (res.data.state == 0) {
                editform.mainimg = "";
                editform.mainimg = res.data.imgUrl;
                // that.$refs.ruleForm.clearValidate("mainImg");
                // that.rules.mainImg[0].required = false;
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    reader.readAsDataURL(file);
}
function imgUpload(file, insertFn) {
    //上传富文本中的图片
    const reader = new FileReader();
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


</script>

<style lang="scss" scoped>
.news_msg_form {
    max-width: 800px;
}
</style>