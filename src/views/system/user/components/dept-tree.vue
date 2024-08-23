<script setup lang="ts">
import DeptAPI from "@/api/dept";

const deptName = ref(); // 部门名称
const deptList = ref<OptionType[]>(); // 部门列表
const deptTreeRef = ref(ElTree); // 部门树
const emits = defineEmits(["node-click", "update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: [Number],
    default: undefined,
  },
});
const deptId = useVModel(props, "modelValue", emits);

onBeforeMount(() => {
  DeptAPI.getOptions().then((data) => {
    deptList.value = data;
  });
});

function handleNodeClick(data: { [key: string]: any }) {
  deptId.value = data.value;
  emits("node-click");
}

//部门筛选
function handleFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.label.indexOf(value) !== -1;
}

watchEffect(
    () => {
      deptTreeRef.value.filter(deptName.value);
    },
    {
      flush: "post",
    }
);

</script>

<template>
  <el-card shadow="never">
    <el-input v-model="deptName" placeholder="部门名称" clearable>
      <template #prefix>
        <i-ep-search/>
      </template>
    </el-input>

    <el-tree
        ref="deptTreeRef"
        class="mt-2"
        :data="deptList"
        :props="{ children: 'children', label: 'label', disabled: '' }"
        :expand-on-click-node="false"
        :filter-node-method="handleFilter"
        default-expand-all
        @node-click="handleNodeClick"
    />

  </el-card>
</template>

<style scoped lang="scss">

</style>