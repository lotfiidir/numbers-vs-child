<template>
  <div>
    <div class="operation">
      <h2>{{ $route.params.id }}</h2>
      <span>X</span>
      <h2>{{store.apprentisage.numberB}}</h2>
    </div>
    =
    <div class="response">
      <h2 v-for="response in store.apprentisage.responses">{{response}}</h2>
    </div>
    <div @click="next">next</div>
    <pre>{{ store }}</pre>
  </div>
</template>
<script>
  import store from "../store/store";

  export default {
    name: "tableMulti",
    data() {
      return {
        store: store,
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        const sa = store.apprentisage;
        sa.step = 1;
        sa.numberA = this.$route.params.id;
        sa.numberB = sa.arrayMulti[Math.floor(Math.random() * sa.arrayMulti.length)];
        sa.result = sa._operation(sa.numberA, sa.numberB);
        sa.responses.push(sa.result);
        sa.responses.push(sa.result - sa.numberB);
        sa.responses.push(sa.result + sa.numberB);
        sa.arrayMulti.splice(sa.arrayMulti.indexOf(sa.numberB), 1);
      }
      ,
      next() {
        const sa = store.apprentisage;
        if (sa.step == 10) {
          sa.done = true;
        }
        sa.step++;
        sa.responses = [];
        sa.numberB = sa.arrayMulti[Math.floor(Math.random() * sa.arrayMulti.length)];
        sa.result = sa._operation(sa.numberA, sa.numberB);
        sa.responses.push(sa.result);
        sa.responses.push(sa.result - sa.numberA);
        sa.responses.push(sa.result + sa.numberA);
        sa.arrayMulti.splice(sa.arrayMulti.indexOf(sa.numberB), 1);
      }
    }
  }
</script>

<style scoped>

</style>
