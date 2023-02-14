<template>
    <div class="socket">
        <div class="room-left">
            <div class="avatar">
                <el-image :src="currentAvatar" lazy></el-image>
            </div>
            <div class="icon" :class="{'active' : activeIcon == item.active}" v-for="(item, index) in leftIcons" @click="clickIcon(item.active)" :key="index">
                <el-icon>
                    <component :is='item.icon'></component>
                </el-icon>
            </div>
        </div>
        <div class="room-user">
            <div class="title">
                当前用户列表
            </div>
            <div class="user">
                <div class="item">
                    <el-image :src="currentAvatar" lazy></el-image>
                    <span>群聊</span>
                </div>
                <div class="item" v-for="(item, index) in currentUsers" :key="index" @click="chat(item)" :class="{'active' : item.userId == activeUserId}">
                    <el-icon :size="30"><User /></el-icon>
                    <span>{{ item.username }}</span>
                </div>
            </div>
        </div>
        <div class="room">
            <div class="title">
                聊天室({{ currentUsers.length + 1 }}) 
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
const currentAvatar = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string).avatarUrl : ''

// 左边框栏目
const leftIcons = ref([
    {
        icon : 'ChatLineRound',
        desc : '群聊',
        active : 'chatline'
    },
    {
        icon : 'User',
        desc : '个人',
        active : 'personal'
    }
])

// 正在激活的选项
const activeIcon = ref('chatline')

// 点击左边icon
const clickIcon = (val : any) =>{
    activeIcon.value = val
}

// 当前用户列表
const currentUsers = ref([
    {
        userId : 111,
        username : ''
    }
])

// 正在激活的聊天
const activeUserId = ref()

// 聊天的user
const chatUser = ref('')

// 聊天信息数组
const messages = []

// 聊天内容
const content = ref('')

let socket : any
function init(){
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : {}
    // 用户名
    let username = user.username
    // 当前用户的id
    let userId = user.id
    if(typeof(WebSocket) == "undefined"){
        console.log("您的浏览器不支持WebSocket");
    } else {
        console.log("您的浏览器支持WebSocket");
        let socketUrl = "ws://localhost:8000/imserver/" + username + '/' + userId;
        if (socket != null) {
          socket.close();
          socket = null;
        }

        // 开启一个websocket服务
        socket = new WebSocket(socketUrl);
        // 打开事件
        socket.onopen = function () {
          console.log("websocket已打开");
        };

        //  浏览器端收消息，获得从服务端发送过来的文本消息
        socket.onmessage = function (msg : any) {
          console.log("====收到数据====" + msg.data)
          let data = JSON.parse(msg.data)  // 对收到的json数据进行解析， 类似这样的： {"users": [{"username": "zhang"},{ "username": "admin"}]}
          console.log("data",data)
          if (data.users) {  // 获取在线人员信息
            currentUsers.value = data.users.filter((user : any) => user.username !== username)  // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
          } else {
            // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
            //  // {"from": "zhang", "text": "hello"}
            if (data.from === chatUser.value) {
              messages.push(data)
              // 构建消息内容
              createContent(data.from, null, data.text)
            }
          }
        };

        //关闭事件
        socket.onclose = function () {
          console.log("websocket已关闭");
        };

        //发生了错误事件
        socket.onerror = function () {
          console.log("websocket发生了错误");
        }
    }
}

function createContent(remoteUser : any, nowUser : any, text : string) {  // 这个方法是用来将 json的聊天消息数据转换成 html的。
  let html
  // 当前用户消息
  if (nowUser) { // nowUser 表示是否显示当前用户发送的聊天消息，绿色气泡
    html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
        "  <div class=\"el-col el-col-22\" style=\"text-align: right; padding-right: 10px\">\n" +
        "    <div class=\"tip left\">" + text + "</div>\n" +
        "  </div>\n" +
        "  <div class=\"el-col el-col-2\">\n" +
        "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
        "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
        "  </span>\n" +
        "  </div>\n" +
        "</div>";
  } else if (remoteUser) {   // remoteUser表示远程用户聊天消息，蓝色的气泡
    html = "<div class=\"el-row\" style=\"padding: 5px 0\">\n" +
        "  <div class=\"el-col el-col-2\" style=\"text-align: right\">\n" +
        "  <span class=\"el-avatar el-avatar--circle\" style=\"height: 40px; width: 40px; line-height: 40px;\">\n" +
        "    <img src=\"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png\" style=\"object-fit: cover;\">\n" +
        "  </span>\n" +
        "  </div>\n" +
        "  <div class=\"el-col el-col-22\" style=\"text-align: left; padding-left: 10px\">\n" +
        "    <div class=\"tip right\">" + text + "</div>\n" +
        "  </div>\n" +
        "</div>";
  }
  console.log(html)
  content.value += html;
}

// 点对点聊天
function chat(user : any){
    chatUser.value = user.username
    activeUserId.value = user.userId
    console.log('点对点聊天')
}

onMounted(() => {
    init()
})

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

        .avatar{
            width: 50px;
            height: 50px;
        }

        .icon{
            width: 50px;
            height: 50px;
            font-size: 30px;
            display: flex;   
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: #fff;
            transition: .3s;

            &:hover{
                background-color: rgb(147, 113, 200);
            }

            &.active{
                color: rgb(175, 127, 219);
            }
        }
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

            .item{
                display: flex;
                height: 50px;
                margin-top: 2px;
                cursor: pointer;
                transition: .3s;

                span{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 20px;
                }

                &:hover{
                    background-color: rgb(175, 127, 219);;
                }

                &.active{
                    background-color: rgb(175, 127, 219);;
                }

                .el-icon{
                    height: 100%;
                    margin-left: 10px;
                }
            }
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
