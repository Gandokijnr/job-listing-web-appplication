<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const currentRoute = ref(router.currentRoute.value.name);
const isActive = (routeName) => currentRoute.value === routeName;

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<template>
  <nav class="bg-orange-700 border-b border-white sticky top-0 z-10">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-between md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink :to="{ name: 'HeroSection' }" class="flex items-center mr-4">
            <span class="text-white text-2xl font-bold ml-2">Jobs Navigator</span>
          </RouterLink>

          <!-- Mobile menu button -->
          <div class="flex md:hidden">
            <button @click="toggleMobileMenu" class="text-white focus:outline-none">
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                <path v-if="mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Desktop menu -->
          <div class="hidden md:flex md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                :to="{ name: 'HeroSection' }"
                :class="isActive('HeroSection') ? 'text-white rounded-md px-3 py-2' : 'text-white hover:border-b rounded-md px-3 py-2'"
              >
                Home
              </RouterLink>
              <RouterLink
                :to="{ name: 'JobListing' }"
                :class="isActive('JobListing') ? 'border text-white rounded-md px-3 py-2' : 'text-white hover:border-b rounded-md px-3 py-2'"
              >
                All Jobs
              </RouterLink>
              <RouterLink
                :to="{ name: 'addJob' }"
                :class="isActive('addJob') ? 'border text-white rounded-md px-3 py-2' : 'text-white hover:border-b rounded-md px-3 py-2'"
              >
                Add New Job
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink
          :to="{ name: 'HeroSection' }"
          :class="isActive('HeroSection') ? 'text-white block rounded-md px-3 py-2' : 'text-white hover:border-b block rounded-md px-3 py-2'"
        >
          Home
        </RouterLink>
        <RouterLink
          :to="{ name: 'JobListing' }"
          :class="isActive('JobListing') ? 'border text-white block rounded-md px-3 py-2' : 'text-white hover:border-b block rounded-md px-3 py-2'"
        >
          All Jobs
        </RouterLink>
        <RouterLink
          :to="{ name: 'addJob' }"
          :class="isActive('addJob') ? 'border text-white block rounded-md px-3 py-2' : 'text-white hover:border-b block rounded-md px-3 py-2'"
        >
          Add New Job
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
