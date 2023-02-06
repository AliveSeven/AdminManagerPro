<template>
    <div class="fileView">
        <div class="form">
            <div>
                <span>文件名称</span>
                <el-input v-model="Pages.InputFileName" class="w-50 m-2" placeholder="请输入文件名称" :suffix-icon="Search" />
            </div>
            <el-button type="primary" :icon="Search" class="form-btn" @click="getPageInfoByInput">搜索</el-button>

            <el-button class="form-btn" plain @click="reGetPageInfo">重置</el-button>
        </div>

        <div class="form-sec">
            <el-button class="form-btn" type="primary" :icon="Plus" @click="dialogUploadFiles = true">新增</el-button>
            <el-button class="form-btn" type="danger" :icon="Remove">批量删除</el-button>
        </div>

        <div class="form-table">
            <el-table :data="tableData" :border="true" @current-change="TableCurrentChange" ref="singleTableRef" :header-cell-style="{ background : '#F5F7FA'}" style="width: 98%;margin-left: 10px;height: 67vh;">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="id" label="文件ID" width="150"/>
                <el-table-column prop="name" label="文件名称"  width="150"/>
                <el-table-column prop="type" label="文件类型" width="150" />
                <el-table-column prop="size" label="文件大小(KB)" width="150" />
                <el-table-column prop="url" label="文件链接" />
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="dialogDeleteFiles = true">删除</el-button>
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

        <!-- 文件上传对话框 -->
        <div class="dialog-upload">
            <el-dialog v-model="dialogUploadFiles" title="上传要导入的图片文件">
              <el-upload
                class="upload-demo"
                ref="uploadFiles"
                :http-request="uploadFileRequest"
                action
                method="post"
                :on-exceed="handleExceed"
                drag
                :auto-upload="false"
                :limit="1">
                  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                  <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                  </div>
                  <template #tip>
                    <div class="upload-submit">
                      <div class="submit-wrap">
                        <el-button class="ml-3" type="success" @click="submitUpload">
                          确认上传到服务器
                        </el-button>
                        <div class="el-upload__tip">
                          上传表格文件，限制上传一个
                        </div>
                      </div>
                    </div>
                  </template>
              </el-upload>
            </el-dialog>
        </div>

        <!-- 删除文件的对话框 -->
        <div class="dialog-delete">
            <el-dialog
              v-model="dialogDeleteFiles"
              :model="currentRow"
              title="删除文件信息"
              width="30%">
              <span>删除当前文件</span>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogDeleteFiles = false">Cancel</el-button>
                  <el-button type="primary" @click="deleteFileById(currentRow.id)"
                    >Confirm</el-button>
                </span>
              </template>
            </el-dialog>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref , onMounted } from 'vue';
import { ElMessage, ElTable } from 'element-plus';
import { Search, Plus, Remove, } from '@element-plus/icons-vue';
import { getFilePage , uploadFile , deleteFile } from '@/utils/api';
import type { UploadProps } from 'element-plus'

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

// 上传对话框
const dialogUploadFiles = ref(false)

// 删除对话框
const dialogDeleteFiles = ref(false)

// 上传链接前缀
const uploadUrl = 'http://localhost:8000'

// 上传的文件
const uploadFiles = ref()

// 页码和每页User数量form:
var Pages = reactive({
  pageNum : 1,
  pageSize : 10,
  InputFileName : '',
})

// 获取文件分页信息
function getFilePageInfo(pageNum : number , pageSize : number , fileName? : string){
    getFilePage(pageNum , pageSize , fileName).then((res) =>{
        total.value = res.data.total
        tableData.value = res.data.records
    })
}

// 通过输入的信息获取用户信息，搜索
function getPageInfoByInput(){
    getFilePageInfo(Pages.pageNum , Pages.pageSize, Pages.InputFileName)
}

// 重置
function reGetPageInfo(){
  // 页数重新定位到第一页
  Pages.pageNum = 1,
  Pages.pageSize = 10,
  Pages.InputFileName = ''
  getPageInfoByInput()
}

// 传入的文件id
const currentRow = ref({
  id : 100
})
// 表格的当行发生变化触发的事件
function TableCurrentChange(val : any){
  // 这样给reactive赋值可以保证页面会重新渲染
  currentRow.value = val
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

// 上传文件的函数
async function uploadFileRequest(item : any){
  let FormDatas = new FormData()
  // 上传文件的需要formdata类型;所以要转
  FormDatas.append('file',item.file);
  await uploadFile(FormDatas).then((res) =>{
    if(res.code == '200'){
      handleUploadSuccess()
    }else if(res.code == '701' || res.code == '702'){
      handleUploadError(res.msg)
    }else {
      handleUploadError()
    }
  })
}

// 当超出限制时，执行的钩子函数
const handleExceed: UploadProps['onExceed'] = (files) => {
  ElMessage({
    message: '只能上传一个文件',
    type: 'error',
  })
}

// 上传成功函数
function handleUploadSuccess(){
  ElMessage({
    message: '上传成功',
    type: 'success',
  })
  dialogUploadFiles.value = false
  // 清空已上传的文件列表
  uploadFiles.value!.clearFiles()
  // 重新获取表单数据
  // 获取文件分页信息
  getFilePageInfo(Pages.pageNum , Pages.pageSize)
}

// 上传失败函数
function handleUploadError(msg? : string){
  if(msg){
    ElMessage({
      message: msg,
      type: 'error',
    })
  } else {
    ElMessage({
      message: '导入失败，请重试',
      type: 'error',
    })
  }
}

// 手动上传函数
const submitUpload = () => {
  uploadFiles.value!.submit()
}

// 删除文件
function deleteFileById(id : number){
  deleteFile(id).then((res) =>{
    if(res.code === '200'){
        ElMessage({
        message: '删除用户信息成功',
            type: 'success',
        })
        reGetPageInfo()
      }
  }).catch((err) =>{
    console.log("删除文件失败：",err)
    ElMessage({
        message: '删除文件失败',
        type: 'error',
    })
  })
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

.upload-submit{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  .submit-wrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

</style>