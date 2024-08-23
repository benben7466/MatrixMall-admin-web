<script setup lang="ts">
import DictAPI from "@/api/dict";

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue"]);
const options: Ref<OptionType[]> = ref([]);
const selectedValue = ref<string | number | undefined>();

onBeforeMount(() => {
  DictAPI.getOptions(props.code).then((data) => {
    options.value = data;
  });
});

watch([options, () => props.modelValue], ([newOptions, newModelValue]) => {
  if (newOptions.length === 0) {
    // 下拉数据源加载未完成不回显
    return;
  }
  if (newModelValue == undefined) {
    selectedValue.value = undefined;
    return;
  }
  if (typeof newOptions[0].value === "number") {
    selectedValue.value = Number(newModelValue);
  } else if (typeof newOptions[0].value === "string") {
    selectedValue.value = String(newModelValue);
  } else {
    selectedValue.value = newModelValue;
  }
});

function handleChange(val?: string | number | undefined) {
  emits("update:modelValue", val);
}

</script>

<template>
  <el-select
      v-model="selectedValue"
      :placeholder="placeholder"
      :disabled="disabled"
      clearable
      @change="handleChange"
  >
    <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
    />
  </el-select>
</template>