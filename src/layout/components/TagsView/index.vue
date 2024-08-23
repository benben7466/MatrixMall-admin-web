<script setup lang="ts">
import {translateRouteTitle} from "@/utils/i18n";
import {useRoute, useRouter, RouteRecordRaw} from "vue-router";
import {usePermissionStore, useTagsViewStore, useSettingsStore, useAppStore,} from "@/store";
import {resolve} from "path-browserify";

const tagsViewStore = useTagsViewStore();
const {visitedViews} = storeToRefs(tagsViewStore);
const permissionStore = usePermissionStore();
const affixTags = ref<TagView[]>([]);
const route = useRoute();

onMounted(() => {
  initTags();
});

watch(
    route,
    () => {
      addTags();//添加标签
      moveToCurrentTag();//移动到当前标签
    },
    {
      immediate: true, //初始化立即执行
    }
);

function initTags() {
  const tags: TagView[] = filterAffixTags(permissionStore.routes);
  affixTags.value = tags;

  for (const tag of tags) {
    if (tag.name) {
      tagsViewStore.addVisitedView(tag);
    }
  }
}

function addTags() {
  if (route.meta.title) {
    tagsViewStore.addView({
      name: route.name as string,
      title: route.meta.title,
      path: route.path,
      fullPath: route.fullPath,
      affix: route.meta?.affix,
      keepAlive: route.meta?.keepAlive,
      query: route.query,
    });
  }
}

function moveToCurrentTag() {
  // 使用 nextTick() 的目的是确保在更新 tagsView 组件之前，scrollPaneRef 对象已经滚动到了正确的位置。
  nextTick(() => {
    for (const tag of visitedViews.value) {
      if (tag.path === route.path) {
        if (tag.fullPath !== route.fullPath) {
          tagsViewStore.updateVisitedView({
            name: route.name as string,
            title: route.meta.title || "",
            path: route.path,
            fullPath: route.fullPath,
            affix: route.meta?.affix,
            keepAlive: route.meta?.keepAlive,
            query: route.query,
          });
        }
      }
    }
  });
}

//过滤出需要固定的标签
function filterAffixTags(routes: RouteRecordRaw[], basePath = "/") {
  let tags: TagView[] = [];
  routes.forEach((route: RouteRecordRaw) => {
    const tagPath = resolve(basePath, route.path);

    if (route.meta?.affix) {
      tags.push({
        path: tagPath,
        fullPath: tagPath,
        name: String(route.name),
        title: route.meta?.title || "no-name",
        affix: route.meta?.affix,
        keepAlive: route.meta?.keepAlive,
      });
    }

    if (route.children) {//递归子路由
      const tempTags = filterAffixTags(route.children, basePath + route.path);
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags];
      }
    }
  });

  return tags;
}

function isAffix(tag: TagView) {
  return tag?.affix;
}

function closeSelectedTag(view: TagView) {
  tagsViewStore.delView(view).then((res: any) => {
    if (tagsViewStore.isActive(view)) {
      tagsViewStore.toLastView(res.visitedViews, view);
    }
  });
}

</script>

<template>
  <div class="tags-container">
    <el-scrollbar class="scroll-container" :vertical="false">
      <router-link
          ref="tagRef"
          v-for="tag in visitedViews"
          :key="tag.fullPath"
          :to="{ path: tag.path, query: tag.query }"
          :class="'tags-item ' + (tagsViewStore.isActive(tag) ? 'active' : '')"
      >
        {{ translateRouteTitle(tag.title, tag.path) }}
        <i-ep-close
            class="close-icon"
            size="12px"
            v-if="!isAffix(tag)"
            @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.tags-container {
  width: 100%;
  height: 34px;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  box-shadow: 0 1px 1px var(--el-box-shadow-light);

  .tags-item {
    display: inline-block;
    padding: 3px 8px;
    margin: 4px 0 0 5px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid var(--el-border-color-light);

    &:hover {
      color: var(--el-color-primary);
    }

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    .close-icon {
      border-radius: 50%;

      &:hover {
        color: #fff;
        background-color: var(--el-color-primary);
      }
    }

    &.active {
      color: #fff;
      background-color: var(--el-color-primary);

      &::before {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 5px;
        content: "";
        background: #fff;
        border-radius: 30%;
      }

      .close-icon:hover {
        color: var(--el-color-primary);
        background-color: var(--el-fill-color-light);
      }

    }

  }
}

.scroll-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  .el-scrollbar__bar {
    bottom: 0;
  }

  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>