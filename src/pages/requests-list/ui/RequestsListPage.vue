<script setup lang="ts">
import BaseCard from '@/shared/ui/BaseCard.vue'
import { useListAccess, PasswordGateForm } from '@/features/list-access'
import { RequestsTable } from '@/widgets/requests-table'

const { isUnlocked } = useListAccess()
</script>

<template>
  <section class="page">
    <template v-if="!isUnlocked">
      <BaseCard>
        <PasswordGateForm />
      </BaseCard>
    </template>

    <template v-else>
      <BaseCard>
        <RequestsTable />
      </BaseCard>
    </template>
  </section>
</template>

<style scoped>
.page {
  max-width: 760px;
  margin: 0 auto;
  padding: 48px 28px 64px;
}

@media (max-width: 560px) {
  .page {
    padding: 32px 20px 48px;
  }
}
</style>
