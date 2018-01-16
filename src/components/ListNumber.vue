<template>
  <div>
    <div v-for="n in 10" @click="store.currentNumber = n">
      {{ n }}
    </div>
    <pre>{{ store }}</pre>
  </div>
</template>

<script>
    import Number from "./Number";
    import store from "../store";

    export default {
      components: {Number},
      name: "list-number",
    data() {
      return {
        store: store
      }
    }
    }
</script>

<style scoped>

</style>
