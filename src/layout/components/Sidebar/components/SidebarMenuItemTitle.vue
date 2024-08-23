<script setup lang="ts">
import { translateRouteTitle } from "@/utils/i18n";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  path: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <!-- icon图标组件 -->
  <el-icon v-if="icon && icon.startsWith('el-icon')" class="sub-el-icon">
    <component :is="icon.replace('el-icon-', '')" />
  </el-icon>
  <svg-icon v-else-if="icon" :icon-class="icon" />
  <svg-icon v-else icon-class="menu" />

  <!-- 菜单标题 -->
  <span v-if="title" class="ml-1">{{ translateRouteTitle(title, path) }}</span>
</template>

<style lang="scss" scoped>
.sub-el-icon {
  width: 14px !important;
  margin-right: 0 !important;
  color: currentcolor;
}

/*隐藏侧边栏时，控制图标Icon等*/
.hideSidebar {
  .el-sub-menu,
  .el-menu-item {
    .svg-icon,
    .sub-el-icon {
      margin-left: 20px;
    }
  }
}
</style>