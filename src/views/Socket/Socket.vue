<template>
    <div class="socket">
        <div class="room-left">
            <div class="avatar">
                <el-image :src="currentAvatar" lazy></el-image>
            </div>
        </div>
        <div class="room-user">
            <div class="title">
                当前用户列表
            </div>
            <div class="user">

            </div>
        </div>
        <div class="room">
            <div class="title">
                聊天室()
            </div>
            <div class="center">
                <ul class="join">

                </ul>
            </div>
            <div class="editer">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 200px; overflow-y: hidden;"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
                />
                <div class="btn">
                    <el-button type="primary" @click="">发送</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { onBeforeUnmount, ref, shallowRef, onMounted , reactive } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 编写模式
const mode = 'default'

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

const toolbarConfig = {}

const editorConfig = { placeholder: '请输入内容...' }

const handleCreated = (editor : any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 当前用户的头像
const currentAvatar = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).avatar : ''

</script>


<style lang="less" scoped>
.socket{
    width: 900px;
    // height: 500px;
    margin: 50px auto;
    display: flex;

    .room-left{
        background-color: #474574;
        width: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
    }

    .room-user{
        width: 200px;
        background-color: #e6e5e5;
        color: #000;
        display: flex;
        flex-direction: column;

        .title{
            font-size: 13px;
            padding: 9.6px 10px;
            height: 20px;
            border-bottom: 1px solid #e5e5e58c;
            box-shadow: 1px 1px 1px #b2c0c9;
            display: flex;
            align-items: center;
        }

        .user{
            flex: 1;
        }
    }

    .room{
        flex: 1;
        background-color: #f6f6f6;
        display: flex;
        flex-direction: column;

        .title{
            display: flex;
            justify-content: center;
            line-height: 40px;
            font-size: 16px;
            border-bottom: 1px solid rgba(100, 100, 100, 0.3);
        }

        .center{
            height: 300px;

            .join{
                text-align: center;
                color: #ccc;
                overflow: auto;
                height: 300px;
                font-size: 13px;
            }
        }

        .editer{
            position: relative;
            flex: 1;
            background-color: #fff;
            padding: 0 10px;

            .tool{
                height: 25px;
                padding-top: 6px;
                display: flex;
            }

            .btn{
                text-align: right; 
                padding: 10px;
                border-top: 1px solid #ccc;
            }
        }
    }

}

</style>
