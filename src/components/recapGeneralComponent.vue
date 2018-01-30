<template>
  <div>
    <h1>Récapitulatif</h1>
    <!--<div v-for="items in store.game.recapNow">
      <p>{{items.a}} X {{items.b}} =</p><span v-for="item in items">{{item}}</span>
    </div> -->
    <h4>Statistiques de {{ this.store.game.getCurrentChild().pseudo.toUpperCase() }}</h4>
    <!-- <div v-if="store.game.getCurrentPartie() == 'apprentissage'">
        <h4>Apprentissage du {{ this.store.game.getCurrentChild() }}</h4>
    </div>
    <div v-else>
        <h4>Évaluation du {{ parseDate() }}</h4>
        <div v-for="operation in store.game.getOperation().operations">
          <p>
            <span>{{ operation.operandeA }}</span> X <span>{{ operation.operandeB }}</span> = 
            <span>{{ operation.response }}</span> <span v-show="operation.echec">la bonne réponse était {{ operation.operandeA*operation.operandeB }}</span>
          </p>
        </div>
        {{ store.game.getOperation() }}
    </div> -->
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
