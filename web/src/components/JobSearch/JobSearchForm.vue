<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import TextInput from '../Shared/TextInput.vue'
import ActionButton from '@/components/Shared/ActionButton.vue'

const router = useRouter()

const role = ref('')
const location = ref('')

function searchForJobs() {
  router.push({
    name: 'JobResults',
    query: {
      role: role.value,
      location: location.value,
    },
  })
}
</script>

<template>
  <form
    class="flex h-12 w-full items-center rounded-3xl border border-solid border-brand-gray-3"
    @submit.prevent="searchForJobs"
  >
    <Icon icon="ic:round-search" class="ml-4 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="role" class="absolute -top-8 left-0">Role</label>
        <TextInput id="role" v-model="role" placeholder="Software engineer" />
      </div>

      <span
        class="flex h-full items-center border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3"
      >in
      </span>

      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="location" class="absolute -top-8 left-0">Where?</label>
        <TextInput id="location" v-model="location" placeholder="Los Angeles" />
      </div>
    </div>

    <ActionButton text="Search" type="secondary" class="rounded-r-3xl" data-test="submit-btn" />
  </form>
</template>
