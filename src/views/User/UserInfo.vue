<template>
    <div class="userInfo">
        <div class="userInfo-wrap">
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="formUserInfo"
              style="max-width: 25vw"
            >
                <el-row :gutter="20">
                    <el-col :span="24" :offset="0">
                        <el-form-item label="">
                            <div class="userInfo-wrap-avatar">
                                <el-tooltip class="box-item" effect="dark" content="点击更换头像" placement="top">
                                    <img :src="formUserInfo.avatarUrl" @click="dialogUploadAvatar = true" />
                                </el-tooltip>
                            </div>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24" :offset="0" class="name">
                        <el-form-item label="用户名" style="max-width: 10vw;">
                          <el-input disabled v-model="formUserInfo.username" />
                        </el-form-item>
                        <el-form-item label="昵称"  style="max-width: 10vw;">
                          <el-input v-model="formUserInfo.nickname" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :offset="0">
                        <el-form-item label="邮箱">
                          <el-input v-model="formUserInfo.email" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :offset="0">
                        <el-form-item label="电话">
                          <el-input v-model="formUserInfo.phone" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :offset="0">
                        <el-form-item label="地址">
                          <el-input v-model="formUserInfo.address" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" :offset="0">
                        <el-button type="primary" @click="submitForm(formUserInfo)">确认</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!-- 代办事项 -->
        <div class="todo-wrap">
          <div class="todo-title">
            待办事项
          </div>
          <el-scrollbar height="400px">
            <div class="todo-list" v-for="(item, index) in todoList" :key="index">
              <span>{{ item.description }}</span>
              <el-button type="success" v-show="item.done" size="small">已完成</el-button>
              <el-button type="danger" v-show="!item.done" size="small">未完成</el-button>
            </div>
          </el-scrollbar>
        </div>

        <!-- 项目进度 -->
        <div class="project-wrap">
            <div class="title">
              项目进度
            </div>
            <el-table ref="tableRef" row-key="start" :data="tableData" style="max-width: 50vw" height="246" max-height="300">
              <el-table-column prop="name" label="项目名" width="250" />
              <el-table-column
                prop="start"
                label="项目开始时间"
                sortable
                width="180"
                column-key="start"
              />
              <el-table-column
                prop="end"
                label="项目结束时间"
                sortable
                width="180"
                column-key="end"
              />
              <el-table-column prop="progress" label="进度" :formatter="formatter" />

              <el-table-column
                prop="tag"
                label="Tag"
                width="100"
                :filters="[
                  { text: 'Home', value: 'Home' },
                  { text: 'Office', value: 'Office' },
                ]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
                <template #default="scope">
                  <el-tag
                    :type="scope.row.tag === 'Home' ? '' : 'success'"
                    disable-transitions
                    >{{ scope.row.tag }}</el-tag
                  >
                </template>
              </el-table-column>
            </el-table>
        </div>

        <!-- 快捷操作 -->
        <div class="quick-wrap">
          <div class="title">
            快捷操作
          </div>

          <div class="quick">
            <div class="wrap" v-for="(item, index) in quickAction" :key="index" @click="router.push({path : `${item.url}`})">
              <el-icon :size="35" :color="item.color">
                <component :is='item.icon' ></component> 
              </el-icon>
              <span>{{ item.desc }}</span>
            </div>
          </div>

        </div>

        <!-- 动态 -->
        <div class="moments-wrap">
          <div class="title">
            动态
          </div>
          <el-scrollbar height="352px">
            <div class="moment" v-for="(item, index) in moments" :key="index">
              <div class="person">
                <div class="avatar">
                  <img :src="item.avatar" alt="">
                </div>
                <div class="user">
                  <span>{{ item.user }}</span>
                </div>
              </div>
              <div class="desc-wrap">
                <div class="desc">{{ item.desc }}</div>
                <div class="data">{{ item.data }}</div>
              </div>
            </div>
          </el-scrollbar>
        </div>

        <!-- 收藏 -->
        <div class="collect-wrap">
          <div class="title">
            收藏夹
          </div>
          <div class="form-table">
              <el-table :data="collectData" @current-change="" :border="true" ref="singleTableRef" height="350">
                  <el-table-column label="收藏夹封面" width="100" align="center" header-align="center">
                    <template #default="scope">
                      <el-image
                        style="width: 75px; height: 75px;"
                        :src="scope.row.cover"
                        :zoom-rate="1.2"
                        lazy
                        fit="cover"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="收藏夹名称" width="200" />
                  <el-table-column prop="desc" label="收藏夹描述" />
                  <el-table-column label="操作" width="150">
                      <template #default="scope">
                          <el-button size="small" @click="" type="warning" plain>编辑</el-button>
                          <el-button size="small" type="danger" @click="">删除</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
        </div>

        <!-- 头像上传对话框 -->
        <div class="dialog-uploadAvatar">
            <el-dialog v-model="dialogUploadAvatar" title="上传要导入的图片文件">
              <el-upload
                class="upload-demo"
                ref="uploadAvatar"
                :action="`${uploadUrl}file/upload`"
                method="post"
                list-type="picture"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
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
                        <el-button class="ml-3" type="success" @click="submitForm(formUserInfo)">
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
    
<script setup lang="ts">
import { reactive, ref, nextTick, onMounted } from 'vue'
import { useState } from '@/stores/state'
import { getUserById , addOrUpdateUser , getTodoListByUserId , getProjectByUserId } from '@/utils/api'
import { ElMessage , ElTable , type TableColumnCtx } from 'element-plus'
import type { UploadProps } from 'element-plus'
import router from '@/router';

interface Project {
  start: string
  end: string
  name: string
  progress: number
  tag: string
}

// pina数据
const state = useState();
// 表单格式
const labelPosition = ref('top')
// 头像上传对话框
const dialogUploadAvatar = ref(false)
// 上传的文件
const uploadAvatar = ref()
// 上传链接前缀
const uploadUrl = 'http://localhost:8000'
// 代办事项
const todoList = ref([
  {
    description : '',
    done : true
  },
])

// 项目进度表单
const tableData = ref([])

// 快捷操作icon
const quickAction = ref([
{
    icon : 'PieChart',
    desc : '主控台',
    color : 'rgb(104, 199, 85)',
    url : '/home/dashBoard'
  },
  {
    icon : 'Setting',
    desc : '系统管理',
    color : 'rgb(250, 178, 81)',
    url : '/home/system/usertable'
  },
  {
    icon : 'Edit',
    desc : '动态发布',
    color : 'rgb(24, 144, 255)',
    url : '/home/personal/momentsEdit'
  },
  {
    icon : 'Histogram',
    desc : '项目管理',
    color : 'rgb(104, 199, 85)',
    url : '/home/personal/project'
  },
  {
    icon : 'Finished',
    desc : '代办事项',
    color : 'rgb(250, 178, 81)',
    url : '/home/personal/todoList'
  },
  {
    icon : 'Message',
    desc : '信息',
    color : 'rgb(24, 144, 255)'
  },
])

// 动态
const moments = ref([
  {
    user : 'Alive',
    avatar : 'https://v1.naiveadmin.com/assets/schoolboy.9f04cdf7.png',
    desc : 'Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！',
    data : '2023-02-04 22:37:16'
  },
  {
    user : 'Alive',
    avatar : 'https://v1.naiveadmin.com/assets/schoolboy.9f04cdf7.png',
    desc : 'Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！',
    data : '2023-02-04 22:37:16'
  },
  {
    user : 'Alive',
    avatar : 'https://v1.naiveadmin.com/assets/schoolboy.9f04cdf7.png',
    desc : 'Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！',
    data : '2023-02-04 22:37:16'
  },
  {
    user : 'Alive',
    avatar : 'https://v1.naiveadmin.com/assets/schoolboy.9f04cdf7.png',
    desc : 'Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！',
    data : '2023-02-04 22:37:16'
  },
])

// 收藏夹
const collectData = ref([
  {
    cover : 'https://dummyimage.com/400x400/797ff2/a3f279&text=Frank',
    name : '视频收藏夹',
    desc : '收藏的相关视频'
  },
  {
    cover : 'https://dummyimage.com/400x400/797ff2/a3f279&text=Frank',
    name : '动态收藏夹',
    desc : '动态的相关文章'
  },
  {
    cover : 'https://dummyimage.com/400x400/797ff2/a3f279&text=Frank',
    name : '学习收藏夹',
    desc : '学习的相关视频'
  },
  {
    cover : 'https://dummyimage.com/400x400/797ff2/a3f279&text=Frank',
    name : '学习收藏夹',
    desc : '学习的相关视频'
  },
])

// 当前用户的信息
const formUserInfo = reactive({
    username : '',
    nickname : '',
    email : '',
    phone : '',
    address : '',
    avatarUrl : '',
})

// 根据id查找当前用户的数据
function getCurrentUserById(id : number){
    getUserById(id).then((res) =>{
        if(res.code === '200'){
            // 赋值
            Object.assign(formUserInfo , res.data)
        }
    }).catch(err =>{
        console.log(err)
    })
}

// 更新用户数据，编辑
function submitForm(FormData : any){
  addOrUpdateUser(FormData).then((res) =>{
    if(res.code === '200'){
      // 获取当前用户的id，进行判断
      const currentUserId = JSON.parse(localStorage.getItem("user") as string).id
      // 如果是当前用户的id
      if(FormData.id == currentUserId){
        // 改变赋值
        state.changeCurrentUserInfo(FormData)
        console.log("当前用户信息：", state.currentUserInfo)
      }
      ElMessage({
        message: '更新用户信息成功',
        type: 'success',
      })
    }
  }).catch((err) =>{
      console.log("更新失败：",err)
      ElMessage({
        message: '更新失败',
        type: 'error',
    })
  })
}

const filterTag = (value: string, row: Project) => {
  return row.tag === value
}

const formatter = (row: Project, column: TableColumnCtx<Project>) => {
  return row.progress
}

nextTick(() =>{
  
})

// 获取当前用户的TodoList和Project相关信息
function getCurrentUserInfo(){
  const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).id : null
  if(userId != null){
    getTodoListByUserId(userId).then((res) =>{
      if(res.code === '200'){
        todoList.value = res.data
      }
    }).catch((err) => {
      ElMessage({
        message: '获取数据报错',
        type: 'error',
      })
    })
    
    getProjectByUserId(userId).then((res) =>{
      if(res.code === '200'){
        tableData.value = res.data
      }
    }).catch((err) => {
      ElMessage({
        message: '获取数据报错',
        type: 'error',
      })
    })

  } else {
    ElMessage({
      message: '用户未登录或登录失效',
      type: 'error',
    })
  }
}

onMounted(() => {
  // 获取pinia中的state数据
  // state.getCurrentUserInfo()
  const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).id : null
  // 调用函数
  getCurrentUserById(state.currentUserInfo.id)
  // 获取全部代办事项
  getCurrentUserInfo()
})


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
  dialogUploadAvatar.value = false
  // 清空已上传的文件列表
  uploadAvatar.value!.clearFiles()
  // 重新获取表单数据
}

// 上传失败函数
function handleUploadError(){
  ElMessage({
    message: '导入失败，请重试',
    type: 'error',
  })
}

</script>
    
<style lang="less" scoped>
.userInfo{
    display: flex;
    flex-wrap: wrap;
    .userInfo-wrap{
        padding: 20px;
        width: fit-content;
        // border-radius: 5px;
        // border: 1px #3182BD solid;
        // box-shadow: 0 0 7px #3182BD;
        background-color: white;

        .name{
          display: flex;
          justify-content: space-between;
        }

        .userInfo-wrap-avatar{
            width: 80px;
            height: 80px;
            border-radius: 70px;
            overflow: hidden;
            margin: 0 auto;

            img{
                width: 100%;
                cursor: pointer;
            }

        }
    }

    .todo-wrap{
      margin-left: 20px;
      background-color: #fff;
      width: 60vw;
      overflow: hidden;

      .todo-title{
        padding: 20px;
        border-bottom: 1px solid #e4e7ed;
        font-size: 14px;
      }

      .todo-list{
        padding: 10px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        font-size: 14px;

        span{
          padding-left: 8px;
        }

        button{
          margin-right: 5px;
        }

        &:hover{
          background-color: #f5f7fa;
        }
      }

    }

    .project-wrap{
      margin-top: 20px;

      .title{
        padding: 14px;
        border-bottom: 1px solid #e4e7ed;
        font-size: 14px;
        background-color: #fff;
      }
    }

    .quick-wrap{
      background-color: #fff;
      margin-top: 20px;
      margin-left: 20px;
      width: 46vw;
      height: 295.5px;

      .title{
        padding: 14px 20px;
        border-bottom: 1px solid #e4e7ed;
        font-size: 14px;
      }

      .quick{
        display: flex;
        flex-wrap: wrap;

          .wrap{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 30px;
          width: 12.15vw;
          border-bottom: 1px #e4e7ed solid;
          border-right: 1px #e4e7ed solid;
          height: 121.8px;

          span{
            padding-top: 5px;
          }

          &:hover{
            cursor: pointer;
            box-shadow: 0 0 10px #ddd;
          }
        }
      }
    }

    .moments-wrap{
      background-color: #fff;
      margin: 20px 0;
      width: 41.2vw;
      overflow: hidden;

      .title{
        padding: 14px 20px;
        border-bottom: 1px solid #e4e7ed;
        font-size: 14px;
      }

      .moment{
        display: flex;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 1px solid #e4e7ed;

        .person{
          padding-right: 15px;

          img{
            width: 40px;
            height: 40px;
          }

          .user{
            font-size: 12px;
            margin-top: 2px;
            text-align: center;
          }
        }

        .desc-wrap{
          flex: 1;
          margin-left: 5px;

          .data{
            --tw-text-opacity: 1;
            color: rgb(107 114 128 / var(--tw-text-opacity));
            font-size: .75rem;
            line-height: 1rem;
            padding-top: 15px;
          }
        }
      }
    }

    .collect-wrap{
      background-color: #fff;
      margin: 20px 0;
      margin-left: 20px;
      width: 46vw;
      overflow: hidden;

      .title{
        padding: 14px 20px;
        border-bottom: 1px solid #e4e7ed;
        font-size: 14px;
      }
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

}
</style>
    