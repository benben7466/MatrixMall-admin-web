<script setup lang="ts">
import { useSettingsStore, usePermissionStore, useAppStore } from "@/store";
import { LayoutEnum } from "@/enums/LayoutEnum";

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const sidebarHasLogo = computed(() => settingsStore.sidebarLogo);
const layout = computed(() => settingsStore.layout);
const permissionStore = usePermissionStore();

</script>

<template>
  <div :class="{ 'has-logo': sidebarHasLogo }">

    <!--布局：Mix-->
    <div v-if="layout == LayoutEnum.MIX" class="flex w-full">

    </div>

    <!--布局：Left|Top-->
    <template v-else>
      <SidebarLogo v-if="sidebarHasLogo" :collapse="!appStore.sidebar.opened" />
      <el-scrollbar>
        <SidebarMenu :menu-list="permissionStore.routes" base-path="" />
      </el-scrollbar>
    </template>

  </div>
</template>

<style lang="scss" scoped>
.has-logo {
  .el-scrollbar {
    height: calc(100vh - $navbar-height);
  }
}
</style>