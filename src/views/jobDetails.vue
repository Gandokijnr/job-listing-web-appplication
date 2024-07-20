<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const jobId = route.params.id;
const job = ref({});
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${jobId}`);
    job.value = response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
  } finally {
    isLoading.value = false;
  }
});

const deleteJob = async () => {
  try {
    await axios.delete(`/api/jobs/${jobId}`);
    router.push('/'); // Redirect to home or another appropriate route after deletion
  } catch (error) {
    console.error('Error deleting job:', error);
  }
};
</script>

<template>
  <section v-if="!isLoading" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">{{ job.type }}</div>
            <h1 class="text-3xl font-bold mb-4">{{ job.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-lg text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-orange-800 text-lg font-bold mb-6">Job Description</h3>
            <p class="mb-4">{{ job.description }}</p>
            <h3 class="text-orange-800 text-lg font-bold mb-2">Salary</h3>
            <p class="mb-4">{{ job.salary }} / Year</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>
            <h2 class="text-2xl">{{ job.company.name }}</h2>
            <p class="my-2">{{ job.company.description }}</p>
            <hr class="my-4" />
            <h3 class="text-xl">Contact Email:</h3>
            <p class="my-2 bg-orange-100 p-2 font-bold">{{ job.company.contactEmail }}</p>
            <h3 class="text-xl">Contact Phone:</h3>
            <p class="my-2 bg-orange-100 p-2 font-bold">{{ job.company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink :to="'/editJob/' + job.id" class="bg-orange-500 hover:bg-orange-600 text-white text-center font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block">
              Edit Job
            </RouterLink>
            <button @click="deleteJob" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-4 block">
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <span v-else="isLoading" class="loader"></span>
</template>
