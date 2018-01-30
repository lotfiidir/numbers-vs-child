<template>
  <div>
    <div class="progress-bar" v-bind:style="{ width: 10 * store.game.getCurrentPartie().step + '%' }">
      <p>
        {{store.game.getCurrentPartie().step}}/10
      </p>
    </div>
    <div class="operation">
      <h2>{{ $route.params.id }}</h2>
      <span class="multiplicator"></span>
      <h2>{{store.game.getCurrentPartie().operandeB}}</h2>
    </div>
    <div class="equal"></div>
    <div class="response number">
      <h2 v-if="response != 'NaN'" v-for="response in store.game.getCurrentPartie().responses" @click="next(response, $event)">
        {{response}}</h2>
    </div>
    <div class="modal" v-if="store.game.getCurrentPartie().done">
      <div>
        <h2>Bravoooo !</h2>
        <a href="" @click="init">
          Refaire la table de {{store.game.getCurrentPartie().operandeA}}
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
        store.game.init("apprentissage", this.$route.params.id);
      },
      next(response, $event) {
        const apprenti_store = store.game;
        const item_part = store.game.getCurrentPartie();

        if (item_part.result != response) {
          $event.currentTarget.classList.add('response-bad');
          return;
        }
        $event.currentTarget.classList.add('response-good');
        setTimeout(() => {
          if (item_part.step > 9) {
            this.$router.push({name: 'recap', params: {name: 'recap'}});
            item_part.done = true;
            eval_store.setCurrentPartie(item_part);
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
