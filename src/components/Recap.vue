<template>
  <div>
    <h1>Récapitulatif</h1>
    <div v-for="items in store.apprentisage.recapNow">
      <p>{{items.a}} X {{items.b}} =</p><span v-for="item in items">{{item}}</span>
    </div>
  </div>
</template>

<script>
  import store from "../store/store";

  export default {
    name: "recap",
    data() {
      return {
        store:store
      }
    },

  }
</script>

<style scoped>

</style>
