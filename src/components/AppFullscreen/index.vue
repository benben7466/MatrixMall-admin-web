<script setup lang="ts">
const {isFullscreen, toggle} = useFullscreen();
</script>

<template>
  <div class="nav-action-item" @click="toggle">
    <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"/>
  </div>
</template>

<style scoped lang="scss">

</style>