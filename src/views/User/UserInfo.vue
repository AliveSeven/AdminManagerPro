<template>
    <div class="userInfo">
        <div class="userInfo-wrap">
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="formUserInfo"
              style="max-width: 400px"
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
                        <el-form-item label="用户名" style="max-width: 180px;">
                          <el-input disabled v-model="formUserInfo.username" />
                        </el-form-item>
                        <el-form-item label="昵称"  style="max-width: 180px;">
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
              <span>{{ item.desc }}</span>
              <el-button type="success" v-show="item.done" size="small">已完成</el-button>
              <el-button type="danger" v-show="!item.done" size="small">未完成</el-button>
            </div>
          </el-scrollbar>
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
import { reactive, ref, nextTick } from 'vue'
import { useState } from '@/stores/state'
import { getUserById , addOrUpdateUser } from '@/utils/api'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

// pina数据
const state = useState();
// 表单格式
const labelPosition = ref('top')
// 头像上传对话框
const dialogUploadAvatar = ref(false)
// 上传的文件
const uploadAvatar = ref()
// 上传的图片
const dialogImageUrl = ref('')
// 上传链接前缀
const uploadUrl = 'http://localhost:8000'
// 代办事项
const todoList = ref([
  {
    desc : '和朋友同事一起玩王者，吃鸡',
    done : true
  },
  {
    desc : '下班写今日总结',
    done : false
  },
  {
    desc : '中午打卡，吃饭，下去买一瓶快乐水',
    done : true
  },
  {
    desc : '给项目经理演示项目成果，汇报项目进度，查看同事新提交的bug',
    done : false
  },
  {
    desc : '上班打卡',
    done : true
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
function getCurrentUserById( id : number){
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

nextTick(() =>{
  
})

// 获取pinia中的state数据
// state.getCurrentUserInfo()
// 调用函数
getCurrentUserById(state.currentUserInfo.id)

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
      width: 56vw;

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
    