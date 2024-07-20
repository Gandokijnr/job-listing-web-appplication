<script setup>
import Listing from '@/components/Listing.vue'
import { ref, defineProps, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false
  }
})

const selectedJob = ref([])
const jobLimit = ref(props.limit)
const isLoading = ref(false)

async function fetchJobs() {
  try {
    isLoading.value = true
    const response = await axios.get('/api/jobs')
    selectedJob.value = response.data
  } catch (error) {
    console.error('Error fetching jobs:', error)
  } finally {
    isLoading.value = false
  }
}

function showAllJobs() {
  jobLimit.value = selectedJob.value.length
}

onMounted(() => {
  fetchJobs()
})
</script>

<template>
  <section class="bg-blue-50 px-4 py-10 w-full">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-orange-500 mb-6 text-center">
        Available jobs
      </h2>
      <p v-if="!isLoading && selectedJob.length === 0" class="text-center text-gray-500">
        No jobs available. Check back later.
      </p>
      <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 md:gap-3 sm:grid-cols-2 gap-6">
        <Listing v-for="job in selectedJob.slice(0, jobLimit)" :key="job.id" :job="job" />
      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto container flex justify-center my-10 px-6 w-full">
    <button
      @click="showAllJobs"
      :disabled="selectedJob.length === 0 || isLoading"
      class="block bg-orange-500 text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-200"
    >
      View All Jobs
    </button>
    <span v-if="isLoading" class="loader"></span>
  </section>
</template>
