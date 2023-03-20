<template>
  <div class="userTableView" :key="loading">
    <div class="form">
      <div class="username">
        <span>用户名</span>
        <el-input v-model="Pages.InputUsername" class="w-50 m-2" placeholder="请输入用户的名称" :suffix-icon="Search" />
      </div>

      <div class="email">
        <span>邮箱</span>
        <el-input v-model="Pages.InputEmail" class="w-50 m-2" placeholder="请输入用户的邮箱" :suffix-icon="Promotion" />
      </div>

      <div class="phone">
        <span>手机号码</span>
        <el-input v-model="Pages.InputPhone" class="w-50 m-2" placeholder="请输入用户的手机号" :suffix-icon="Iphone" />
      </div>
      <el-button type="primary" :icon="Search" class="form-btn" @click="getPageInfoByInput()">搜索</el-button>

      <el-button class="form-btn" plain @click="reGetPageInfo()">重置</el-button>
    </div>
    <div class="form-sec">
      <el-button class="form-btn" type="primary" :icon="Plus" @click="dialogAddVisible = true">新增</el-button>
      <el-button class="form-btn" type="danger" :icon="Remove">批量删除</el-button>
      <el-button class="form-btn" type="primary" :icon="Top" @click="dialogUploadVisible = true">导入</el-button>
      <el-button class="form-btn" type="primary" :icon="Bottom" @click="exportUserInfo()">导出</el-button>
    </div>
    <div class="form-table">
      <el-table :data="tableData" @current-change="TableCurrentChange" ref="singleTableRef"
        style="width: 98%;margin-left: 10px;height: 67vh;">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column label="详细信息">
          <el-table-column prop="email" label="邮箱" width="200" />
          <el-table-column prop="phone" label="电话" width="120" />
          <el-table-column prop="role" label="用户角色" width="150" />
          <el-table-column prop="address" label="地址" />
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small" @click="dialogEditVisible = true" type="warning" plain>编辑</el-button>
            <el-button size="small" type="danger" @click="dialogDeleteVisible = true">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination small background layout="total, sizes, prev, pager, next, jumper" :page-size="Pages.pageSize"
        :page-sizes="[5, 10, 20, 30]" :current-page="Pages.pageNum" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" :total="total" class="mt-4" />
    </div>
    <!-- 新增用户的对话框 -->
    <div class="dialog-add">
      <el-dialog v-model="dialogAddVisible" title="新增用户信息">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
          <!-- <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="选择性别">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item> -->
          <el-row :gutter="10">
            <el-col :span="20" :offset="0">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.username" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="form.password" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                <el-input v-model="form.nickname" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="form.email" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
                <el-select placeholder="请选择用户角色" v-model="form.role" :options="roleData" autocomplete="off">
                  <el-option v-for="(item, index) in roleData" :key="index" :label="item.description"
                    :value="item.role" />
                </el-select>
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
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="currentRow.username" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="currentRow.password" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                <el-input v-model="currentRow.nickname" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="currentRow.phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="currentRow.email" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="currentRow.address" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="0">
              <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
                <el-select placeholder="请选择角色" v-model="currentRow.role">
                  <el-option v-for="(item, index) in roleData" :key="index" :label="item.description"
                    :value="item.role" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogEditVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleEdit(currentRow, ruleFormRef)">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 删除信息的对话框 -->
    <div class="dialog-delete">
      <el-dialog v-model="dialogDeleteVisible" :model="currentRow" ref="ruleFormRef" title="删除用户信息" width="30%">
        <span>删除当前用户</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogDeleteVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleDelete(currentRow.id)">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 上传文件的对话框 -->
    <div class="dialog-upload">
      <el-dialog v-model="dialogUploadVisible" title="上传要导入的表格文件">
        <el-upload class="upload-demo" ref="uploadRef" action="http://localhost:8000/user/import" method="post"
          :on-exceed="handleExceed" :on-success="handleUploadSuccess" :on-error="handleUploadError" drag
          :auto-upload="false" :limit="1">
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
  </div>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Search, Iphone, Promotion, Plus, Remove, Top, Bottom, UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, FormRules, FormInstance, ElTable } from 'element-plus'
import type { UploadInstance, UploadProps } from 'element-plus'
import { getPage, addOrUpdateUser, deleteUser, exportUser, getRole } from '@/utils/api'
import { useState } from '@/stores/state'
import to from 'await-to-js';

const state = useState();
const { remindElMessage } = useState();

interface User {
  id: number,
  username: string,
  password: string,
  nickname: string,
  email: string,
  phone: string,
  address: string,
}

// 表格数据
var tableData: any = ref([])
// 单条的表格数据，单选
var currentRow = reactive({
  id: 100,
  username: '',
  password: '',
  nickname: '',
  email: '',
  phone: '',
  address: '',
  role: ''
})
// 分页数据
// 用户总数，暂定为100个
var total = ref(100)

// 页码和每页User数量form:
var Pages = reactive({
  pageNum: 1,
  pageSize: 10,
  InputUsername: '',
  InputEmail: '',
  InputPhone: '',
})

// 用户角色
const roleData = ref()

// 对话框变量
const dialogAddVisible = ref(false)
// 编辑对话框可视化
const dialogEditVisible = ref(false)
// 删除对话框可视化
const dialogDeleteVisible = ref(false)
// 上传对话框可视化
const dialogUploadVisible = ref(false)
// 表单长度
const formLabelWidth = '140px'
// 表单规律限制
const ruleFormRef = ref<FormInstance>()
// 文件上传
const uploadRef = ref<UploadInstance>()
// 重新渲染，loading
const loading: any = ref(false)


// 对话框表格变量，这里面的变量名要和后端数据库表中的一致
const form = reactive({
  username: '',
  password: '',
  nickname: '',
  email: '',
  phone: '',
  address: '',
  role: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
  ],
  nickname: [
    { required: true, message: "用户昵称", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    // 这个只能验证手机号
    { pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: "请输入合法手机号", trigger: "blur" }
    // { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法的手机号", trigger: "blur" }
  ],
  email: [
    { required: false, message: "请输入邮箱", trigger: "blur" },
    { pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: "请输入正确的邮箱", trigger: "blur" }
  ],
  role: [
    { required: true, message: "请选择角色", trigger: "change" },
  ],
})

// 通过分页获取用户信息
async function getPageInfo(pageNum: number, pageSize: number, username: string, email: string, phone: string) {
  const [err, res] = await to(
    getPage(pageNum, pageSize, username, email, phone)
  );
  if (err) {
    console.log('获取数据报错', err)
  }
  tableData.value = res?.data.records
  total.value = res?.data.total
}

// 获取角色信息
async function getRoleInfo() {
  const [err, res] = await to(getRole());
  if (err) {
    console.log('获取获取角色信息报错', err)
  }
  roleData.value = res?.data
}

// 通过输入的信息获取用户信息，搜索
function getPageInfoByInput() {
  getPageInfo(Pages.pageNum, Pages.pageSize, Pages.InputUsername, Pages.InputEmail, Pages.InputPhone)
}

// 重置
function reGetPageInfo() {
  // 页数重新定位到第一页
  Pages.InputUsername = '',
    Pages.InputEmail = '',
    Pages.InputPhone = '',
    loading.value = !loading.value
  getPageInfoByInput()
}

// 新增用户数据
async function handleAdd(formData: any, formEl?: FormInstance | undefined) {
  // 校验表单
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addOrUpdateUser(formData).then((res) => {
        remindElMessage('新增用户成功');
        reGetPageInfo()
        // 清空form数据
        form.username = '',
          form.password = '',
          form.phone = '',
          form.nickname = '',
          form.email = '',
          form.address = '',
          dialogAddVisible.value = false
        loading.value = !loading.value
      }).catch((err) => {
        console.log("新增失败：", err)
        remindElMessage('新增失败', 2);
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 更新用户数据，编辑
async function handleEdit(tableRowData: any, formEl?: FormInstance | undefined) {
  // 校验表单
  if (!formEl) return;
  // 验证
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 新增或更新用户
      addOrUpdateUser(tableRowData).then((res) => {
        // 获取当前用户的id，进行判断
        const currentUserId = JSON.parse(localStorage.getItem("user") as string).id
        // 如果是当前用户的id
        if (tableRowData.id == currentUserId) {
          // 改变赋值
          state.changeCurrentUserInfo(tableRowData)
          console.log("当前用户信息：", state.currentUserInfo)
        }
        remindElMessage('更新用户信息成功');
        dialogEditVisible.value = false
        loading.value = !loading.value
        reGetPageInfo()
      }).catch((err) => {
        remindElMessage('更新用户信息成功', 2);
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 删除用户信息，删除
function handleDelete(userId: number) {
  deleteUser(userId).then((res) => {
    if (res.code === '200') {
      remindElMessage('删除用户信息成功');
      dialogDeleteVisible.value = false
      loading.value = !loading.value
      reGetPageInfo()
    }
  }).catch((err) => {
    remindElMessage('删除失败', 2);
  })
}

// 导出用户信息文件
function exportUserInfo() {
  exportUser().then((res: any) => {
    let blob: any = new Blob([res], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;" });
    let url = window.URL.createObjectURL(blob); // 创建一个临时的url指向blob对象
    let a = document.createElement("a");
    a.href = url;
    a.download = '用户信息';  // 自定义下载文件名
    a.click();
    // 释放这个临时的对象url
    window.URL.revokeObjectURL(url);
  }).catch(() => {
    remindElMessage('网络错误', 2);
  });
}

// 当超出限制时，执行的钩子函数
const handleExceed: UploadProps['onExceed'] = (files) => {
  remindElMessage('只能上传一个表格文件', 2);
}

// 提交上传的文件
const submitUpload = () => {
  uploadRef.value!.submit()
}

// 上传成功函数
function handleUploadSuccess() {
  remindElMessage('导入成功');
  dialogUploadVisible.value = false
  // 清空已上传的文件列表
  uploadRef.value!.clearFiles()
  // 重新获取表格数据
  reGetPageInfo()
}

// 上传失败函数
function handleUploadError() {
  remindElMessage('导入失败，请重试');
}

// 页数更改事件
function handleCurrentChange(val: number) {
  Pages.pageNum = val
  getPageInfoByInput()
}

// 页Size改变
function handleSizeChange(val: number) {
  Pages.pageSize = val
  getPageInfoByInput()
}

// 单选，表格选择事件
function TableCurrentChange(val: User) {
  // 这样给reactive赋值可以保证页面会重新渲染
  Object.assign(currentRow, val)
  // currentRow  = val
}

// 调用函数
// getPageInfoByInput()
// getRoleInfo()
onMounted(() => {
  getPageInfoByInput()
  getRoleInfo()
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

.userTableView {
  background-color: white;
  padding-bottom: 5px;
}

.form-btn {
  margin-left: 10px;
}

.form-table {
  margin-top: 10px;
}

.pager {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.upload-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  .submit-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>