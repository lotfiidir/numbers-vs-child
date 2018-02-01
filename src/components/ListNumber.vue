<template>
  <div class="wrap-number">
    <div role="button" class="number" v-for="num in 10" v-bind:class="{'table-done': isChecked(num)}">
      <router-link :to="{ name: 'tableMulti', params: { id:num }}">
        {{ num }}
      </router-link>
    </div>
  </div>
</template>

<script>
  import store from "../store/store";

  export default {
    name: "list-number",
    data() {
      return {
        store: store
      }
    },
    methods:{
      isChecked(table_id){
        var apprentissages = store.game.getAvancements();
        return apprentissages.includes(table_id)
      }
    }
  }
</script>

<style scoped>

</style>
