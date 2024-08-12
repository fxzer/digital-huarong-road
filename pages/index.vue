<script setup lang='ts'>
const mapSize = 3
const nums = ref()
/** 判断是否和 0 相邻，交换位置  */
function swap(zeroIdx: number, clickIdx: number) {
  const temp = nums.value[zeroIdx]
  nums.value[zeroIdx] = nums.value[clickIdx]
  nums.value[clickIdx] = temp
}
// Fisher-Yates 洗牌算法打乱顺序
function upsetOrder(data: number[]) {
  for (let i = 0; i < data.length; ++i) {
    const j = Math.floor(Math.random() * (data.length - i)) + i;
    [data[i], data[j]] = [data[j], data[i]]
  }
  return data
}

onMounted(() => {
  nums.value = upsetOrder(Array.from({ length: 9 }, (_, i) => i))
  // nums.value = [1, 2, 3, 4, 5, 6, 7, 8, 0]
})

const zeroIdx = computed(() => nums.value.findIndex((num: number) => num === 0))

function getPosWithIdx(idx: number) {
  const x = (100 + 16) * (idx % mapSize)
  const y = (100 + 16) * Math.floor(idx / mapSize)
  return { x, y }
}
function idxStyle(idx: number) {
  const { x, y } = getPosWithIdx(idx)
  return {
    top: `${y + 16}px`,
    left: `${x + 16}px`,
  }
}
function handleClick(i: number) {
  const zeroPos = getPosWithIdx(zeroIdx.value)
  const pos = getPosWithIdx(i)
  if (zeroPos.x === pos.x && (pos.y === zeroPos.y - 116 || pos.y === zeroPos.y + 116)) {
    // 上下交换
    swap(zeroIdx.value, i)
  }
  else if (zeroPos.y === pos.y && (pos.x === zeroPos.x - 116 || pos.x === zeroPos.x + 116)) {
    // 左右交换
    swap(zeroIdx.value, i)
  }
  /** 判断是否成功通关 */
  if (nums.value.slice(0, -1).every((num: number, idx: number) => num === idx + 1)) {
    setTimeout(() => {
      // eslint-disable-next-line no-alert
      alert('恭喜你通关了！')
    }, 100)
  }
}
</script>

<template>
  <div class="relative bg-gray/10 p-4">
    <div class="space-y-4">
      <div v-for="x in mapSize" :key="x" tag="div" name="fade" class="grid grid-cols-3 gap-4">
        <div
          v-for="y in mapSize" :key="y"
          class="f wh-25 rounded-md bg-gray/20 shadow-inner"
        />
      </div>
    </div>
    <TransitionGroup v-for="n, i in nums" :key="n" tag="div" name="fade">
      <div
        v-if="n !== 0" :style="idxStyle(i)"
        class="absolute wh-25 flex-center cursor-pointer select-none rounded-md bg-green text-4xl text-white font-semibold"
        @click="handleClick(i)"
      >
        {{ n }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped >
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.01);
}
.fade-leave-active {
  position: absolute;
}
</style>
