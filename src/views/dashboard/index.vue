<script setup lang="ts">
import {useUserStore} from "@/store/modules/user";
import StatsAPI, {VisitStatsVO} from "@/api/log";

const userStore = useUserStore();

defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

const date: Date = new Date();
const greetings = computed(() => {
  const hours = date.getHours();
  if (hours >= 8 && hours < 12) {
    return "上午好，" + userStore.user.nickname + "！";
  } else if (hours >= 12 && hours < 18) {
    return "下午好，" + userStore.user.nickname + "！";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，" + userStore.user.nickname + "！";
  } else {
    return "贲氏科技，欢迎您！";
  }
});

const visitStatsLoading = ref(true);
const visitStatsList = ref<VisitStats[] | null>(Array(3).fill({}));

interface VisitStats {
  title: string;
  icon: string;
  tagType: "primary" | "success" | "warning";
  growthRate: number;
  granularity: string;
  todayCount: number;
  totalCount: number;
}

//加载访问统计数据
const loadVisitStatsData = async () => {
  const list: VisitStatsVO[] = await StatsAPI.getVisitStats();

  if (list) {
    const tagTypes: ("primary" | "success" | "warning")[] = [
      "primary",
      "success",
      "warning",
    ];
    const transformedList: VisitStats[] = list.map((item, index) => ({
      title: item.title,
      icon: getVisitStatsIcon(item.type),
      tagType: tagTypes[index % tagTypes.length],
      growthRate: item.growthRate,
      granularity: "日",
      todayCount: item.todayCount,
      totalCount: item.totalCount,
    }));
    visitStatsList.value = transformedList;
    visitStatsLoading.value = false;
  }
};

//获取增长率文本颜色类
const getGrowthRateClass = (growthRate: number): string => {
  if (growthRate > 0) {
    return "color-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "color-[--el-color-success]";
  } else {
    return "color-[--el-color-info]";
  }
};

//格式化增长率
const formatGrowthRate = (growthRate: number): string => {
  if (growthRate === 0) {
    return "-";
  }

  const formattedRate = Math.abs(growthRate * 100)
      .toFixed(2)
      .replace(/\.?0+$/, "");
  return formattedRate + "%";
};

//
/** 获取访问统计图标 */
const getVisitStatsIcon = (type: string) => {
  switch (type) {
    case "pv":
      return "pv";
    case "uv":
      return "uv";
    case "ip":
      return "ip";
    default:
      return "pv";
  }
};

onMounted(() => {
  loadVisitStatsData();
});

</script>

<template>
  <div class="dashboard-container">
    <github-corner class="github-corner"/>

    <!--基础信息-->
    <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="18" :xs="24">
          <div class="flex h-full items-center">
            <img
                class="w-20 h-20 mr-5 rounded-full"
                :src="userStore.user.avatar"
                alt=""/>
            <div>
              <p>{{ greetings }}</p>
              <p class="text-sm text-gray">
                作者：贲志强，微信：benben7466
              </p>
            </div>
          </div>
        </el-col>

      </el-row>
    </el-card>

    <!-- 数据卡片 -->
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex-x-between">
              <span class="text-[var(--el-text-color-secondary)]">在线用户</span>
              <el-tag type="success" size="small">-</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <span class="text-lg"> 1</span>
            <svg-icon icon-class="user" size="2em"/>
          </div>
          <div class="flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]">
            <span> 总用户数 </span>
            <span>5 </span>
          </div>
        </el-card>
      </el-col>

      <el-col
          :xs="24"
          :sm="12"
          :lg="6"
          v-for="(item, index) in visitStatsList"
          :key="index"
      >
        <el-skeleton :loading="visitStatsLoading" :rows="5" animated>
          <template #template>
            <el-card>
              <template #header>
                <div>
                  <el-skeleton-item variant="h3" style="width: 40%"/>
                  <el-skeleton-item
                      variant="rect"
                      style="float: right; width: 1em; height: 1em"
                  />
                </div>
              </template>

              <div class="flex-x-between">
                <el-skeleton-item variant="text" style="width: 30%"/>
                <el-skeleton-item
                    variant="circle"
                    style="width: 2em; height: 2em"
                />
              </div>
              <div class="mt-5 flex-x-between">
                <el-skeleton-item variant="text" style="width: 50%"/>
                <el-skeleton-item variant="text" style="width: 1em"/>
              </div>
            </el-card>
          </template>
          <template v-if="!visitStatsLoading">
            <el-card shadow="never">
              <template #header>
                <div class="flex-x-between">
                  <span class="text-[var(--el-text-color-secondary)]">{{
                      item.title
                    }}</span>
                  <el-tag :type="item.tagType" size="small">
                    {{ item.granularity }}
                  </el-tag>
                </div>
              </template>

              <div class="flex-x-between mt-2">
                <div class="flex-y-center">
                  <span class="text-lg"> {{ item.todayCount }}</span>
                  <span
                      :class="[
                      'text-xs',
                      'ml-2',
                      getGrowthRateClass(item.growthRate),
                    ]"
                  >
                    <i-ep-top v-if="item.growthRate > 0"/>
                    <i-ep-bottom v-else-if="item.growthRate < 0"/>
                    {{ formatGrowthRate(item.growthRate) }}
                  </span>
                </div>
                <svg-icon :icon-class="item.icon" size="2em"/>
              </div>

              <div
                  class="flex-x-between mt-2 text-sm text-[var(--el-text-color-secondary)]"
              >
                <span>总{{ item.title }} </span>
                <span>{{ item.totalCount }} </span>
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>

  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }
}
</style>