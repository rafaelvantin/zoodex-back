<template>
  <nav
    class="navbar is-transparent"
    role="navigation"
    aria-label="dropdown navigation"
    id="navbar"
  >
    <a class="navbar-item" id="navbar-image">
      <img
        src="../assets/park-zoo-logo-modificado-2.png"
        alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
      />
    </a>

    <div class="navbar-item" id="navbar-item">
      <router-link to="/"
        ><a class="navbar-item" id="navbar-item">Início</a></router-link
      >
      <router-link to="/cadastro"
        ><a class="navbar-item" id="navbar-item">Cadastrar</a></router-link
      >
      <router-link to="/gerenciar"
        ><a class="navbar-item" id="navbar-item">Gerenciar</a></router-link
      >
      <router-link to="/listarzoo"
        ><a class="navbar-item" id="navbar-item">Lista Zoos</a></router-link
      >
      <router-link to="/alunos"
        ><a class="navbar-item" id="navbar-item">Alunos</a></router-link
      >
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
