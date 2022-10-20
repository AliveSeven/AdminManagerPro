<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import { ref, reactive, toRef } from 'vue'

const B = reactive({
  name: 'Alive2',
  age: 22,
  hobby:[
    {
      type : "唱"
    },
    {
      type : "跳"
    },
    {
      type : "rap"
    },
    {
      type : "篮球"
    }
  ]
})

console.log('B的ref数据:', B)

// reactive定义的响应式数据是“深层次的”。
// 下面的赋值不会影响上面的结果

B.name = 'Alive3'
B.age = 99
B.hobby[3].type = "ctrl"

console.log('改变了B后：',B)

// 第二个参数代表对name属性创建ref; 对所有属性创建ref
// 使用toRefs(),结果对象的每个 property 都是指向原始对象相应 property 的 ref。
// 当于对象的浅拷贝，拷贝的是地址
const infoName = toRef(B, 'name')

infoName.value = 'Mary'

console.log('name:', infoName.value, B.name) // name Mary Mary
</script>
