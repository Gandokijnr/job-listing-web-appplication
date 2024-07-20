import { createRouter, createWebHistory } from 'vue-router'
import HeroSection from '@/views/HeroSection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HeroSection',
      component: HeroSection
    },
    {
      path: '/JobListing',
      name: 'JobListing',
      component: () => import('@/views/JobListing.vue')
    },
    {
      path: '/JobDisplay',
      name: 'JobDisplay',
      component: () => import('@/views/JobDisplay.vue')
    },
    {
      path: '/Listing',
      name: 'Listing',
      component: () => import('@/views/Listing.vue')
    },
    {
      path: '/addJob',
      name: 'addJob',
      component: () => import('@/views/addJob.vue'),
      props: true
    },
    {
      path: '/editJob/:id',
      name: 'editJob',
      component: () => import('@/views/editJob.vue'),
      props: true
    },
    {
      path: '/job/:id',
      name: 'job',
      component: () => import('@/views/jobDetails.vue'),
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
