<script setup lang="ts">
import defaultSettings from "@/settings";
import { useSettingsStore } from "@/store";

const settingsStore = useSettingsStore();
const logo = ref(new URL("@/assets/images/logo.png", import.meta.url).href);

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

</script>

<template>
  <div class="logo-container">
    <transition enter-active-class="animate__animated animate__fadeInLeft">
      <router-link v-if="collapse" class="wh-full flex-center" to="/">
        <img v-if="settingsStore.sidebarLogo" :src="logo" class="logo-image" />
      </router-link>

      <router-link v-else class="wh-full flex-center" to="/">
        <img v-if="settingsStore.sidebarLogo" :src="logo" class="logo-image" />
        <span class="logo-title">{{ defaultSettings.title }}</span>
      </router-link>

    </transition>
  </div>
</template>

<style lang="scss" scoped>
/*布局-Left*/
.logo-container {
  width: 100%;
  height: $navbar-height;
  background-color: $sidebar-logo-background;

  .logo-image {
    width: 24px;
    height: 24px;
  }

  .logo-title {
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    flex-shrink: 0;
    color: white;
  }
}

/*布局-Top，Mix*/
.layout-top,
.layout-mix {
  .logo-container {
    width: $sidebar-width;
  }

  &.hideSidebar {
    .logo-container {
      width: $sidebar-width-collapsed;
    }
  }
}
</style>