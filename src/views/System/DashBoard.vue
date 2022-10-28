<template>
    <div class="dashboard">
        <div class="number-wrap">
            <el-row :gutter="5">
                <el-col :span="6" :offset="0">
                    <div class="num-data">
                        <el-card class="box-card" :body-style="{ padding: '15px', }">
                            <template #header>
                                <div class="card-header">
                                    <span>今天访问量</span>
                                </div>
                            </template>
                            <div class="num-data-wrap">
                                <div style="padding : 5px 0 ;">
                                    <span>+</span>
                                    <countTo :startVal='0' :endVal='10000' :duration='2200' style="font-size: 1.5rem; line-height: 2rem;"></countTo>
                                    <!-- <span style="font-size: 1.5rem; line-height: 2rem;">1000</span> -->
                                </div>
                                <div style="font-size: 0.9rem;"> 较昨日新增：<countTo :startVal='0' :endVal='2200' :duration='2200' /></div>
                                <div style="font-size: 0.9rem;"> 较上周新增：<countTo :startVal='0' :endVal='2200' :duration='2200' /></div>
                                <el-divider style="margin: 10px 0;" />
                                <div class="num-data-wrap-down">
                                    <span>总访问量</span>
                                    <span><countTo :startVal='0' :endVal='150' :duration='2200' />万+</span>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>

                <el-col :span="6" :offset="0">
                    <div class="num-data">
                        <el-card class="box-card" :body-style="{ padding: '15px' }">
                            <template #header>
                                <div class="card-header">
                                    <span>新增用户</span>
                                </div>
                            </template>
                            <div class="num-data-wrap">
                                <div style="padding : 5px 0 ;">
                                    <span>+</span>
                                    <countTo :startVal='0' :endVal='7777' :duration='2200' style="font-size: 1.5rem; line-height: 2rem;" />
                                </div>
                                <div style="font-size: 0.9rem;"> 较昨日新增：<countTo :startVal='0' :endVal='888' :duration='2200' /></div>
                                <div style="font-size: 0.9rem;"> 较上周新增：<countTo :startVal='0' :endVal='1234' :duration='2200' /></div>
                                <el-divider style="margin: 10px 0;" />
                                <div class="num-data-wrap-down">
                                    <span>总用户量</span>
                                    <span>200万+</span>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>

                <el-col :span="6" :offset="0">
                    <div class="num-data">
                        <el-card class="box-card" :body-style="{ padding: '15px' }">
                            <template #header>
                                <div class="card-header">
                                    <span>当月活跃用户量</span>
                                </div>
                            </template>
                            <div class="num-data-wrap">
                                <div style="padding : 5px 0 ;">
                                    <span>+</span>
                                    <countTo :startVal='0' :endVal='1775143' :duration='2200' style="font-size: 1.5rem; line-height: 2rem;" />
                                </div>
                                <div style="font-size: 0.9rem;"> 较昨日新增：<countTo :startVal='0' :endVal='252252' :duration='2200'/></div>
                                <div style="font-size: 0.9rem;"> 较上周新增：<countTo :startVal='0' :endVal='842842' :duration='2200'/></div>
                                <el-divider style="margin: 10px 0;" />
                                <div class="num-data-wrap-down">
                                    <span>活跃度</span>
                                    <span><countTo :startVal='0' :endVal='88' :duration='2200'/>%</span>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>

                <el-col :span="6" :offset="0">
                    <div class="num-data">
                        <el-card class="box-card" :body-style="{ padding: '15px' }">
                            <template #header>
                                <div class="card-header">
                                    <span>当月销售额</span>
                                </div>
                            </template>
                            <div class="num-data-wrap">
                                <div style="padding : 5px 0 ;">
                                    <span>￥</span>
                                    <countTo :startVal='0' :endVal='999999' :duration='2200' style="font-size: 1.5rem; line-height: 2rem;"/>
                                </div>
                                <div style="font-size: 0.9rem;"> 较昨日新增：<countTo :startVal='0' :endVal='234234' :duration='2200'/></div>
                                <div style="font-size: 0.9rem;"> 较上周新增：<countTo :startVal='0' :endVal='66666' :duration='2200'/></div>
                                <el-divider style="margin: 10px 0;" />
                                <div class="num-data-wrap-down">
                                    <span>累计销售额</span>
                                    <span><countTo :startVal='0' :endVal='2000' :duration='2200'/>万+</span>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 动态图 -->
        <div class="bar-wrap">
            <el-row>
                <el-col :span="24" :offset="0">
                    <div id="echarts-main" style="height: 55vh;"></div>
                </el-col>
            </el-row>
        </div>

        <!-- 饼图 -->
        <div class="pie-wrap">
            <el-row :gutter="5">
                <el-col :span="6" class="pie-item" :offset="0">
                    <div class="num-data">
                        <el-card class="box-card" :body-style="{ padding: '10px', }">
                            <template #header>
                                <div class="card-header">
                                    <span>今天访问量</span>
                                </div>
                            </template>
                            <div id="echarts-pie" style="height: 40vh;"></div>
                        </el-card>
                    </div>
                </el-col>

                <el-col :span="6" class="pie-item" :offset="0">
                    <div class="num-data">
                        <el-card class="box-card" :body-style="{ padding: '10px', }">
                            <template #header>
                                <div class="card-header">
                                    <span>本周营收</span>
                                </div>
                            </template>
                            <div id="echarts-negative" style="height: 40vh;"></div>
                        </el-card>
                    </div>
                </el-col>

                <el-col :span="6" class="pie-item" :offset="0">
                    <div class="num-data">
                        <el-card class="box-card" :body-style="{ padding: '10px', }">
                            <template #header>
                                <div class="card-header">
                                    <span>本周曝光度</span>
                                </div>
                            </template>
                            <div id="echarts-area" style="height: 40vh;"></div>
                        </el-card>
                    </div>
                </el-col>

                <el-col :span="6" class="pie-item" :offset="0">
                    <div class="num-data">
                        <el-card class="box-card" :body-style="{ padding: '10px', }">
                            <template #header>
                                <div class="card-header">
                                    <span>本周客流量</span>
                                </div>
                            </template>
                            <div id="echarts-line" style="height: 40vh;"></div>
                        </el-card>
                    </div>
                </el-col>

            </el-row>
        </div>

    </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue'
import countTo from '@/components/CountTo';

onMounted(() => {
    var app: any = {};
    type EChartsOption = echarts.EChartsOption

    // 动态数据图
    var chartDom = document.getElementById('echarts-main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    const categories = (function () {
        let now = new Date();
        let res = [];
        let len = 10;
        while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(+now - 2000);
        }
        return res;
    })();
    const categories2 = (function () {
        let res = [];
        let len = 10;
        while (len--) {
            res.push(10 - len - 1);
        }
        return res;
    })();
    const data: number[] = (function () {
        let res = [111,222,333,444,555,666,777,888,999,1100];
        let len = 10;
        // while (len--) {
        //     res.push(Math.round(Math.random() * 1000));
        // }
        return res;
    })();
    const data2: number[] = (function () {
        let res = [];
        let len = 0;
        while (len < 10) {
            res.push(+(Math.random() * 10 + 5).toFixed(1));
            len++;
        }
        return res;
    })();

    option = {
        title: {
            text: '半年销售额分析图（数据为模拟，只为演示效果）',
            textStyle: {
                fontSize: 12,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {},
        toolbox: {
            show: false,
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: categories
            },
            {
                type: 'category',
                boundaryGap: true,
                data: categories2
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: '活跃度',
                max: 100,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            {
                type: 'value',
                scale: true,
                name: '数量',
                max: 1200,
                min: 0,
                boundaryGap: [0.2, 0.2]
            }
        ],
        series: [
            {
                name: '用户数量',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data
            },
            {
                name: '活跃用户',
                type: 'line',
                data: data2
            },
        ]
    };

    app.count = 11;
    setInterval(function () {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

        data.shift();
        data.push(Math.round(Math.random() * 1000));
        data2.shift();
        data2.push(+(Math.random() * 10 + 5).toFixed(1));

        categories.shift();
        categories.push(axisData);
        categories2.shift();
        categories2.push(app.count++);

        myChart.setOption<echarts.EChartsOption>({
            xAxis: [
                {
                    data: categories
                },
                {
                    data: categories2
                }
            ],
            series: [
                {
                    data: data
                },
                {
                    data: data2
                }
            ]
        });
    }, 2100);

    // 饼状
    var chartDom2 = document.getElementById('echarts-pie')!;
    var myChart2 = echarts.init(chartDom2);
    var option2: EChartsOption;

    option2 = {
        title: {
            text: '',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            top: 'top',
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }

    // 正负条形图
    var chartDom3 = document.getElementById('echarts-negative')!;
    var myChart3 = echarts.init(chartDom3);
    var option3: EChartsOption;

    option3 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Profit', 'Income']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        series: [
            {
                name: 'Profit',
                type: 'bar',
                label: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    focus: 'series'
                },
                data: [200, 170, 240, 244, 200, 220, 210]
            },
            {
                name: 'Income',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 341, 374, 390, 450, 420]
            },
        ]
    };

    // 渐变堆叠面积图
    var chartDom4 = document.getElementById('echarts-area')!;
    var myChart4 = echarts.init(chartDom4);
    var option4: EChartsOption;

    option4 = {
        color: ['#80FFA5', '#00DDFF'],
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['Line 1', 'Line 2']
        },
        toolbox: {
            show: false
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(128, 255, 165)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(1, 191, 236)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
            },
            {
                name: 'Line 2',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                    width: 0
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(0, 221, 255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(77, 119, 255)'
                        }
                    ])
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310]
            },
        ]
    }

    // 折线图
    var chartDom5 = document.getElementById('echarts-line')!;
    var myChart5 = echarts.init(chartDom5);
    var option5: EChartsOption;

    option5 = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }
        ]
    };


    option && myChart.setOption(option);
    option2 && myChart2.setOption(option2);
    option3 && myChart3.setOption(option3);
    option4 && myChart4.setOption(option4);
    option5 && myChart5.setOption(option5);

})

</script>

<style lang="less">
.dashboard {
    overflow-x: hidden;

    .num-data {
        margin-bottom: 5px;

        span {
            font-size: 0.9rem;
        }

        .el-card__header {
            padding: 10px;

        }

        .num-data-wrap-down {
            display: flex;
            justify-content: space-between;
        }
    }

    .bar-wrap {
        padding: 20px;
        background-color: #fff;
    }

    .pie-wrap {
        margin: 5px 0;

    }

}
</style>