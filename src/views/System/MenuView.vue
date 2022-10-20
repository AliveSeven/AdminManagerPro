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
            <el-table :data="tableData" @current-change="" :border="true" ref="singleTableRef" :header-cell-style="{ background : '#F5F7FA'}" style="width: 98%;margin-left: 10px;height: 67vh;">
                <!-- <el-table-column type="selection" width="55" /> -->
                <el-table-column prop="id" label="菜单ID" width="120" />
                <el-table-column prop="name" label="菜单名称" width="200" />
                <el-table-column prop="path" label="菜单地址" width="150" />
                <el-table-column prop="icon" label="菜单图标" width="150" />
                <el-table-column prop="description" label="菜单描述" />
                <el-table-column prop="isHide" label="是否隐藏"  width="120" />
                <el-table-column label="操作" width="250">
                    <template #default="scope">
                        <el-button size="small" @click="" type="info" :icon="Menu" plain>按钮管理</el-button>
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
          :total="10" 
          class="mt-4" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { Search, Menu, Plus, Remove} from '@element-plus/icons-vue'

const tableData: any = ref([{
    id : 100,
    name: 'DashBorad',
    icon: '121',
    description: '212',
    isHide: '否',
}
])

const menuName : any = ref('')

//  {
//     DashBorad : 'DashBorad',
//     System : '系统管理',
//     User : '用户管理',
//     Role : '角色管理',
//     Department : '部门管理'
//   }
function getMenuInfo() {

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