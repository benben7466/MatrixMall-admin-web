<script setup lang="ts">
import {LanguageEnum} from "@/enums/LanguageEnum";
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const { locale, t } = useI18n();

const langOptions = [
  { label: "中文", value: LanguageEnum.ZH_CN },
  { label: "English", value: LanguageEnum.EN },
];

function handleLanguageChange(lang: string) {
  locale.value = lang;
  appStore.changeLanguage(lang);

  ElMessage.success(t("langSelect.message.success"));
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleLanguageChange">
    <div>
      <svg-icon icon-class="language" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
            v-for="item of langOptions"
            :key="item.value"
            :disabled="appStore.language == item.value"
            :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">

</style>