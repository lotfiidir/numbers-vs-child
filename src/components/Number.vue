<template>
  <div>
    <p>{{ store.number }}</p>
  </div>
</template>

<script>
  import store from '../store/store'

  export default {
    name: "number",
    data() {
      return {
        store: store
      }
    }
  }
</script>

<style scoped>

</style>
