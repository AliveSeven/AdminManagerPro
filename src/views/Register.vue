<template>
    <div class="register">
        <div class="register-container">
            <div class="register-container-top">
                <div class="register-container-top-logo">
                    <img src="https://v1.naiveadmin.com/assets/account-logo.0a6f895e.png" alt="">
                </div>
                <div class="register-container-top-desc">
                    AliveSeven Admin后台前端/设计解决方案
                </div>
            </div>

            <div class="register-container-form">
                <div class="register-form">
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

                        <!-- 注册按钮 -->
                        <div class="form-item-btn">
                            <el-form-item>
                              <el-button type="primary" size="large" @click="submitForm(ruleForm)">注册</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, FormRules } from 'element-plus'
import { User , Lock } from '@element-plus/icons-vue'
import { register } from '@/utils/api'
import router from '@/router';

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

// 注册
function submitForm(inputData : any){
    register(inputData).then((res) =>{
        console.log(res)
        if(res.code === '200'){
            ElMessage({
                message: '注册成功',
                type: 'success',
            })
            router.push({
                path : '/login'
            })
        }else if(res.code === '400'){
            ElMessage({
                message: '参数错误',
                type: 'error',
            })
        }
    })
}


</script>

<style lang="less" scoped>
.register{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-image: url('https://v1.naiveadmin.com/assets/login.7b57ab51.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
    background-color: #f7f7f7;

    .register-container{
        flex: 1;
        padding: 32px 12px;
        max-width: 384px;
        min-width: 320px;
        margin: 0 auto;
        height: 100%;

        .register-container-top{
            padding: 32px 0;
            text-align: center;

            .register-container-top-logo{

                img{
                    max-width: 100%;
                    height: auto;
                }
            }

            .register-container-top-desc{
                font-size: 14px;
                color: #808695;
            }

        }

        .register-container-form{

            .register-form{

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