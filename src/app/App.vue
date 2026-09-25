<script setup lang="ts">
import { AppHeader } from '@/widgets/header'
import { AppFooter } from '@/widgets/footer'
</script>

<template>
  <AppHeader />
  <main class="main">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.main {
  flex: 1;
}
</style>
