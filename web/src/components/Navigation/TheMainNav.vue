<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import ActionButton from '@/components/Shared/ActionButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

const userStore = useUserStore()

const headerHeight = computed(() => ({
  'h-16': !userStore.isLoggedIn,
  'h-32': userStore.isLoggedIn,
}))

const menuItems = ref([
  { text: 'Teams', url: '/teams' },
  { text: 'Locations', url: '/' },
  { text: 'Benefits', url: '/' },
  { text: 'Jobs', url: '/jobs/results' },
  { text: 'Students', url: '/' },
])
</script>

<template>
  <header class="w-full text-sm" :class="[headerHeight]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
        >
          Bobo Careers
        </router-link>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5"
              >
                {{ menuItem.text }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="userStore.isLoggedIn" />
          <ActionButton v-else text="Sign in" @click="userStore.loginUser()" />
        </div>
      </div>

      <TheSubnav v-if="userStore.isLoggedIn" />
    </div>
  </header>
</template>
