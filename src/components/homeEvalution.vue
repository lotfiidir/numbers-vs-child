<template>
  <div class="">
    <div>
        <h1>Bienvenu dans le mode évaluation</h1>
    </div>
    <div role="button" class="">
      <router-link :to="{ name: 'evaluation', params: { id:store.game.selectTable() }}">
        <h2>C'est partie</h2>
      </router-link>
    </div>
    <pre>{{ store }}</pre>
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