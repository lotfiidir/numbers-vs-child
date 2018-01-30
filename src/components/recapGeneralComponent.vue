<template>
  <div>
    <h1>Récapitulatif</h1>
    <h4>Statistiques de {{ this.store.game.getCurrentChild().pseudo.toUpperCase() }}</h4>
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
        chartData: {
          sets: [
            {
              generators: [svgArea(), svgLine(), svgScatter()],
              graphs: [
                {
                  label: 'area 1',
                  values: [
                    {x: 1, y: 25},
                    {x: 2, y: 38},
                    {x: 3, y: 24},
                    {x: 4, y: 60},
                    {x: 5, y: 22}
                  ]
                },
                {
                  label: 'area 2',
                  values: [
                    {x: 1, y: 15},
                    {x: 2, y: 8},
                    {x: 3, y: 54},
                    {x: 4, y: 22},
                    {x: 5, y: 20}
                  ]
                }
              ]
            }
          ]
        }
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
        for (var i = 0; i < child.evaluations.length; i++) {
          var item = child.evaluations[i];
          //console.log("EVAL ITEM", item.operations);
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
