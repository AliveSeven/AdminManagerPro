<template>
    <div class="fileView">
        <div class="form">
            <div class="phone">
                <span>文件名称</span>
                <el-input v-model="Pages.InputFileName" class="w-50 m-2" placeholder="请输入文件名称" :suffix-icon="Search" />
            </div>
            <el-button type="primary" :icon="Search" class="form-btn" @click="">搜索</el-button>

            <el-button class="form-btn" plain @click="">重置</el-button>
        </div>

        <div class="form-sec">
            <el-button class="form-btn" type="primary" :icon="Plus" @click="">新增</el-button>
            <el-button class="form-btn" type="danger" :icon="Remove">批量删除</el-button>
        </div>

        <div class="form-table">
            <el-table :data="tableData" :border="true" @current-change="" ref="singleTableRef" :header-cell-style="{ background : '#F5F7FA'}" style="width: 98%;margin-left: 10px;height: 67vh;">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="id" label="文件ID" width="150"/>
                <el-table-column prop="name" label="文件名称"  width="150"/>
                <el-table-column prop="type" label="文件类型" width="150" />
                <el-table-column prop="size" label="文件大小(KB)" width="150" />
                <el-table-column prop="url" label="文件链接" />
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button size="small" @click="" type="warning" plain>编辑</el-button>
                        <el-button size="small" type="danger" @click="">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页器 -->
        <div class="pager">
          <el-pagination 
          small background layout="total, sizes, prev, pager, next, jumper" 
          :page-size="Pages.pageSize"
          :page-sizes="[5, 10, 20, 30]"
          :current-page="Pages.pageNum"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"  
          :total="total" 
          class="mt-4" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref , onMounted } from 'vue';
import { ElMessage, ElTable } from 'element-plus';
import { Search, Plus, Remove, } from '@element-plus/icons-vue';
import { getFilePage } from '@/utils/api';

const tableData: any = ref([{
        id: 100,
        name: '121',
        type: 'jpg',
        size: 100,
        url : 'http://localhost:8000/file/67b90318759d4bd8872b4cfed814f151.jpg'
    }
])
// 分页数据
// 用户总数，暂定为100个
var total = ref(100)

// 页码和每页User数量form:
var Pages = reactive({
  pageNum : 1,
  pageSize : 10,
  InputFileName : '',
})

function getFilePageInfo(pageNum : number , pageSize : number , fileName? : string){
    // 获取文件分页信息
    getFilePage(pageNum , pageSize , fileName).then((res) =>{
        total.value = res.data.total
        tableData.value = res.data.records
    })
}

// 通过输入的信息获取用户信息，搜索
function getPageInfoByInput(){
    getFilePageInfo(Pages.pageNum , Pages.pageSize, Pages.InputFileName)
}


// 页数更改事件
function handleCurrentChange(val : number){
    Pages.pageNum = val
    getPageInfoByInput()
}

// 页Size改变
function handleSizeChange(val : number){
    Pages.pageSize = val
    getPageInfoByInput()
}

// 页面初始化完毕，组件DOM实际渲染完执行函数
onMounted(() => {
    // 获取文件分页信息
    getFilePageInfo(Pages.pageNum , Pages.pageSize)
})

</script>

<style lang="less" scoped>
.form {
  display: flex;
  align-items: center;
  height: 50px;

  >div {
      display: flex;
      align-items: center;
  
      span {
        text-align: center;
        margin: 0 10px;
        width: 30%;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /* 显示的行数，这里限制为两行 */
        -webkit-box-orient: vertical;
        /* 设置或检索伸缩盒对象的子元素的排列方式，这里为向下排 */
        overflow: hidden;
        /* 超出盒子部分隐藏 */
        text-overflow: ellipsis;
        /* 文字超出两行的部分为省略号 */
      }
  }
}
.fileView {
    background-color: white;
    padding-bottom: 5px;
}

.form-btn {
    margin-left: 10px;
}

.form-table {
    margin-top: 10px;
}

.pager{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

</style>