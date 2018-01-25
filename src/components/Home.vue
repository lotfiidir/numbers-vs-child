<template>
  <div class="wrap-number">
    <div class="box-apprenti box-choice">
      <router-link to="/apprentissage">
        <h2> Mode apprentissage</h2>
      </router-link>
    </div>
    <div class="box-eval box-choice">
      <router-link to="/evaluation">
        <h2>Mode évaluation</h2>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "home",
  }
</script>

<style scoped>

</style>
