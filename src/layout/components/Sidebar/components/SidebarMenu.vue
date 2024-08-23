<script setup lang="ts">
import { isExternal } from "@/utils";
import path from "path-browserify";
import { LayoutEnum } from "@/enums/LayoutEnum";
import { useSettingsStore, useAppStore } from "@/store";
import variables from "@/styles/variables.module.scss";

const settingsStore = useSettingsStore();
const appStore = useAppStore();
const currentRoute = useRoute();
const menuIndexArray = ref<string[]>([]);

const props = defineProps({
  menuList: {
    type: Array<any>,
    required: true,
    default: () => {
      return [];
    },
  },
  basePath: {
    type: String,
    required: true,
  },
});

const mode = computed(() => {
  return settingsStore.layout === LayoutEnum.TOP ? "horizontal" : "vertical";
});

const handleOpen = (index: string, keyPath: string[]) => {
  menuIndexArray.value.push(index);
};

const handleClose = (index: string) => {
  menuIndexArray.value = menuIndexArray.value.filter((item) => item !== index);
};

//解析路径
function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  const fullPath = path.resolve(props.basePath, routePath);//完整绝对路径：一级菜单路径
  return fullPath;
}

</script>

<template>
  <el-menu
      ref="menuRef"
      :default-active="currentRoute.path"
      :collapse="!appStore.sidebar.opened"
      :mode="mode"
      :unique-opened="false"
      :collapse-transition="false"
      :background-color="variables['menu-background']"
      :text-color="variables['menu-text']"
      :active-text-color="variables['menu-active-text']"
      @open="handleOpen"
      @close="handleClose"
  >
    <SidebarMenuItem
        v-for="route in menuList"
        :key="route.path"
        :item="route"
        :base-path="resolvePath(route.path)"
    />
  </el-menu>
</template>

<style scoped>

</style>