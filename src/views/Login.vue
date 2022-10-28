<template>
  <div class="login">
    <div class="login-container">
        <div class="login-container-top">
            <div class="login-container-top-logo">
                <img src="https://v1.naiveadmin.com/assets/account-logo.0a6f895e.png" alt="">
            </div>
            <div class="login-container-top-desc">
                AliveSeven Admin后台前端/设计解决方案
            </div>
        </div>

        <div class="login-container-form">
            <div class="login-form">
                <el-form :model="ruleForm" status-icon 
                    :rules="rules" 
                    class="demo-ruleForm">
                    <!-- 输入账号密码 -->
                    <div class="form-item-input">
                        <el-form-item label="" prop="user">
                          <el-input type="text" size="large" :prefix-icon="User"  v-model="ruleForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="pass">
                          <el-input type="password" size="large" :prefix-icon="Lock" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
                        </el-form-item>
                    </div>
                    <!-- 自动登录和忘记密码 -->
                    <div class="form-item-blank">
                        <div class="autoLogin">
                            <el-checkbox size="large" label="自动登录" name="type" />
                        </div>
                        <div class="blank-item">
                            忘记密码
                        </div>
                    </div>
                    <!-- 登录按钮 -->
                    <div class="form-item-btn">
                        <el-form-item>
                          <el-button type="primary" size="large" @click="submitForm(ruleForm)">登录</el-button>
                        </el-form-item>
                    </div>
                    <!-- 其他登录方式和注册账号 -->
                    <div class="form-item-blank">
                        <span style="font-size : 14px;">其它登录方式</span>
                        <div class="blank-item">注册账号</div>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage , FormRules } from 'element-plus'
import { User , Lock } from '@element-plus/icons-vue'
import { login } from '@/utils/api'
import { useState } from '@/stores/state'
import router from '@/router';

const state = useState()

const ruleForm = reactive({
    username : 'admin',
    password : 'admin'
})

const rules = reactive<FormRules>({
  username : [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
  password : [
    { required: true, message: "请输入密码", trigger: "blur" },
  ]
})

// 登录
function submitForm(inputData : any){
    login(inputData).then((res) =>{
        console.log(res)
        if(res.code === '200'){
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            router.push({
                path : '/home/dashBoard'
            })
            // 将用户数据设定在缓存中
            localStorage.setItem("user" , JSON.stringify(res.data));
            // 获取当前用户信息
            state.getCurrentUserInfo()
        }else if(res.code === '600'){
            ElMessage({
                message: '用户名或密码错误',
                type: 'error',
            })
        }
    })
}

function resetForm(){
    const obj = {
        username : '',
        password : ''
    }
    Object.assign(ruleForm , obj)
}


</script>

<style lang="less" scoped>
.login{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-image: url('https://v1.naiveadmin.com/assets/login.7b57ab51.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
    background-color: #f7f7f7;

    .login-container{
        flex: 1;
        padding: 32px 12px;
        max-width: 384px;
        min-width: 320px;
        margin: 0 auto;
        height: 100%;

        .login-container-top{
            padding: 32px 0;
            text-align: center;

            .login-container-top-logo{

                img{
                    max-width: 100%;
                    height: auto;
                }
            }

            .login-container-top-desc{
                font-size: 14px;
                color: #808695;
            }

        }

        .login-container-form{

            .login-form{

                .form-item-blank{
                    display: flex;
                    margin: 20px 10px;

                    .blank-item{
                        font-size: 14px;
                        cursor: pointer;
                        color: #2d8cf0;
                        margin-left: auto;
                        display: flex;
                        align-items: center;
                    }
                }

                .form-item-btn{

                    .el-button{
                        width: 100%;
                        background-color: #2d8cf0;
                    }
                }
            }
        }

    }
}
</style>
