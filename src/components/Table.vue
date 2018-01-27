<template>
  <div>
    <div @click="store.apprentisage.step = 10">jump</div>
    <div class="progress-bar" v-bind:style="{ width: 10 * store.apprentisage.step + '%' }">
      <p>
        {{store.apprentisage.step}}/10
      </p>
    </div>
    <div class="operation">
      <h2>{{ $route.params.id }}</h2>
      <span class="multiplicator"></span>
      <h2>{{store.apprentisage.operandeB}}</h2>
    </div>
    <div class="equal"></div>
    <div class="response number">
      <h2 v-if="response != 'NaN'" v-for="response in store.apprentisage.responses" @click="next(response, $event)">
        {{response}}</h2>
    </div>
    <div class="modal" v-if="store.apprentisage.done">
      <div>
        <h2>Bravoooo !</h2>
        <a href="" @click="init">
          Refaire la table de {{store.apprentisage.operandeA}}
        </a>
        <router-link :to="{ name: 'recap', params: {name:'recap'}}">
          Récapitulatif
        </router-link>
      </div>
      <router-view></router-view>
    </div>
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
    mounted: function () {
      this.init();
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        store.apprentisage.initialization(this.$route.params.id);
      },
      next(response, $event) {
        const apprenti_store = store.apprentisage;

        if (apprenti_store.result != response) {
          $event.currentTarget.classList.add('response-bad');
          return;
        }
        $event.currentTarget.classList.add('response-good');
        setTimeout(() => {
          if (apprenti_store.step > 9) {
            this.$router.push({name: 'recap', params: {name: 'recap'}});
            apprenti_store.done = true;
            return;
          }
          apprenti_store.nextEtape();
          let childResponse = document.querySelectorAll('.response h2');
          childResponse.forEach(function (element) {
            element.classList.remove('response-bad');
            element.classList.remove('response-good');
          });
        }, 300);
      }
    }
  }
</script>

<style scoped>

</style>
