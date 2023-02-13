<template>
    <div class="shop">
        <div class="shop-top">
            <div class="tab">
                <div>筛选</div>
                <div v-for="(item, index) in filter" :key="index" :class="{'active' : (item.active == currentFilter)}" @click="toggleActivity(item.active)" >{{ item.name }}</div>
            </div>
        </div>

        <div class="goods">
            <div class="goods-item" v-for="(item, index) in goods" :key="index" >
                <div class="cover">
                    <el-image style="width: 100%; height: 100%" :src="item.cover"  lazy></el-image>
                </div>
                <div class="title">
                    {{ item.description }}
                </div>
                <div class="price">
                    ¥{{ item.price }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref , onMounted } from 'vue'
import { getGoodsPage } from '@/utils/api'

// 页码和每页Goods数量form:
const Pages = reactive({
  pageNum : 1,
  pageSize : 10,
  InputGoodsName : '',
})

// 商品
const goods = ref([
    {
        id : 1111,
        name : '',
        description : '',
        price : 11111,
        num : 2222,
        cover : '',
        data : '2023-01-01'
    }
])

// 筛选
const filter = ref(
    [
        {
            name : '综合',
            active : 'all'
        },
        {
            name : '销量',
            active : 'sell'
        },
        {
            name : '价格',
            active : 'price'
        }
    ]
)
// 当前正在激活的选项
const currentFilter = ref('all')

function toggleActivity(val : string){
    currentFilter.value = val
}

onMounted(() =>{
    // 获取商品分页信息
    getGoodsPage(Pages.pageNum , Pages.pageSize , Pages.InputGoodsName).then((res) =>{
        goods.value = res.data.records
    })
})

</script>

<style lang="less" scoped>
.shop{
    display: flex;
    flex-direction: column;

    .shop-top{
        padding: 20px;
        background-color: #fff;
        overflow: hidden;

        .tab{
            width: 1161px;
            min-height: 61px;
            border: 1px solid #d8d8d8;
            margin: 0 auto;
            position: relative;
            display: flex;
            font-size: 14px;

            >div{
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px;
                width: 60px;
                cursor: pointer;

                &:first-child{
                    margin: 0px;
                    padding: 20px;
                    background-color: #f4f4f4;
                    cursor: auto;
                }
            }

            .active{
                color: red;
            }
        }
    }

    .goods{
        width: 1188px;
        display: flex;
        flex-wrap: wrap;
        margin: 20px auto;
        padding-left: 30px;
        
        .goods-item{
            width: 272px;
            height: 360px;
            background: #fff;
            margin-right: 24px;
            margin-bottom: 24px;
            float: left;
            border-radius: 2px;
            cursor: pointer;
            box-shadow: 2px 4px 8px rgb(0 0 0 / 10%);
            overflow: hidden;

            .cover{
                height: 272px;
                width: 272px;
                background-size: 100% 100%;
                margin-bottom: 8px;
            }

            .title{
                width: 248px;
                font-size: 16px;
                line-height: 20px;
                margin: 0 auto;
                margin-bottom: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
            }

            .price{
                font-size: 22px;
                color: #fb7299;
                float: left;
                padding-top: 3px;
                line-height: 22px;
                height: 20px;
                padding-left: 12px;
                font-weight: 700;
            }
        }
    }
}


</style>