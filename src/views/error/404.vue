<script setup lang="ts">
import { useRouter } from "vue-router";

defineOptions({
  name: "Page404",
});

const router = useRouter();

function back() {
  router.back();
}
</script>

<template>
  <div class="page-container">
    <div class="pic-404">
      <img class="pic-404__parent" src="@/assets/images/404.png" alt="404" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  display: flex;
  padding: 100px;
}
</style>
