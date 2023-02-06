<template>
    <div class="todoList">
        <div class="form">
            <div>
                <span class="todo-name">待办事项描述</span>
                <el-input v-model="Pages.description" class="w-50 m-2" placeholder="请输入事项描述" :suffix-icon="Search" />
            </div>
            <el-button type="primary" :icon="Search" class="form-btn" @click="getPageInfoByInput">搜索</el-button>

            <el-button class="form-btn" plain @click="reGetPageInfo">重置</el-button>
        </div>

        <div class="form-sec">
            <el-button class="form-btn" type="primary" :icon="Plus" @click="dialogAddVisible = true">新增</el-button>
            <el-button class="form-btn" type="danger" :icon="Remove">批量删除</el-button>
        </div>

        <div class="form-table">
            <el-table :data="tableData" @current-change="TableCurrentChange" :border="true" ref="singleTableRef" :header-cell-style="{ background : '#F5F7FA'}" style="width: 98%;margin-left: 10px;height: 67vh;">
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column prop="id" label="事项ID" width="120" />
                <el-table-column prop="description" label="事项描述" />
                <el-table-column prop="done" label="进度" width="120" >
                    <template #default="scope">
                        <el-button size="small" :type="scope.row.done ? 'success' : 'danger'">{{ getdone(scope.row.done) }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="priority" label="优先级" width="150" />
                <el-table-column prop="data" label="创建时间" width="200" />
                <el-table-column label="操作" width="250">
                    <template #default="scope">
                        <el-button size="small" @click="openEdit(scope.row)" type="warning" plain>编辑</el-button>
                        <el-button size="small" type="danger" @click="dialogDeleteVisible = true">删除</el-button>
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

        <!-- 新增对话框 -->
        <div class="dialog-add">
            <el-dialog v-model="dialogAddVisible" title="新增事项信息">
                <el-form :model="form" :rules="rules" ref="ruleFormRef">
                    <el-row :gutter="10">
                        <el-col :span="20" :offset="0">
                            <el-form-item label="事项描述" :label-width="formLabelWidth" prop="description">
                                <el-input v-model="form.description" autocomplete="off" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="20" :offset="0">
                            <el-form-item label="事项进度" :label-width="formLabelWidth" prop="done">
                                <el-select v-model="form.done" placeholder="选择事项的进度">
                                    <el-option label="已完成" value="true" />
                                    <el-option label="未完成" value="false" />
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="20" :offset="0">
                            <el-form-item label="事项优先级" :label-width="formLabelWidth" prop="priority">
                                <el-input v-model="form.priority" autocomplete="off" oninput="value=value.replace(/\D/g,'')" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="20" :offset="0">
                            <el-form-item label="创建时间" :label-width="formLabelWidth" prop="data">
                                <el-date-picker
                                    v-model="form.data"
                                    type="date"
                                    placeholder="选择一个时间"
                                    format="YYYY/MM/DD"
                                    value-format="YYYY-MM-DD"
                                />
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogAddVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleAdd(form, ruleFormRef)">Confirm</el-button>
                </span>
                </template>
            </el-dialog>
        </div>

        <!-- 这里是编辑的对话框 -->
        <div class="dialog-edit">
            <el-dialog v-model="dialogEditVisible" title="编辑用户信息">
                <el-form :model="currentRow" :rules="rules" ref="ruleFormRef">
                    <el-row :gutter="10">
                        <el-col :span="20" :offset="0">
                            <el-form-item label="事项描述" :label-width="formLabelWidth" prop="description">
                                <el-input v-model="currentRow.description" autocomplete="off" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="20" :offset="0">
                            <el-form-item label="事项进度" :label-width="formLabelWidth" prop="done">
                                <el-select v-model="currentRow.done" placeholder="选择事项的进度">
                                    <el-option label="已完成" value="true" />
                                    <el-option label="未完成" value="false" />
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="20" :offset="0">
                            <el-form-item label="事项优先级" :label-width="formLabelWidth" prop="priority">
                                <el-input v-model="currentRow.priority" autocomplete="off" oninput="value=value.replace(/\D/g,'')" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="20" :offset="0">
                            <el-form-item label="创建时间" :label-width="formLabelWidth" prop="data">
                                <el-date-picker
                                    v-model="currentRow.data"
                                    type="date"
                                    placeholder="选择一个时间"
                                    format="YYYY/MM/DD"
                                    value-format="YYYY-MM-DD"
                                />
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-form>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogEditVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleEdit(currentRow , ruleFormRef)"
                    >Confirm</el-button>
                </span>
                </template>
            </el-dialog>
        </div>
        <!-- 删除信息的对话框 -->
        <div class="dialog-delete">
            <el-dialog
            v-model="dialogDeleteVisible"
            :model="currentRow"
            ref="ruleFormRef"
            title="删除事项信息"
            width="30%">
            <span>删除当前事项</span>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogDeleteVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleDelete(currentRow.id)"
                    >Confirm</el-button>
                </span>
            </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted , computed } from 'vue'
import { ElTable , ElMessage , FormRules, FormInstance } from 'element-plus'
import { Search, Plus, Remove } from '@element-plus/icons-vue'
import { getTodoListPage , addOrUpdateTodoList , deleteTodoList } from '@/utils/api'

const tableData : any = ref([{
        id : 100,
        description: '',
        done: '',
        priority: '',
        data: '',
    }
])

// 对话框变量
const dialogAddVisible = ref(false)
// 编辑对话框可视化
const dialogEditVisible = ref(false)
// 删除对话框可视化
const dialogDeleteVisible = ref(false)
// 表单长度
const formLabelWidth = '140px'
// 表单规律限制
const ruleFormRef = ref<FormInstance>()
// 重新渲染，loading
const loading : any = ref(false)

// 新增对话框表格变量，这里面的变量名要和后端数据库表中的一致
const form : any = reactive({
  description : '',
  done : '',
  priority : '',
  data : '',
  userId : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).id : null
})

const getdone = (done : boolean) =>{
    if(done){
        return '已完成'
    } else {
        return '未完成'
    }
}

interface TodoList {
  id : number ,
  description :string ,
  done : string ,
  priority :string ,
  data : string,
  userId : number,
}

// 表单校验
const rules = reactive<FormRules>({
  description : [
    { required: true, message: "请输入事项描述", trigger: "blur" },
  ],
  done : [
    { required: true, message: "请选择事项进度", trigger: "blur" },
  ],
  priority : [
    { required: true, message: "请输入事项优先级", trigger: "blur" },
  ],
  data : [
    { required: true, message: "请输入事项创建时间", trigger: "blur" },
  ],
})

// 编辑的表格数据
const currentRow : any = reactive({
  id : 100 ,
  description : '',
  done : '',
  priority : '',
  data : '',
  userId : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).id : null
})

// 页码和每页User数量form:
var Pages = reactive({
  pageNum : 1,
  pageSize : 10,
  userId : 1111,
  description : '',
})

// 用户总数，暂定为100个
const total = ref(100)

// 获取待办事项分页信息
function getTodoListInfo(pageNum : number, pageSize : number, userId : number , description? : string) {
    getTodoListPage(pageNum , pageSize, userId , description).then(res =>{
        if(res.code === '200'){
            tableData.value = res.data.records
            total.value = res.data.total
            // console.log(res)
        }
    })
}

// 通过输入的信息获取用户信息，搜索
function getPageInfoByInput(){
    getTodoListInfo(Pages.pageNum , Pages.pageSize, Pages.userId , Pages.description)
}

// 点击编辑按钮
function openEdit(row : any){
    dialogEditVisible.value = true
    // Object.assign(currentRow , row)
}

// 新增事项数据
async function handleAdd(formData : any , formEl?: FormInstance | undefined){
    // 校验表单
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        addOrUpdateTodoList(formData).then((res) =>{
          if(res.code === '200'){
            ElMessage({
              message: '新增事项成功',
              type: 'success',
            })
            reGetPageInfo()
            // 清空form数据
            form.description = '',
            form.done = '',
            form.priority = '',
            form.data = '',
            dialogAddVisible.value = false
            // loading.value = !loading.value
          }
        }).catch((err) =>{
            console.log("新增失败：",err)
            ElMessage({
                message: '新增失败',
                type: 'error',
            })
        })
      } else {
        console.log('error submit!', fields)
      }
    })
}

// 更新事项数据，编辑
async function handleEdit(tableRowData : any , formEl?: FormInstance | undefined){
  // 校验表单
  if (!formEl) return;
  // 验证
  await formEl.validate((valid, fields) => {
    if (valid) {
        // 新增或更新用户
        addOrUpdateTodoList(tableRowData).then((res) =>{
          if(res.code === '200'){
            ElMessage({
              message: '更新事项信息成功',
              type: 'success',
            })
            dialogEditVisible.value = false
            // loading.value = !loading.value
            reGetPageInfo()
          }
        }).catch((err) =>{
            console.log("更新失败：",err)
            ElMessage({
              message: '更新失败',
              type: 'error',
          })
        })
      } else {
        console.log('error submit!', fields)
      }
  })
}

// 删除事项信息，删除
function handleDelete(id : number){
    deleteTodoList(id).then((res) =>{
        if(res.code === '200'){
          ElMessage({
            message: '删除事项信息成功',
                type: 'success',
            })
            dialogDeleteVisible.value = false
            // loading.value = !loading.value
            reGetPageInfo()
        }
    }).catch((err) =>{
        console.log("删除失败：",err)
        ElMessage({
            message: '删除失败',
            type: 'error',
        })
    })
}

// 单选，表格选择事件
function TableCurrentChange(val : TodoList){
  // 这样给reactive赋值可以保证页面会重新渲染
  Object.assign(currentRow,val)
}

// 重置
function reGetPageInfo() {
  // 页数重新定位到第一页
  Pages.pageNum = 1,
  Pages.pageSize = 10,
  Pages.description = ''
  getPageInfoByInput()
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

onMounted(() =>{
    // 获取当前用户的id
    const currentUserId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).id : null
    if(currentUserId === null){
        ElMessage({
            message: '用户未登录或登录过期',
            type: 'error',
        })
    } else {
        Pages.userId = currentUserId
        // 调用获取分页信息函数
        getTodoListInfo(Pages.pageNum , Pages.pageSize, Pages.userId , Pages.description)
    }
})

</script>

<style lang="less" scoped>
.todoList{
    background-color: white;
}
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
  
  .todo-name{
    width: 50%;
  }
}
.menuView {
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
  padding: 20px 0;
}

</style>