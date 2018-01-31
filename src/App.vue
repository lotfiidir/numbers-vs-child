<template>
  <div id="app">
    <div id="header">
      <div class="name-current-child">
        <h2>{{store.game.currentPlayer}}</h2>
      </div>
      <div id="logo">
        <router-link to="/">
          <h2>Numbers VS Child</h2>
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import store from './store/store'

  export default {
    name: 'App',
    data() {
      return {
        store: store,
      }
    },
    mounted(){
      if(store.game.getCurrentChild() != null){
        store.game.currentPlayer = store.game.getCurrentChild().pseudo;
      }
    }
  }
</script>

<style>
  @import "assets/css/style.css";
</style>
