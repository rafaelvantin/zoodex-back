<template>
  <div id="app">
    <article class="message" id="article">
      <div class="message-header" id="message-header">Instruções</div>
      <div class="message-body" id="message-body">
        <table>
          <tr id="tr">
            <th>
              1. Cadastre os dados básicos do zoológico.
              <br />2. Escolha os dados a serem apresentados. <br />3. Adicione
              mais campos de acordo com sua preferência. <br />4. Finalize o
              cadastro.
              <br />
            </th>
          </tr>
        </table>
      </div>
    </article>

    <article class="message" id="article">
      <div class="message-header" id="message-header2">
        Cadastro - Dados da instituição
      </div>
      <div class="message-body" id="message-body2">
        <div class="columns is-8" id="columns">
          <div class="column is-2">
            <label id="lbl_form">Nome:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira o nome"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2">
            <label id="lbl_form">CNPJ:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira o CNPJ"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2">
            <label id="lbl_form">Telefone 1:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira o telefone 1"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2">
            <label id="lbl_form">Telefone 2:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira o telefone 2"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-1">
            <label id="lbl_form">Cidade:</label>
            <input
              type="text"
              class="input"
              placeholder="Cidade"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-1" id="columns">
            <label id="lbl_form">Estado:</label>
            <input
              type="text"
              class="input"
              placeholder="Estado"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2" id="columns">
            <label id="lbl_form">CEP:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira o CEP"
              id="input"
              style="width: 170px"
            />
          </div>
        </div>

        <div class="columns is-12">
          <div class="column is-2">
            <label id="lbl_form">E-mail:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira o e-mail"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2">
            <label id="lbl_form">Confirmar e-mail:</label>
            <input
              type="text"
              class="input"
              placeholder="Confirme o e-mail"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2">
            <label id="lbl_form">Senha:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira a senha"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2">
            <label id="lbl_form">Confirmar Senha:</label>
            <input
              type="text"
              class="input"
              placeholder="Confirme a senha"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2">
            <label id="lbl_form">Rua:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira a rua"
              id="input"
              style="width: 170px"
            />
          </div>
          <div class="column is-2">
            <label id="lbl_form">Complemento:</label>
            <input
              type="text"
              class="input"
              placeholder="Insira complemento"
              id="input"
              style="width: 170px"
            />
          </div>
        </div>
      </div>
    </article>

    <article class="message" id="article">
      <div class="message-header" id="message-header3">
        Quais dados você deseja apresentar?
      </div>
      <div class="message-body" id="message-body3">
        <div class="columns">
          <div class="column is-12">
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Nome científico</label>
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Nome popular</label>
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Classificação Taxonômica</label>
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Bioma</label>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Hábito (diurno/noturno)</label>
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Hábito alimentar</label>
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Gestação</label>
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Longevidade</label>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Descrição Física</label>
            <input type="checkbox" id="checkbox" />
            <label id="lbl2">Curiosidades</label>
          </div>
        </div>
      </div>
    </article>

    <table id="table3">
      <tr>
        <th>
          <button id="btn">+ Outro</button>
        </th>
        <th>
          <input
            type="text"
            placeholder="Insira o nome do campo"
            width="30px"
            class="input is-small"
          />
        </th>
        <th>
          <input type="radio" />
          <label>&nbsp;Numérico</label>
        </th>
        <th>
          <input type="radio" />
          <label>&nbsp;Texto</label>
        </th>
        <th>
          <input type="radio" />
          <label>&nbsp;Verdadeiro/falso</label>
        </th>
      </tr>
    </table>

    <br />
    <button class="button is-rounded" id="button_confirmar">Confirmar</button>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "App",
};
</script>

<style>
#nav {
  margin-top: 1%;
  justify-content: center;
  justify-content: space-between;
  margin-left: 2%;
  margin-right: 2%;
  background-color: lightgrey;
}

#btn {
  background-color: green;
  color: white;
  border: green;
}

#imagem {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  margin-top: 1%;
  margin-right: 6%;
}

#article {
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 1%;
}

#message-header {
  background: green;
  color: white;
}

#message-header2 {
  background: green;
  color: white;
}

#message-header3 {
  background: green;
  color: white;
}

#message-body {
  background-color: lightgreen;
  color: black;
  text-align: left;
}

#message-body2 {
  background-color: lightgreen;
  color: black;
  text-align: center;
}

#message-body3 {
  background-color: lightgreen;
  color: black;
  text-align: center;
}

#input {
  display: inline-block;
  width: 200px;
  text-align: left;
}

#lbl {
  display: inline-block;
  width: 140px;
  text-align: right;
}

#lblinicioa {
  display: inline-block;
  width: 54px;
  text-align: center;
}

#lbl2 {
  display: inline-block;
  width: 250px;
  text-align: left;
}

#button {
  margin-block-end: 2%;
  margin-block-start: 2%;
  background-color: green;
  color: white;
}

#table {
  display: inline-block;
  border-collapse: separate;
  border-spacing: 30px;
}

#table2 {
  display: inline-block;
  border-collapse: separate;
  border-spacing: 30px;
}

#table3 {
  display: inline-block;
  border-collapse: separate;
  border-spacing: 30px;
}

#checkbox {
  display: inline-block;
  width: 15px;
  text-align: left;
  padding: 10px;
}

#button_confirmar {
  margin-block-end: 2%;
  background-color: green;
  color: white;
}

#navbar {
  background-color: green;
}

#navbar-item {
  color: white;
  margin: 0 60px;
}

#navbar-image {
  color: white;
  margin: 0 20px;
}
</style>
