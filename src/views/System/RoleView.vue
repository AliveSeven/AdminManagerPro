<template>
  <div class="roleView">
    <div class="form">
      <div class="name">
        <span>角色名称</span>
        <el-input v-model="Pages.InputRoleName" class="w-50 m-2" placeholder="请输入角色名称" :suffix-icon="Search" />
      </div>
      <el-button type="primary" :icon="Search" class="form-btn" @click="getPageInfoByInput">搜索</el-button>

      <el-button class="form-btn" plain @click="reGetPageInfo">重置</el-button>
    </div>

    <div class="form-sec">
      <el-button class="form-btn" type="primary" :icon="Plus" @click="dialogAddVisible = true">新增</el-button>
      <el-button class="form-btn" type="danger" :icon="Remove">批量删除</el-button>
    </div>

    <div class="form-table">
      <el-table :data="tableData" :border="true" @current-change="TableCurrentChange" ref="singleTableRef"
        :header-cell-style="{ background: '#F5F7FA' }" style="width: 98%;margin-left: 10px;height: 67vh;">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column prop="id" label="角色ID" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column prop="role" label="唯一标识" />
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <!-- 通过插槽scope获取当前行的数据，scope.row.id表示获取当前行的角色id -->
            <el-button size="small" @click="getRoleMenuInfo(scope.row.id)" type="info" :icon="Menu"
              plain>菜单管理</el-button>
            <el-button size="small" @click="" type="warning" plain>编辑</el-button>
            <el-button size="small" type="danger" @click="">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="pager">
      <el-pagination small background layout="total, sizes, prev, pager, next, jumper" :page-size="Pages.pageSize"
        :page-sizes="[5, 10, 20, 30]" :current-page="Pages.pageNum" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" :total="total" class="mt-4" />
    </div>

    <!-- 菜单管理的对话框 -->
    <div class="dialog-menu">
      <el-dialog v-model="dialogMenuVisible" title="菜单管理">
        <el-tree :props="props" ref="treeRef" :data="tree" show-checkbox node-key="id" @check="handleNodeClick" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogMenuVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleNodeConfirm(currentRow.id)">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <!-- 新增角色的对话框 -->
    <div class="dialog-add">
      <el-dialog v-model="dialogAddVisible" title="新增角色信息">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
          <el-row :gutter="10">
            <el-col :span="20" :offset="0">
              <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
                <!-- 只能允许输入英文和数字 -->
                <el-input v-model="form.name" oninput="value=value.replace(/[^\w_]/g,'')" autocomplete="off" />
              </el-form-item>
            </el-col>

            <el-col :span="20" :offset="0">
              <el-form-item label="角色描述" :label-width="formLabelWidth" prop="description">
                <el-input v-model="form.description" autocomplete="off" />
              </el-form-item>
            </el-col>

            <el-col :span="20" :offset="0">
              <el-form-item label="角色唯一标识" :label-width="formLabelWidth" prop="role">
                <el-input v-model="form.role" autocomplete="off" disabled />
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue'
import { ElMessage, ElTable, ElTree, FormRules, FormInstance } from 'element-plus'
import { Search, Menu, Plus, Remove, } from '@element-plus/icons-vue'
import { getRolePage, roleMenu, getRoleMenu, getRoleMenuByUserId, addOrUpdateRole, getMenus } from '@/utils/api';
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
  pageNum: 1,
  pageSize: 10,
  InputRoleName: '',
})

interface Tree {
  label: string
  id: number
  children?: Tree[]
  $treeNodeId?: number
  disabled?: boolean
}

const props = {
  label: 'label',
  children: 'children',
  disabled: 'disabled',
}

// 表单规律限制
const ruleFormRef = ref<FormInstance>()

// 传入的角色id
const currentRow = ref({
  id: 100
})

// 传入的菜单
const menuArray: any = ref([])

// 传入半选中的菜单
const menuHalfArray: any = ref([])

// 传入的菜单id数组
const menuArrayIds: any = ref([])

// 传入的菜单树
const tree : Tree[] = []

// const data: Tree[] = [
//   {
//     label: '主控台',
//     id: 1,
//     disabled: true,
//   },
//   {
//     label: '系统管理',
//     id: 2,
//     children: [
//       {
//         label: '角色管理',
//         id: 3
//       },
//       {
//         label: '用户管理',
//         id: 4
//       },
//       {
//         label: '菜单管理',
//         id: 5
//       },
//       {
//         label: '文件管理',
//         id: 6
//       },
//     ],
//   },
//   {
//     label: '个人信息',
//     id: 7,
//     disabled: true,
//   },
//   {
//     label: '个人事务管理',
//     id: 8,
//     children: [
//       {
//         label: '代办事项管理',
//         id: 9
//       },
//     ],
//   },
// ]

// 当前角色已有的菜单权限ID
const currentRoleMenu = ref()

// 菜单管理可视化
const dialogMenuVisible = ref(false)

// 新增菜单可视化
const dialogAddVisible = ref(false)

// 表单长度
const formLabelWidth = '140px'

// 新增对话框表格变量，这里面的变量名要和后端数据库表中的一致
const form : any = reactive({
  name : '',
  description : '',
  role : ''
})

// 对角色唯一标识进行计算
form.role = computed(() =>{
  return 'ROLE_' + form.name.toUpperCase()
})

// 表单校验
const rules = reactive<FormRules>({
  name : [
    { required: true, message: "请输入角色名称", trigger: "blur" },
  ],
  description : [
    { required: true, message: "请输入角色描述", trigger: "blur" },
  ],
})

// 获取分页信息
function getRolePageInfo(pageNum: number, pageSize: number, name: string) {
  getRolePage(pageNum, pageSize, name).then(res => {
    if (res.code === '200') {
      tableData.value = res.data.records
      total.value = res.data.total
      // console.log(res)
    }
  }).catch((err) => {
    console.log('获取数据报错', err)
  })
}

// 分页操作触发函数
// 通过输入的信息获取分页信息，搜索
function getPageInfoByInput() {
  getRolePageInfo(Pages.pageNum, Pages.pageSize, Pages.InputRoleName)
}

// 重置
function reGetPageInfo() {
  // 页数重新定位到第一页
  Pages.pageNum = 1,
    Pages.pageSize = 10,
    Pages.InputRoleName = ''
  getPageInfoByInput()
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
function TableCurrentChange(val: any) {
  // 这样给reactive赋值可以保证页面会重新渲染
  currentRow.value = val
  // console.log('currentRow',currentRow.value.id)
  // currentRow  = val
}

// 点击菜单管理多选框
const handleNodeClick = (nodeObj: any, SelectedObj: any) => {
  // console.log(SelectedObj.checkedNodes)
  if (SelectedObj.checkedNodes) {
    menuArray.value = SelectedObj.checkedNodes
    // Object.assign(menuArray , SelectedObj.checkedNodes)
    // console.log('menuArray',menuArray)
  }
  // 半选中菜单赋值
  if (SelectedObj.halfCheckedNodes) {
    menuHalfArray.value = SelectedObj.halfCheckedNodes
  }
}

// 菜单管理确认
function handleNodeConfirm(roleId: number) {
  // 加入选入的id
  menuArray.value.forEach((element: any) => {
    if (menuArrayIds.value.indexOf(element.id) === -1) {
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
  roleMenu(roleId, menuArrayIds.value).then(res => {
    if (res.code === '200') {
      console.log('分配角色菜单权限成功', res)
      ElMessage({
        message: '分配角色菜单权限成功',
        type: 'success',
      })
      getRoleMenuByUserId(roleId).then(res2 => {
        if (res2.code === '200') {
          ElMessage({
            message: '刷新页面重新分配权限',
            type: 'success',
          })
          state.changeCurrentMenuInfo(Object.values(res2.data))
          // 先从本地存储删除currentMenuInfo
          localStorage.removeItem("currentMenuInfo")
          // 在加入
          localStorage.setItem("currentMenuInfo", JSON.stringify(res2.data))
          // console.log('RoleView中的',state.currentMenuInfo)
          // 重新加载页面
          router.go(0)
        }
      })
    }
  }).catch(err => {
    console.log(err)
  })
  // 清空数据
  // setTimeout(() => {
  //   menuArrayIds.value = []
  // }, 500);
  dialogMenuVisible.value = false
}

// 获取角色有的权限id
async function getRoleMenuInfo(roleId: number) {
  dialogMenuVisible.value = true
  await getRoleMenu(roleId).then(res => {
    if (res.code === '200') {
      currentRoleMenu.value = res.data
      handleSetNodes(currentRoleMenu)
    }
  })
}

// 给当前角色现有的菜单权限打个勾
const handleSetNodes = (menuIds: any) => {
  const nodes: any = ref([])
  menuIds.value.forEach((element: any) => {
    const node: any = {
      id: element
    }
    nodes.value.push(node)
  });
  // console.log(nodes)
  treeRef.value!.setCheckedNodes(nodes.value, false)
}

// 新增角色数据
async function handleAdd(formData : any , formEl?: FormInstance | undefined){
    // 校验表单
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        addOrUpdateRole(formData).then((res) =>{
          if(res.code === '200'){
            ElMessage({
              message: '新增角色成功',
              type: 'success',
            })
            reGetPageInfo()
            // 清空form数据
            form.name = '',
            form.description = '',
            form.role = '',
            dialogAddVisible.value = false
            // loading.value = !loading.value
          }
        }).catch((err) =>{
            console.log("新增失败：",err)
            ElMessage({
            message: '新增失败',
            type: 'error',
          })
        })
      } else {
        console.log('error submit!', fields)
      }
    })
}

// 获取所有菜单信息
const getAllMenu = () =>{
  getMenus().then((res) =>{
    console.log("获取所有菜单信息" , res)
    if(res.code === '200'){
      // 对父亲路由进行处理
      res.data.parent.forEach((el : any) => {
        // 把传过来的数据用一个中间树节点temp进行渲染
        let temp : Tree = {
          label : el.name ,
          id : el.id,
          children : [],
          disabled: false
        }
        if(el.id == 2 || el.id == 7){
          temp.disabled = true
        }
        // 渲染后推进parent树中
        tree.push(temp)
      });

      // 再对子路由进行处理
      res.data.children.forEach((el : any) => {
        // 把传过来的数据用一个中间树节点childtemp进行渲染
        let childtemp : Tree = {
          label : el.name,
          id : el.id
        }
        // 再遍历一次父节点，找出子节点中pid和父节点id相同的父节点出来
        tree.forEach((pel : any) =>{
          if(pel.id == el.pid){
            // 让这个父节点把字节点推进去
            pel.children.push(childtemp)
          }
        })
      });

      console.log("树形控件",tree)
    }
  })
}

onMounted(() => {
  // 调用获取分页信息函数
  getRolePageInfo(Pages.pageNum, Pages.pageSize, Pages.InputRoleName)
  // 获取所有菜单信息
  getAllMenu()
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

.pager {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
</style>