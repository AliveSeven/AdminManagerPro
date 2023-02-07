<template>
    <div class="moments-edit" >
        <div class="moments-tip">
            动态发布，请使用Markdown语法进行文章、动态的编写
        </div>
        <div class="moments-title">
            <el-input v-model="title" placeholder="请输入文章标题" size="large" />
        </div>
        <md-editor v-model="state.text" :preview-theme="state.theme" :footers="footers" class="editer" >
            <template #defFooters>
                <span>￥_￥</span>
                <span>^_^</span>
            </template>
        </md-editor>
        <div class="confirm">
            <el-button type="success" plain>确认发布</el-button>
            <el-button type="danger" plain>清空</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive , ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { Footers } from 'md-editor-v3';

const state = reactive({
  text: '',
  theme: 'vuepress',
});

// 文章标题
const title = ref('')

// markdown编辑器页脚
const footers : Footers[] = ['markdownTotal', 0, '=', 1, 'scrollSwitch'];


</script>

<style lang="less" scoped>
.moments-edit{

    .moments-tip{
        padding: 14px;
        border-bottom: 1px solid #e4e7ed;
        font-size: 14px;
        background-color: #fff;
        margin-bottom: 5px;
    }

    .moments-title{
        margin-bottom: 5px;
    }

    .editer{
        height: 70vh;
    }

    .confirm{
        background-color: #fff;
        margin-top: 5px;
        padding: 14px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
    }
}
</style>
