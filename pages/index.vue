<script setup lang='ts'>
const nums = ref()
/** 判断是否和 0 相邻，交换位置  */
function swap(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const temp = nums.value[p1.y][p1.x]
  nums.value[p1.y][p1.x] = nums.value[p2.y][p2.x]
  nums.value[p2.y][p2.x] = temp
}
// Fisher-Yates 洗牌算法打乱顺序
function upsetOrder(data: number[]) {
  for (let i = 0; i < data.length; ++i) {
    const j = Math.floor(Math.random() * (data.length - i)) + i;
    [data[i], data[j]] = [data[j], data[i]]
  }
  return data
}
function handleClick(x: number, y: number) {
  const zeroy = nums.value.findIndex((row: number[]) => row.includes(0))
  const zerox = nums.value[zeroy].findIndex((num: number) => num === 0)
  if (zerox === x && (y === zeroy - 1 || y === zeroy + 1)) {
    // 上下交换
    swap({ x, y }, { x: zerox, y: zeroy })
  }
  else if (zeroy === y && (x === zerox - 1 || x === zerox + 1)) {
    // 左右交换
    swap({ x, y }, { x: zerox, y: zeroy })
  }
  /** 判断是否成功通关 */
  if (nums.value.flat().slice(0, -1).every((num: number, idx: number) => num === idx + 1)) {
    setTimeout(() => {
      // eslint-disable-next-line no-alert
      alert('恭喜你通关了！')
    }, 100)
  }
}
/** 将一维数组转二位数组 */
function toTwoDimensionalArray(arr: number[]) {
  const result = []
  for (let i = 0; i < arr.length; i += 3)
    result.push(arr.slice(i, i + 3))
  return result
}
onMounted(() => {
  nums.value = toTwoDimensionalArray(upsetOrder(Array.from({ length: 9 }, (_, i) => i)))
})
</script>

<template>
  <div class="bg-gray/10 p-4 space-y-4">
    <div v-for="(row, idx) in nums" :key="idx" class="grid grid-cols-3 gap-4">
      <div
        v-for="(num, i) in row" :key="i"
        class="wh-25 flex-center rounded-md text-2xl font-semibold text-white"
        :class="num ? 'bg-green' : 'bg-gray/20'" @click="handleClick(i, idx)"
      >
        {{ num ? num : '' }}
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
</style>
