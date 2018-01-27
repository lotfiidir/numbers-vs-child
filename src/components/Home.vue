<template>
  <div class="wrap-number">
    <div class="box-apprenti box-choice">
      <router-link to="/apprentissage">
        <h2> Je revise mes tables</h2>
      </router-link>
    </div>
    <div class="box-eval box-choice">
      <router-link to="/evaluation">
        <h2>Je teste mon niveau</h2>
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
