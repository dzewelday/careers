<script setup lang="ts">
import ActionButton from '@/components/Shared/ActionButton.vue'
import JobFiltersGroup from '@/components/JobResults/JobFiltersGroup.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'

const jobsStore = useJobsStore()
const userStore = useUserStore()
const degreesStore = useDegreesStore()
</script>

<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">
          What do you want to do?
        </h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary" />
        </div>
      </div>

      <JobFiltersGroup
        header="Degrees" :unique-values="degreesStore.uniqueDegrees"
        :action="userStore.addSelectedDegrees"
      />

      <JobFiltersGroup
        header="Job Types" :unique-values="jobsStore.uniqueJobTypes"
        :action="userStore.addSelectedJobTypes"
      />

      <JobFiltersGroup
        header="Organizations" :unique-values="jobsStore.uniqueOrganizations"
        :action="userStore.addSelectedOrganizations"
      />
    </section>
  </div>
</template>
