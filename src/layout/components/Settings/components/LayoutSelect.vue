<script setup lang="ts">
import { LayoutEnum } from "@/enums/LayoutEnum";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(layout: string) {
  emit("update:modelValue", layout);
}

</script>

<template>
  <div class="flex flex-wrap justify-around w-full h-12">
    <el-tooltip content="左侧模式" placement="bottom">
      <div
          class="layout-item left"
          :class="{ 'is-active': modelValue === LayoutEnum.LEFT }"
          @click="updateValue(LayoutEnum.LEFT)"
      >
        <div></div>
        <div></div>
      </div>
    </el-tooltip>

  </div>
</template>

<style scoped lang="scss">
.layout-item {
  position: relative;
  width: 18%;
  height: 45px;
  overflow: hidden;
  cursor: pointer;
  background: #f0f2f5;
  border-radius: 4px;

  /*左侧模式*/
  &.left div:nth-child(1) {
    width: 30%;
    height: 100%;
    background: #1b2a47;
  }

  &.left div:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    width: 70%;
    height: 30%;
    background: #fff;
    box-shadow: 0 0 1px #888;
  }
}

.layout-item.is-active {
  border: 2px solid var(--el-color-primary);
}
</style>