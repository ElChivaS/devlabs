import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/HomeView.vue'
import Lab from '../pages/LabView.vue'
import Resume from '../pages/ResumeView.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/lab',
        component: Lab
    },
    {
        path: '/resume',
        component: Resume
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router