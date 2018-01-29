<template>
  <div id="app">
    <div id="header">
      <div><a href="#" @click="modal = !modal">Ajouter un enfant</a></div>
      <div id="logo">
        <router-link to="/">
          <h2>Numbers VS Child</h2>
        </router-link>
      </div>
    </div>
    <div class="modal-addchild" v-if="modal">
      <h2>Ajout d'un enfant</h2>
      <input type="text" v-model="enfant" />
      {{enfant}}
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
data(){
  return {
    modal: false,
    enfant: '',
    }
  },
  methods: {
  }
}
</script>

<style>
@import "assets/css/style.css";
</style>
