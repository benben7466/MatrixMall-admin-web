<script setup lang="ts">
import {RouteRecordRaw} from "vue-router";
import {isExternal} from "@/utils";
import path from "path-browserify";

defineOptions({
  name: "SidebarMenuItem",
  inheritAttrs: false,
});

const props = defineProps({
  //当前路由项对象
  item: {
    type: Object,
    required: true,
  },
  //父层级完整路由路径
  basePath: {
    type: String,
    required: true,
  },
  //是否为嵌套路由
  isNest: {
    type: Boolean,
    default: false,
  },
});


const onlyOneChild = ref();

//判断当前路由是否只有一个显示的子路由
function hasOneShowingChild(children: RouteRecordRaw[] = [], parent: RouteRecordRaw) {
  // 筛选出需要显示的子路由
  const showingChildren = children.filter((route: RouteRecordRaw) => {
    if (route.meta?.hidden) {
      return false;
    } else {
      route.meta!.hidden = false;
      onlyOneChild.value = route;
      return true;
    }
  });

  // 如果只有一个或没有显示的子路由
  if (showingChildren.length === 1) {
    return true;
  }

  // 如果没有子路由，显示父级路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = {...parent, path: "", noShowingChildren: true};
    return true;
  }

  return false;
}

//解析路由路径，将相对路径转换为绝对路径
function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  const fullPath = path.resolve(props.basePath, routePath);
  return fullPath;
}
</script>

<template>
  <!-- 菜单项没有配置meta的 或者 设置hidden为false的，都符合 -->
  <div v-if="!item.meta || !item.meta.hidden">

    <!-- 显示只有一个子路由或没有子路由的菜单项 -->
    <template v-if="
                    hasOneShowingChild(item.children, item as RouteRecordRaw) &&
                    (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                    !item.meta?.alwaysShow
                  "
    >
      <AppLink v-if="onlyOneChild.meta" :to="{path: resolvePath(onlyOneChild.path),query: onlyOneChild.meta.params}">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <SidebarMenuItemTitle
              :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
              :title="onlyOneChild.meta.title"
              :path=resolvePath(onlyOneChild.path)
          />
        </el-menu-item>
      </AppLink>
    </template>


    <!-- 显示多个子路由的父菜单项 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
      <template #title>
        <SidebarMenuItemTitle
            v-if="item.meta"
            :icon="item.meta && item.meta.icon"
            :title="item.meta.title"
            :path=resolvePath(item.path)
        />
      </template>

      <!--递归循环-->
      <SidebarMenuItem
          v-for="child in item.children"
          :key="child.path"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
      />

    </el-sub-menu>

  </div>
</template>

<style lang="scss">
/*隐藏侧边栏时，控制图标Icon等*/
.hideSidebar {
  .submenu-title-noDropdown {
    position: relative;
    padding: 0 !important;

    .el-tooltip {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }
    }

    & > span {
      display: inline-block;
      width: 0;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }

  .el-sub-menu {
    overflow: hidden;

    & > .el-sub-menu__title {
      padding: 0 !important;

      .sub-el-icon {
        margin-left: 19px;
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    width: $sidebar-width-collapsed;

    .el-sub-menu {
      & > .el-sub-menu__title {
        & > span {
          display: inline-block;
          width: 0;
          height: 0;
          overflow: hidden;
          visibility: hidden;
        }
      }
    }
  }
}

.el-menu-item:hover {
  background-color: $menu-hover;
}
</style>