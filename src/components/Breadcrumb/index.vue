<script setup lang="ts">
import {RouteLocationMatched} from "vue-router";
import {translateRouteTitle} from "@/utils/i18n";
import {compile} from "path-to-regexp";
import router from "@/router";

const breadcrumbs = ref<Array<RouteLocationMatched>>([]);
const currentRoute = useRoute();

const pathCompile = (path: string) => {
  const {params} = currentRoute;
  const toPath = compile(path);
  return toPath(params);
};

onBeforeMount(() => {
  getBreadcrumb();
});

watch(
    () => currentRoute.path,
    (path) => {
      if (path.startsWith("/redirect/")) {
        return;
      }
      getBreadcrumb();
    }
);

function getBreadcrumb() {
  let matched = currentRoute.matched.filter(
      (item) => item.meta && item.meta.title
  );

  const first = matched[0];
  if (!isDashboard(first)) {
    matched = [
      {path: "/dashboard", meta: {title: "dashboard"}} as any,
    ].concat(matched);
  }
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
}

function isDashboard(route: RouteLocationMatched) {
  const name = route && route.name;
  if (!name) {
    return false;
  }

  return (
      name.toString().trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
  );
}

function handleLink(item: any) {
  const {redirect, path} = item;

  if (redirect) {
    router.push(redirect).catch((err) => {
      console.warn(err);
    });
    return;
  }

  router.push(pathCompile(path)).catch((err) => {
    console.warn(err);
  });
}

</script>

<template>
  <el-breadcrumb class="flex-y-center">
    <transition-group enter-active-class="animate__animated animate__fadeInRight">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span v-if=" item.redirect === 'noredirect' || index === breadcrumbs.length - 1 " class="color-gray-400">
          {{ translateRouteTitle(item.meta.title, item.path) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ translateRouteTitle(item.meta.title, item.path) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>

</style>