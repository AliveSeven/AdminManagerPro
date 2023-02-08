<template>
    <div class="moments-edit" >
        <div class="moments-tip">
            动态发布，使用富文本进行文章、动态的编写
        </div>
        <div class="moments-title">
            <el-input v-model="title" placeholder="请输入文章标题" size="large" />
        </div>
            <div style="border: 1px solid #ccc">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated"
                />
            </div>

        <div class="confirm">
            <el-button type="success" @click="getHtml" plain>确认发布</el-button>
            <el-button type="danger" plain>清空</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted , reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 编写模式
const mode = 'default'

// 模拟 ajax 异步获取内容
onMounted(() => {   
    setTimeout(() => {
        valueHtml.value = '<p><span style="color: rgb(27, 27, 27); font-size: 12px;"> 1、点击开启奖池按钮，在B、C、D档位选择小主心仪的奖池组合（A档是大奖服饰为固定奖励，无法选择哦），一共可以进行12次叶子翻面，每次翻面可获得自选奖池中的一项奖励。</span></p><p><span style="color: rgb(27, 27, 27); font-size: 12px;"> 2、每一次叶子翻面需要消耗一定的叶子，具体数量为0/6/15/25/35/45/55/70/85/100/115/130。</span></p>'
    }, 1500)
})

const toolbarConfig = {}

const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor : any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

function getHtml(){
    console.log("valueHtml",valueHtml)
}

// 文章标题
const title = ref('')

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
