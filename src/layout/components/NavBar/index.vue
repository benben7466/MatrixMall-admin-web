<script setup lang="ts">
import { useAppStore } from "@/store";

const appStore = useAppStore();

function toggleSideBar() {
  appStore.toggleSidebar();
}
</script>

<template>
  <div class="navbar-container">
    <div class="flex">
      <!--菜单显示与隐藏的切换-->
      <hamburger :is-active="appStore.sidebar.opened" @toggle-click="toggleSideBar"/>

      <!-- 导航栏-面包屑 -->
      <breadcrumb />

    </div>

    <!-- 导航栏右侧 -->
    <NavbarAction />

  </div>
</template>

<style lang="scss" scoped>
.navbar-container {
  @apply flex-x-between;

  height: $navbar-height;
  background: var(--el-bg-color);
}
</style>