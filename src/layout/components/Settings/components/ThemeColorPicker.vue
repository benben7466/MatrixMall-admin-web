<script setup lang="ts">
const props = defineProps({
  modelValue: String,
});

const currentColor = ref(props.modelValue);
// 定义颜色预设
const colorPresets = [
  "#409EFF",
  "#ff4500",
  "#ff8c00",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsva(120, 40, 94)",
];

const emit = defineEmits(["update:modelValue"]);

watch(currentColor, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <el-color-picker
      v-model="currentColor"
      :predefine="colorPresets"
      popper-class="theme-picker-dropdown"
  />
</template>

<style scoped lang="scss">
:deep(.theme-picker-dropdown) {
  z-index: 99999 !important;
}
</style>