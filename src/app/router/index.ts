import { createRouter, createWebHistory } from 'vue-router'
import { HomePage } from '@/pages/home'
import { RequestsListPage } from '@/pages/requests-list'
import { AboutPage } from '@/pages/about'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/requests', name: 'requests-list', component: RequestsListPage },
    { path: '/about', name: 'about', component: AboutPage },
  ],
})
