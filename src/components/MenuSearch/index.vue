<script setup lang="ts">
import {usePermissionStore} from "@/store";
import {isExternal} from "@/utils";
import router from "@/router";

const permissionStore = usePermissionStore();
const visible = ref(false);
const searchKey = ref("");
const searchResult = ref<SearchItem[]>([]);
const searchData = ref<SearchItem[]>([]);
const menuSearchInput = ref();
const noSearchRoutePath = ref(["/redirect", "/login", "/401", "/404"]);

onMounted(() => {
  searchResult.value = [];
  initSearchData(permissionStore.routes);
});

function initSearchData(routes: RouteRecordRaw[], parentPath: string = "") {
  parentPath = parentPath === "/" ? "" : parentPath;
  routes.forEach((item: any) => {
    if (noSearchRoutePath.value.includes(item.path)) {
      return;
    }
    let path = item.path.startsWith("/")
        ? item.path
        : parentPath + "/" + item.path;
    path = isExternal(item.path) ? item.path : path;
    if (item.children) {
      initSearchData(item.children, path);
    } else if (item.meta && item.meta.title && item.path) {
      let title = item.meta.title == "dashboard" ? "首页" : item.meta.title;
      let toLowerCaseTitle = title.toLowerCase();

      searchData.value.push({
        title: title,
        toLowerCaseTitle: toLowerCaseTitle,
        path: path,
        name: item.name,
        icon: item.meta.icon,
        redirect: item.redirect ? item.redirect : undefined,
      });
    }
  });
}

function showSearchModal() {
  searchKey.value = "";
  searchResult.value = [];
  visible.value = true;
  setTimeout(() => {
    menuSearchInput.value.focus();
  }, 100);
}

function hideSearchModal() {
  visible.value = false;
}

function inputSearch() {
  searchResult.value = [];

  if (searchKey.value) {
    let toLowerCaseKey = searchKey.value.toLowerCase();

    searchResult.value = searchData.value.filter((item) =>
        item.toLowerCaseTitle.includes(toLowerCaseKey)
    );
  }
}

function toMenu(item: SearchItem) {
  hideSearchModal();
  if (isExternal(item.path)) {
    window.open(item.path, "_blank");
  } else {
    router.push(item.path);
  }
}

</script>

<template>
  <div class="nav-action-item" @click="showSearchModal">
    <svg-icon icon-class="search"/>
    <el-dialog
        v-model="visible"
        width="30%"
        :append-to-body="true"
        :show-close="false"
    >
      <template #header>
        <el-input
            ref="menuSearchInput"
            v-model="searchKey"
            placeholder="菜单搜索"
            clearable
            @keyup.enter="inputSearch"
            @input="inputSearch"
            size="large"
        >
          <template #prepend>
            <el-button icon="Search"/>
          </template>
        </el-input>
      </template>
      <div class="search-content">
        <ul v-if="searchResult.length > 0">
          <li
              v-for="(item, index) in searchResult"
              :key="index"
              @click="toMenu(item)"
          >
            <el-icon v-if="item.icon && item.icon.startsWith('el-icon')" class="sub-el-icon">
              <component :is="item.icon.replace('el-icon-', '')" />
            </el-icon>
            <svg-icon v-else-if="item.icon" :icon-class="item.icon" />
            <svg-icon v-else icon-class="menu" />

            {{ item.title }}
          </li>
        </ul>
        <div class="search-space" v-else>暂无数据</div>
      </div>
      <template #footer></template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.search-content ul li {
  padding-left: 10px;
  line-height: 40px;
  text-align: left;

  &:hover {
    background-color: #f5f5f5;
  }
}

html.dark .search-content ul li {
  &:hover {
    background-color: var(--menu-background);;
  }
}

.search-space {
  padding: 20px;
  color: #999;
  text-align: center;
}
</style>