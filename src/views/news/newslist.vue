<template>
  <div class="container newslistBox">
    <el-table :data="tableData" v-loading="tableLoading" stripe style="width: 100%" :default-sort="{ prop: 'date', order: 'ascending' }">
      <el-table-column prop="id" label="编号" width="180" sortable align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="680" align="center">
      </el-table-column>
      <el-table-column prop="date" label="发布时间" width="380" sortable align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="editNews(scope.row)" type="primary" size="small">修改</el-button>
          <el-button type="danger" size="small" @click="confirmDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑新闻" v-model="ifShowEdit">
      <newsEditor ref="editorRef" :rowMsg="rowMsg" @changeEditForm="changeEditForm" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="ifShowEdit = false">取 消</el-button>
        <el-button type="primary" :loading="updating" @click="confirmEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getNewsList, updateNews } from '@/api';
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue';
import newsEditor from '@/components/newsEditor.vue'
const updating = ref(false)
const editorRef = ref(null);
const tableLoading=ref(true)
const tableData = ref([
  {
    id: "",
    title: "",
    date: "",
    imglist: ''
  },
])
const rowMsg = ref({
  title: "",
  date: "",
  mainimg: "",
  html: "",
  imglist: []
});
const ifShowEdit = ref(false);
// 点击修改
function editNews(row) {
  ifShowEdit.value = true;
  rowMsg.value = row
}
// 监听组件表单变化
function changeEditForm(val) {
  rowMsg.value = val;
}
// 点击确定
function confirmEdit() {
  editorRef.value.validateForm().then(res => {
    if (res) {
      updating.value=true;
      ElMessageBox.confirm('是否保存修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        submitForm();
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        })
        updating.value=false;
      })
    }
  })

}
// 提交函数
function submitForm(formName) {
  const that = this;
  console.log("开始打包数据");
  //todo 数据已经传输  需要在后端进行接收然后写入数据库
  // 开始打包数据
  console.log(rowMsg.value);
  let datamsg = {
    id: rowMsg.value.id,
    title: rowMsg.value.title.toString(),
    subtime: rowMsg.value.date,
    mainimg: rowMsg.value.mainimg,
    htmlMsg: rowMsg.value.html.replace(/\"/g, "'"),
    imgList: rowMsg.value.imglist,
  };
  console.log(datamsg);
  updateNews(datamsg).then((res) => {
    console.log(res);
    if (res.data.state == 0) {
      ElMessage({
        type: "success",
        message: '新闻修改成功!',
      })
      ifShowEdit.value=false;
      updating.value=false;
      setTimeout(() => {
        tableLoading.value=true;
        getNews();
      }, 500);;
    } else {
      ElMessage({
        type: "error",
        message: res.data.message,
      })
      updating.value=false;
    }
  }).catch((err) => {
    console.log(err);
    updating.value=false;
  });
}
// 获取新闻列表
function getNews() {
  getNewsList().then(res => {
    console.log(res);
    if (res.status == 200) {
      tableData.value = res.data.data;
      setTimeout(() => {
        tableLoading.value=false;
      }, 500);
    }
  }).catch(err => {
    console.log(err);
  })
}
onMounted(() => {
  getNews()
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/newsList.scss'
</style>