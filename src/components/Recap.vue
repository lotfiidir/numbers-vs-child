<template>
  <div>
    <router-link class="back-link" to="/apprentissage" v-if="store.game.getCurrentPartie().mode == 'apprentissage'">
        <h3>Retour</h3>
    </router-link>
    <h1>Récapitulatif</h1>
    <div class="recap-content">
      <div v-if="store.game.getCurrentPartie().mode == 'apprentissage'">
          <h2>Séance d'apprentissage du {{ parseDate() }}</h2>
          <div v-for="operation in store.game.getOperation().operations" class="partie-recap">
            <div class="operandes-row">
              <h2>{{ operation.operandeA }}</h2>
              <span class="multiplicator"></span>
              <h2>{{ operation.operandeB }}</h2>
            </div>
            <div class="operandes-row equalizer">
                <span class="equal"></span>
            </div>
            <div class="operandes-row response">
              <h2 v-if="!operation.echec" class="response-good">{{ operation.response }}</h2>
              <h2 v-else class="response-bad">{{ operation.response }}</h2>
              <span v-show="operation.echec" class="response-msg">la bonne réponse était </span>
              <h2 v-show="operation.echec" class="response-good">{{ operation.operandeA*operation.operandeB }}</h2>
            </div>
          </div>
      </div>
      <div v-else>
          <h2>Séance d'évaluation du {{ parseDate() }}</h2>
          <div v-for="operation in store.game.getOperation().operations" class="partie-recap">
            <div class="operandes-row">
              <h2>{{ operation.operandeA }}</h2>
              <span class="multiplicator"></span>
              <h2>{{ operation.operandeB }}</h2>
            </div>
            <div class="operandes-row equalizer">
                <span class="equal"></span>
            </div>
            <div class="operandes-row response">
              <h2 v-if="!operation.echec" class="response-good">{{ operation.response }}</h2>
              <h2 v-else class="response-bad">{{ operation.response }}</h2>
              <span v-show="operation.echec" class="response-msg">la bonne réponse était </span>
              <h2 v-show="operation.echec" class="response-good">{{ operation.operandeA*operation.operandeB }}</h2>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from "../store/store";

  export default {
    name: "recap",
    data() {
      return {
        store: store
      }
    },
    methods: {
      parseDate(){
        var date = new Date(store.game.getOperation().date);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options) + " à " + date.toLocaleTimeString('fr-FR');
      }
    }

  }
</script>

<style scoped>

</style>
