<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  components: { Header },
  /*data() {
    return {
      zoo: {
        name: "",
        cnpj: "",
        phone1: "",
        phone2: "",
        address: {
          cidade: "",
          estado: "",
          cep: "",
          rua: "",
          complemento: "",
        },
        email: "",
        confirm_email: "",
        password: "",
        confirm_password: "",
      },
    };
  },
  */
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
