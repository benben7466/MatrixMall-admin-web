<script setup lang="ts">
import {useAppStore, useTagsViewStore, useUserStore, useSettingsStore,} from "@/store";
import {DeviceEnum} from "@/enums/DeviceEnum";
import defaultSettings from "@/settings";

const userStore = useUserStore();
const appStore = useAppStore();
const tagsViewStore = useTagsViewStore();
const settingStore = useSettingsStore();
const router = useRouter();
const isMobile = computed(() => appStore.device === DeviceEnum.MOBILE);

function handleOpenUserProfile() {
  router.push({ name: "Profile" });
}

function logout() {
  ElMessageBox.confirm("确定退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    lockScroll: false,
  }).then(() => {
    userStore
        .logout()
        .then(() => {
          tagsViewStore.delAllViews();
        })
        .then(() => {
          router.push(`/login?redirect=${route.fullPath}`);
        });
  });
}
</script>

<template>
  <div class="flex">
    <template v-if="!isMobile">
      <!--搜索-->
      <el-tooltip :content="$t('searchMenu.tooltip')" effect="dark" placement="bottom">
        <menu-search/>
      </el-tooltip>

      <!--全屏-->
      <el-tooltip :content="$t('fullScreen.tooltip')" effect="dark" placement="bottom">
        <app-fullscreen/>
      </el-tooltip>

      <!-- 布局大小 -->
      <el-tooltip :content="$t('sizeSelect.tooltip')" effect="dark" placement="bottom">
        <size-select class="nav-action-item"/>
      </el-tooltip>

      <!-- 语言选择 -->
      <el-tooltip :content="$t('langSelect.tooltip')" effect="dark" placement="bottom">
        <lang-select class="nav-action-item"/>
      </el-tooltip>

      <!-- 消息通知 -->
      <el-tooltip :content="$t('messageNotice.tooltip')" effect="dark" placement="bottom">
        <message-notice class="nav-action-item"/>
      </el-tooltip>

    </template>

    <!-- 头像 -->
    <el-dropdown class="nav-action-item" trigger="click">
      <div class="flex-center h100% p10px">
        <img
            :src="userStore.user.avatar"
            class="rounded-full mr-10px w24px w24px"
            alt=""/>
        <span>{{ userStore.user.username }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleOpenUserProfile">
            {{ $t("navbar.profile") }}
          </el-dropdown-item>
          <a href="https://gitee.com/benben7466/matrix-mall-admin-web" target="_blank">
            <el-dropdown-item>{{ $t("navbar.gitee") }}</el-dropdown-item>
          </a>
          <el-dropdown-item @click="logout" divided>
            {{ $t("navbar.logout") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 设置 -->
    <template v-if="defaultSettings.showSettings">
      <div class="nav-action-item" @click="settingStore.settingsVisible = true">
        <svg-icon icon-class="setting" />
      </div>
    </template>

  </div>
</template>

<style scoped lang="scss">
.nav-action-item {
  display: inline-block;
  min-width: 40px;
  height: $navbar-height;
  line-height: $navbar-height;
  color: var(--el-text-color);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgb(0 0 0 / 10%);
  }
}
</style>