<template>
  <div class="wrap-number">
    <div role="button" class="number" v-for="num in 10">
      <router-link :to="{ name: 'tableMulti', params: { id:num }}">
        {{ num }}
      </router-link>
    </div>
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
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
