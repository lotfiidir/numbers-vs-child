<template>
    <div class="evalution-content">
      <h2>Alors, prêt pour petit test ?</h2>
      <p>Des questions te seront posées sur une table et tu dois cliquer sur la réponse.</p>
      <div role="button" class="router">
        <router-link :to="{ name: 'evaluation', params: { id:store.game.selectTable() }}">
          <h2>Lancer la partie</h2>
        </router-link>
      </div>
    </div>
</template>

<script>
  import store from "../store/store";

  export default {
    name: "homeEvalution",
    data() {
      return {
        store: store
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>