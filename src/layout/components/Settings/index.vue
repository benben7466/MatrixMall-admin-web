<script setup lang="ts">
import {useSettingsStore, usePermissionStore, useAppStore} from "@/store";
import { ThemeEnum } from "@/enums/ThemeEnum";
import { LayoutEnum } from "@/enums/LayoutEnum";

const settingsStore = useSettingsStore();
const settingsVisible = computed({
  get() {
    return settingsStore.settingsVisible;
  },
  set() {
    settingsStore.settingsVisible = false;
  },
});

//切换主题
const isDark = ref<boolean>(settingsStore.theme === ThemeEnum.DARK);
const changeTheme = (val: any) => {
  isDark.value = val;
  settingsStore.changeTheme(isDark.value ? ThemeEnum.DARK : ThemeEnum.LIGHT);
};

//切换主题颜色
function changeThemeColor(color: string) {
  settingsStore.changeThemeColor(color);
}

//切换布局
function changeLayout(layout: string) {
  settingsStore.changeLayout(layout);
  if (layout === LayoutEnum.MIX) {
    route.name && againActiveTop(route.name as string);
  }
}

</script>

<template>
  <el-drawer
      v-model="settingsVisible"
      size="280"
      :title="$t('settings.project')"
  >
    <el-divider>{{ $t("settings.theme") }}</el-divider>

    <!-- 主题切换 -->
    <div class="flex-center">
      <el-switch
          v-model="isDark"
          active-icon="Moon"
          inactive-icon="Sunny"
          @change="changeTheme"
      />
    </div>

    <el-divider>{{ $t("settings.interface") }}</el-divider>

    <!--主题颜色-->
    <div class="setting-item">
      <span class="text-xs">{{ $t("settings.themeColor") }}</span>
      <ThemeColorPicker
          v-model="settingsStore.themeColor"
          @update:model-value="changeThemeColor"
      />
    </div>

    <!--开启tagsView-->
    <div class="setting-item">
      <span class="text-xs">{{ $t("settings.tagsView") }}</span>
      <el-switch v-model="settingsStore.tagsView" />
    </div>

    <!--固定Header-->
    <div class="setting-item">
      <span class="text-xs">{{ $t("settings.fixedHeader") }}</span>
      <el-switch v-model="settingsStore.fixedHeader" />
    </div>

    <!--侧边栏Logo-->
    <div class="setting-item">
      <span class="text-xs">{{ $t("settings.sidebarLogo") }}</span>
      <el-switch v-model="settingsStore.sidebarLogo" />
    </div>

    <el-divider>{{ $t("settings.navigation") }}</el-divider>

    <!--导航设置-->
    <LayoutSelect
        v-model="settingsStore.layout"
        @update:model-value="changeLayout"
    />

  </el-drawer>
</template>

<style scoped lang="scss">
.setting-item {
  @apply py-1 flex-x-between;
}
</style>