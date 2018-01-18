<template>
  <div class="wrap-number">
    <p role="button" class="number" v-for="num in 10" @click.prevent="getNumbers(num)">
      <router-link :to="{ name: 'tableMulti', params: { id:num }}">
        {{ num }}
      </router-link>
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
    }, computed: {},
    methods: {
      getNumbers(current) {
        const sa = store.apprentisage;
        sa.step = 1;
        sa.responses = [];
        sa.numberA = current;
        sa.numberB = sa.arrayMulti[Math.floor(Math.random() * sa.arrayMulti.length)];
        sa.result = sa._operation(sa.numberA, sa.numberB);
        sa.responses.push(sa.result);
        sa.responses.push(sa.result - sa.numberB);
        sa.responses.push(sa.result + sa.numberB);
        sa.arrayMulti.splice(sa.arrayMulti.indexOf(sa.numberB), 1);
      }
    }
  }
</script>

<style scoped>

</style>
