<template>
  <div>
    <h1>Récapitulatif général</h1>
    <div class="recap-general">
      <h2>Les statistiques de {{ this.store.game.getCurrentChild().pseudo.toUpperCase() }}</h2>
    </div>
    <div class='chart'>
        <!-- import font awesome for legend icons -->
        <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'>
        <chart-axis :data='getHistorics()'></chart-axis>
    </div>
  </div>
</template>

<script>
  import store from "../store/store";
  import { svgArea, svgLine, svgScatter } from 'd2b'
  import { ChartAxis } from 'vue-d2b'

  export default {
    name: "recap",
    data() {
      return {
        store: store,
      }
    },
    components: {
      ChartAxis
    },
    methods: {
      parseDate(){
        var date = new Date(store.game.getOperation().date);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options) + " à " + date.toLocaleTimeString('fr-FR');
      },
      getHistorics(){
          
        var child = this.store.game.getCurrentChild();
        var apprentissage = {label: 'Apprentissage', values: []};
        apprentissage.values.push({x:0, y:0});
        for (var i = 0; i < child.apprentissages.length; i++) {
          var item = child.apprentissages[i];
          var res = 0;
          for (var j = 0; j < item.operations.length; j++) {
              var operation = item.operations[j];
              if(! operation.echec){
                  res++;
              }
          }   
          apprentissage.values.push({x:i+1, y:res});           
        }

        var evaluation = {label: 'Évaluations', values: []};
        evaluation.values.push({x:0, y:0});
        for (var i = 0; i < child.evaluations.length; i++) {
          var item = child.evaluations[i];
          var res = 0;
          for (var j = 0; j < item.operations.length; j++) {
              var operation = item.operations[j];
              if(! operation.echec){
                  res++;
              }
          }   
          evaluation.values.push({x:i+1, y:res});           
        }

        var chartData = {
            sets: [{
                generators: [svgArea(), svgLine(), svgScatter()],
                graphs: [apprentissage, evaluation]
            }]
        };
        return chartData;
      }
    }
  }
</script>

<style scoped>
  .chart{
    width: 100%;
    height: 500px;
  }
</style>
