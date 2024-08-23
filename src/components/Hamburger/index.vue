<script setup lang="ts">
defineProps({
  isActive: {
    required: true,
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggleClick"]);

function toggleClick() {
  emit("toggleClick");
}

</script>

<template>
  <div @click="toggleClick" class="px-[15px] flex items-center justify-center color-[var(--el-text-color-regular)]">
    <svg-icon
        class="hamburger"
        :class="{ 'is-active': isActive }"
        icon-class="collapse"
    />
  </div>
</template>

<style scoped lang="scss">
.hamburger {
  vertical-align: middle;
  cursor: pointer;
  transform: scaleX(-1);
}

.hamburger.is-active {
  transform: scaleX(1);
}
</style>