<template>
    <div class="roleView">
        <div class="form">
            <div class="name">
                <span>角色名称</span>
                <el-input v-model="Pages.InputRolename" class="w-50 m-2" placeholder="请输入菜单名称" :suffix-icon="Search" />
            </div>
            <el-button type="primary" :icon="Search" class="form-btn" @click="">搜索</el-button>

            <el-button class="form-btn" plain @click="">重置</el-button>
        </div>

        <div class="form-sec">
            <el-button class="form-btn" type="primary" :icon="Plus" @click="">新增</el-button>
            <el-button class="form-btn" type="danger" :icon="Remove">批量删除</el-button>
        </div>

        <div class="form-table">
            <el-table :data="tableData" :border="true" @current-change="TableCurrentChange" ref="singleTableRef" :header-cell-style="{ background : '#F5F7FA'}" style="width: 98%;margin-left: 10px;height: 67vh;">
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column prop="id" label="角色ID"/>
                <el-table-column prop="name" label="角色名称"  />
                <el-table-column prop="description" label="角色描述"  />
                <el-table-column prop="role" label="唯一标识"  />
                <el-table-column label="操作" width="250">
                    <template #default="scope">
                        <!-- 通过插槽scope获取当前行的数据，scope.row.id表示获取当前行的角色id -->
                        <el-button size="small" @click="getRoleMenuInfo(scope.row.id)" type="info" :icon="Menu" plain>菜单管理</el-button>
                        <el-button size="small" @click="" type="warning" plain>编辑</el-button>
                        <el-button size="small" type="danger" @click="">删除</el-button>
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

        <!-- 菜单管理的对话框 -->
        <div class="dialog-menu">
          <el-dialog v-model="dialogMenuVisible" title="菜单管理">
            <el-tree :props="props" ref="treeRef" :data="data" show-checkbox node-key="id" @check="handleNodeClick" />
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogMenuVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleNodeConfirm(currentRow.id)"
                  >Confirm</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, ElTable, ElTree } from 'element-plus'
import { Search, Menu, Plus, Remove, } from '@element-plus/icons-vue'
import { getRolePage , roleMenu, getRoleMenu, getRoleMenuByUserId } from '@/utils/api';
import { useState } from '@/stores/state'
import { useRouter } from 'vue-router'

// 状态管理器
const state = useState()

// 路由管理器,router是用来操作路由的
const router = useRouter()

const treeRef = ref<InstanceType<typeof ElTree>>()

const tableData: any = ref([{
        id: 100,
        name: '121',
        description: '212',
        role: '',
    }
])

// 分页数据
// 角色总数，暂定为20个
var total = ref(20)

// 页码和每页User数量form:
var Pages = reactive({
  pageNum : 1,
  pageSize : 10,
  InputRolename : '',
})

interface Tree {
    label: string
    id : number
    children?: Tree[]
    $treeNodeId? : number
    disabled? : boolean
}

const props = {
  label: 'label',
  children: 'children',
  disabled: 'disabled',
}

// 传入的角色id
const currentRow = ref({
  id : 100
})

// 传入的菜单
const menuArray : any = ref([])

// 传入半选中的菜单
const menuHalfArray : any = ref([])

// 传入的菜单id数组
const menuArrayIds : any = ref([])

const data: Tree[] = [
  {
    label: '主控台',
    id : 1,
    disabled : true,
  },
  {
    label: '系统管理',
    id : 2,
    children: [
      {
        label: '角色管理',
        id : 3
      },
      {
        label: '用户管理',
        id : 4
      },
      {
        label: '菜单管理',
        id : 5
      },
      {
        label: '文件管理',
        id : 6
      },
    ],
  },
  {
    label: '个人信息',
    id : 7,
    disabled : true,
  },
]

// 当前角色已有的菜单权限ID
const currentRoleMenu = ref()

// 菜单管理可视化
const dialogMenuVisible : any = ref(false)

// 调用获取分页信息函数
getRolePageInfo(Pages.pageNum , Pages.pageSize ,Pages.InputRolename)

// 获取分页信息
function getRolePageInfo(pageNum : number, pageSize : number, name : string) {
  getRolePage(pageNum,pageSize,name).then(res =>{
    if(res.code === '200'){
      tableData.value = res.data.records
      total.value = res.data.total
      // console.log(res)
    }
  }).catch((err) =>{
    console.log('获取数据报错',err)
  })
}

// 分页操作触发函数
// 通过输入的信息获取分页信息，搜索
function getPageInfoByInput(){
    getRolePageInfo(Pages.pageNum , Pages.pageSize, Pages.InputRolename)
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

// 单选，表格选择事件
function TableCurrentChange(val : any){
  // 这样给reactive赋值可以保证页面会重新渲染
  currentRow.value = val
  // console.log('currentRow',currentRow.value.id)
  // currentRow  = val
}


// 点击菜单管理多选框
const handleNodeClick = (nodeObj : any , SelectedObj : any) => {
  // console.log(SelectedObj.checkedNodes)
  if(SelectedObj.checkedNodes){
    menuArray.value = SelectedObj.checkedNodes
    // Object.assign(menuArray , SelectedObj.checkedNodes)
    // console.log('menuArray',menuArray)
  }
  // 半选中菜单赋值
  if(SelectedObj.halfCheckedNodes){
    menuHalfArray.value = SelectedObj.halfCheckedNodes
  }
}

// 菜单管理确认
function handleNodeConfirm(roleId : number){
  // 加入选入的id
  menuArray.value.forEach((element : any) => {
      if(menuArrayIds.value.indexOf(element.id) === -1){
        menuArrayIds.value.push(element.id)
      }
      // console.log('没有加入半选中：',menuArrayIds)
  });

  // 加入半选中菜单id，暂时不加入

  // if(menuHalfArray.length != 0){
  //   menuHalfArray.value.forEach((element : any) =>{
  //     if(menuHalfArray.value.indexOf(element.id) === -1){
  //       menuArrayIds.value.push(element.id)
  //     }
  //     // console.log('加入半选中：',menuArrayIds)
  //   })
  // }

  // 分配权限函数
  roleMenu(roleId , menuArrayIds.value ).then(res =>{
    if(res.code === '200'){
      console.log('分配角色菜单权限成功',res)
      ElMessage({
        message: '分配角色菜单权限成功',
        type: 'success',
      })
      getRoleMenuByUserId(roleId).then(res2 =>{
        if(res2.code === '200'){
          ElMessage({
            message: '刷新页面重新分配权限',
            type: 'success',
          })
          state.changeCurrentMenuInfo(Object.values(res2.data))
          // 先从本地存储删除currentMenuInfo
          localStorage.removeItem("currentMenuInfo")
          // 在加入
          localStorage.setItem("currentMenuInfo" , JSON.stringify(res2.data))
          // console.log('RoleView中的',state.currentMenuInfo)
          // 重新加载页面
          router.go(0) 
        }
      })
    }
  }).catch(err =>{
    console.log(err)
  })
  // 清空数据
  // setTimeout(() => {
  //   menuArrayIds.value = []
  // }, 500);
  dialogMenuVisible.value = false
}

// 获取角色有的权限id
async function getRoleMenuInfo(roleId : number){
  dialogMenuVisible.value = true
  await getRoleMenu(roleId).then(res =>{
    if(res.code === '200'){
      currentRoleMenu.value = res.data
      handleSetNodes(currentRoleMenu)
    }
  })
}

// 给当前角色现有的菜单权限打个勾
const handleSetNodes = (menuIds : any) => {
  const nodes : any = ref([])
  menuIds.value.forEach((element : any) => {
    const node : any = {
      id : element
    }
    nodes.value.push(node)
  });
  // console.log(nodes)
  treeRef.value!.setCheckedNodes(nodes.value,false)
}

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
.roleView {
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
  margin: 20px 0;
}

</style>