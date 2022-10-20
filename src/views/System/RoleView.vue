<template>
    <div class="menuView">
        <div class="form">
            <div class="phone">
                <span>菜单名称</span>
                <el-input v-model="menuName" class="w-50 m-2" placeholder="请输入菜单名称" :suffix-icon="Search" />
            </div>
            <el-button type="primary" :icon="Search" class="form-btn" @click="">搜索</el-button>

            <el-button class="form-btn" plain @click="">重置</el-button>
        </div>

        <div class="form-sec">
            <el-button class="form-btn" type="primary" :icon="Plus" @click="">新增</el-button>
            <el-button class="form-btn" type="danger" :icon="Remove">批量删除</el-button>
        </div>

        <div class="form-table">
            <el-table :data="tableData" :border="true" @current-change="" ref="singleTableRef" :header-cell-style="{ background : '#F5F7FA'}" style="width: 98%;margin-left: 10px;height: 67vh;">
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column prop="id" label="角色ID"/>
                <el-table-column prop="name" label="角色名称"  />
                <el-table-column prop="description" label="角色描述"  />
                <el-table-column prop="flag" label="唯一标识"  />
                <el-table-column label="操作" width="250">
                    <template #default="scope">
                        <el-button size="small" @click="dialogMenuVisible = true" type="info" :icon="Menu" plain>菜单管理</el-button>
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
          :page-size="5"
          :page-sizes="[5, 10, 20, 30]"
          :current-page="1"
          @current-change=""
          @size-change=""  
          :total="100" 
          class="mt-4" />
        </div>

        <!-- 菜单管理的对话框 -->
        <div class="dialog-menu">
          <el-dialog v-model="dialogMenuVisible" title="菜单管理">
            <el-tree :props="props" :data="data" show-checkbox @node-click="handleNodeClick"/>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogMenuVisible = false">Cancel</el-button>
                <el-button type="primary" @click=""
                  >Confirm</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { Search, Menu, Plus, Remove, } from '@element-plus/icons-vue'

const tableData: any = ref([{
        id: 100,
        name: '121',
        description: '212',
        flag: '是',
    }
])

interface Tree {
    label: string
    children?: Tree[]
}

const props = {
  label: 'label',
  children: 'children',
}

const data: Tree[] = [
  {
    label: '主控台',
  },
  {
    label: '系统管理',
    children: [
      {
        label: '角色管理',
      },
      {
        label: '用户管理',
      },
      {
        label: '菜单管理',
      },
      {
        label: '文件管理',
      },
    ],
  },
]

// 输入的菜单名
const menuName : any = ref('')
// 菜单管理可视化
const dialogMenuVisible : any = ref(false)

//  {
//     DashBorad : 'DashBorad',
//     System : '系统管理',
//     User : '用户管理',
//     Role : '角色管理',
//     Department : '部门管理'
//   }
function getMenuInfo() {

}

const handleNodeClick = (data: Tree) => {
  console.log(data)
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
.menuView {
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