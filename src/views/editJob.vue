<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const toast = useToast();
const router = useRouter();
const route = useRoute();

const isLoading = ref(true);

const form = reactive({
  type: 'Full-Time',
  title: '',
  description: '',
  location: '',
  salary: '',
  company: {
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
  },
});

const jobId = route.params.id;

const submitJob = async () => {
  isLoading.value = true;
  try {
    await axios.put(`/api/jobs/${jobId}`, form);
    console.log(form)
    toast.success(`${form.title} edited successfully`);
    router.push('/JobListing');
  } catch (error) {
    toast.error(error.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${jobId}`);
    const job = response.data;
    form.type = job.type;
    form.title = job.title;
    form.description = job.description;
    form.location = job.location;
    form.salary = job.salary;
    form.company.name = job.company.name;
    form.company.description = job.company.description;
    form.company.contactEmail = job.company.contactEmail;
    form.company.contactPhone = job.company.contactPhone;
    console.log(job)
  } catch (error) {
    console.log(error.message);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="bg-orange-50">
    <div class="container m-auto max-w-4xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="submitJob">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>
            <select v-model="form.type" id="type" name="type" class="rounded w-full p-2 shadow-md">
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
            <input v-model="form.title" type="text" id="name" name="name" class="border rounded w-full p-2 shadow-md mb-3" placeholder="e.g., Software Engineer, Marketing Manager" required />
          </div>

          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea v-model="form.description" id="description" name="description" class="border rounded w-full p-2 shadow-md" rows="4" placeholder="Add any job duties, expectations, requirements, etc." required></textarea>
          </div>

          <div class="mb-4">
            <label for="salary" class="block text-gray-700 font-bold mb-2">Salary</label>
            <select v-model="form.salary" id="salary" name="salary" class="border rounded w-full p-2 shadow-md" required>
              <option value="Under 50">Under 50K</option>
              <option value="50 - 60">50 - 60K</option>
              <option value="60 - 70">60 - 70K</option>
              <option value="70 - 80">70 - 80K</option>
              <option value="80 - 90">80 - 90K</option>
              <option value="90 - 100">90 - 100K</option>
              <option value="100 - 125">100 - 125K</option>
              <option value="125 - 150">125 - 150K</option>
              <option value="150 - 175">150 - 175K</option>
              <option value="175 - 200">175 - 200K</option>
              <option value="Over 200">Over 200K</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Location</label>
            <input v-model="form.location" id="location" name="location" class="border rounded w-full py-2 p-2 shadow-md" placeholder="e.g., New York, Remote" required />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
            <input v-model="form.company.name" type="text" id="company" name="company" class="border rounded w-full p-2 shadow-md" placeholder="e.g., TechCorp, Marketing Masters" required />
          </div>

          <div class="mb-4">
            <label for="company_description" class="block text-gray-700 font-bold mb-2">Company Description</label>
            <textarea v-model="form.company.description" id="company_description" name="company_description" class="border rounded w-full p-2 shadow-md" rows="4" placeholder="What does your company do? e.g., Software development, marketing solutions" required></textarea>
          </div>

          <div class="mb-4">
            <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
            <input v-model="form.company.contactEmail" type="email" id="contact_email" name="contact_email" class="border rounded w-full p-2 shadow-md" placeholder="e.g., hr@techcorp.com" required />
          </div>

          <div class="mb-4">
            <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
            <input v-model="form.company.contactPhone" type="tel" id="contact_phone" name="contact_phone" class="border rounded w-full p-2 shadow-md" placeholder="e.g., 1234567890" required />
          </div>

          <div>
            <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline" type="submit">
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
    <span v-if="isLoading" class="loader"></span>
  </section>
</template>
