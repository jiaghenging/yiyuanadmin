<template>
  <div class="container newslistBox">
    <el-table :data="tableData" stripe style="width: 100%" :default-sort="{ prop: 'date', order: 'ascending' }">
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
      <newsEditor :rowMsg="rowMsg"/>
      <div slot="footer" class="dialog-footer">
            <el-button @click="ifShowEdit = false">取 消</el-button>
            <el-button type="primary" :loading="updating" @click="confirmEdit()">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getNewsList } from '@/api';
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue';
import newsEditor from '@/components/newsEditor.vue'
const updating = ref(false)
const tableData = ref([
  {
    id: "",
    title: "",
    date: "",
    imglist: ''
  },
])
const rowMsg=ref('');
const ifShowEdit=ref(false);
function editNews(row){
  ifShowEdit.value=true;
  rowMsg.value=row
}

// 获取新闻列表
function getNews() {
  getNewsList().then(res => {
    console.log(res);
    if (res.status == 200) {
      tableData.value = res.data.data
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