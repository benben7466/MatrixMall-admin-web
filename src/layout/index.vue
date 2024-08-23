<script setup lang="ts">
import {DeviceEnum} from "@/enums/DeviceEnum";
import { LayoutEnum } from "@/enums/LayoutEnum";
import {useAppStore, useSettingsStore, usePermissionStore} from "@/store";
import defaultSettings from "@/settings";

const appStore = useAppStore();
const settingsStore = useSettingsStore();

const isMobile = computed(() => appStore.device === DeviceEnum.MOBILE);
const isOpenSidebar = computed(() => appStore.sidebar.opened);
const showTagsView = computed(() => settingsStore.tagsView); // 是否显示多标签导航
const layout = computed(() => settingsStore.layout); // 布局模式
const fixedHeader = computed(() => settingsStore.fixedHeader); // 是否固定header

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebar.opened,
  openSidebar: appStore.sidebar.opened,
  mobile: appStore.device === DeviceEnum.MOBILE,
  [`layout-${settingsStore.layout}`]: true,
}));

function handleOutsideClick() {
  appStore.closeSideBar();
}

</script>

<template>
  <div class="wh-full" :class="classObj">
    <!-- 遮罩层 -->
    <div v-if="isMobile && isOpenSidebar" class="wh-full fixed-lt z-999 bg-black bg-opacity-30" @click="handleOutsideClick"></div>

    <!-- 公用侧边栏 -->
    <Sidebar class="sidebar-container" />

    <!-- 主体布局：Mix -->
    <div v-if="layout === LayoutEnum.MIX" class="mix-container">
    </div>

    <!-- 主体布局：Left 和 Top -->
    <div v-else :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!--导航栏-->
        <NavBar v-if="layout === LayoutEnum.LEFT" />
        <!--菜单标签视图-->
        <TagsView v-if="showTagsView" />
      </div>
      <!--主体内容-->
      <AppMain />
      <!--右侧的设置面板-->
      <Settings v-if="defaultSettings.showSettings" />
      <!-- 返回顶部 -->
      <el-backtop target=".main-container">
        <svg-icon icon-class="backtop" size="24px" />
      </el-backtop>
    </div>

  </div>
</template>

<style lang="scss" scoped>
/*布局-Left*/
.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: $sidebar-width;
  background-color: $menu-background;
  transition: width 0.3s;

  :deep(.el-menu) {
    border: none;
  }
}

.main-container {
  position: relative;
  height: 100%;
  margin-left: $sidebar-width;
  overflow-y: auto;
  transition: margin-left 0.3s;

  .fixed-header {
    position: sticky;
    top: 0;
    z-index: 9;
    transition: width 0.3s;
  }
}

/*布局-Top*/
.layout-top {
  .sidebar-container {
    display: flex;
    position: sticky;
    z-index: 999;
    width: 100% !important;
    height: $navbar-height;

    :deep(.el-scrollbar) {
      flex: 1;
      height: $navbar-height;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title),
    :deep(.el-menu--horizontal) {
      height: $navbar-height;
      line-height: $navbar-height;
    }

    :deep(.el-menu--collapse) {
      width: 100%;
    }
  }
  .main-container {
    height: calc(100vh - $navbar-height);
    margin-left: 0;
  }
}

/*隐藏侧边栏*/
.layout-left.hideSidebar {
  .sidebar-container {
    width: $sidebar-width-collapsed !important;
  }

  .main-container {
    margin-left: $sidebar-width-collapsed;
  }
}

</style>