<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const toast = useToast();
const router = useRouter();
const isLoading = ref(false);

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

const submitJob = async () => {
  isLoading.value = true;
  try {
    const response = await axios.post('/api/jobs', {
      type: form.type,
      title: form.title,
      description: form.description,
      location: form.location,
      salary: form.salary,
      company: {
        name: form.company.name,
        description: form.company.description,
        contactEmail: form.company.contactEmail,
        contactPhone: form.company.contactPhone,
      },
    });

    toast.success(`${form.title} added successfully`);
    // Delay navigation by 3 seconds
      router.push('/JobListing');
  } catch (error) {
    // Handle error
    toast.error(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section class="bg-orange-50">
    <div class="container m-auto max-w-4xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="submitJob">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>
            <select v-model="form.type" id="type" name="type" class="rounded w-full p-2 shadow-md" required>
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
              <option value="Under 50K">Under 50K</option>
              <option value="50K - 60K">50 - 60K</option>
              <option value="60K - 70K">60 - 70K</option>
              <option value="70K - 80K">70 - 80K</option>
              <option value="80K - 90K">80 - 90K</option>
              <option value="90K - 100K">90 - 100K</option>
              <option value="100K - 125K">100 - 125K</option>
              <option value="125K - 150K">125 - 150K</option>
              <option value="150K - 175K">150 - 175K</option>
              <option value="175K - 200K">175 - 200K</option>
              <option value="Over 200K">Over 200K</option>
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
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
    <span  v-if="isLoading" class="loader"></span>
  </section>
</template>
