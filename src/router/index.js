import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "Sample",
        name: "Sample",
        component: () => import("@/views/Sample.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
