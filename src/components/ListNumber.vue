<template>
  <div class="wrap-number">
    <p role="button" class="number" v-for="n in 10" @click="store.currentNumber = n">
      {{ n }}
    </p>
    <pre>{{ store }}</pre>
  </div>
</template>

<script>
    import Number from "./Number";
    import store from "../store/store";

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
