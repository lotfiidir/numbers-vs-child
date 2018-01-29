<template>
  <div class="wrap-number">
    <div class="box-apprenti box-choice">
      <router-link to="/apprentissage">
        <h2> Je revise mes tables</h2>
        <img :src="image.apprenti" width="200" alt="image apprentissage">
      </router-link>
    </div>
    <div class="box-eval box-choice">
      <router-link to="/evaluation">
        <h2>Je teste mon niveau</h2>
        <img :src="image.eval" width="200" alt="image evaluation">
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "home",
    data(){
      return {
        image : {
          apprenti: '../assets/images/apprenti-mode.png',
          eval: '../assets/images/eval-mode.png',
        }
      }
    }
  }
</script>

<style scoped>

</style>
