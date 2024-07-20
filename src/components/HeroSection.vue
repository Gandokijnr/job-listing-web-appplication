<script setup>
import JobDisplay from '@/components/JobDisplay.vue';
import JobListing from '@/views/JobListing.vue';
import { defineProps } from 'vue'

defineProps({
    jobTitle: { type: String, default: "Looking for job?" },
    jobDescription: { type: String, default: "Find the job that fits your skills and needs" }
})
</script>
<template>
     <section class="bg-orange-700 py-20 mb-4">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div class="text-center">
          <h1
            class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
           {{ jobTitle }}
          </h1>
          <p class="my-4 text-xl text-white">
            {{ jobDescription }}
          </p>
        </div>
      </div>
    </section>
    <JobDisplay />
    <JobListing />
</template>