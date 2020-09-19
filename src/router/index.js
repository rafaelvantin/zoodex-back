import vue from "vue";
import vuerouter from "vue-router";
import cadastro from "../views/Cadastro.vue";

vue.use(vuerouter);

const routes = [
  {
    path: "/",
    name: "Cadastro",
    component: cadastro,
  },
];

const router = new vuerouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
