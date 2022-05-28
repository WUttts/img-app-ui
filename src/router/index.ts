import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("~/views/login/index.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("~/views/home/index.vue"),
    redirect: "/search",
    children: [
      {
        path: "/search",
        name: "Search",
        component: () => import("~/views/search/index.vue"),
      },
      {
        path: "/upload",
        name: "Upload",
        component: () => import("~/views/upload/index.vue"),
      },
    ],
  },
];

const index = createRouter({
  history: createWebHistory(),
  routes,
});
index.beforeEach((to, from) => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
});

index.afterEach((to, from) => {
  NProgress.done();
});

export default index;
