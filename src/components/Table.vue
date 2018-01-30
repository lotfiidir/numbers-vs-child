<template>
  <div>
    <div class="progress-bar" v-bind:style="{ width: 10 * store.game.getCurrentPartie().step + '%' }">
      <p>
        {{store.game.getCurrentPartie().step}}
      </p>
    </div>
    <div class="operation">
      <h2>{{ $route.params.id }}</h2>
      <span class="multiplicator"></span>
      <h2>{{store.game.getCurrentPartie().operandeB}}</h2>
    </div>
    <div class="equal"></div>
    <div class="response number">
      <h2 v-for="response in store.game.getCurrentPartie().responses" @click="next(response, $event)">{{response}}</h2>
    </div>
    <div class="minuetrie">{{datenow}}</div>
    <pre>{{ store }}</pre>
  </div>
</template>
<script>
  import store from "../store/store";
  import Children from "../store/children";
  import moment from 'moment';

  export default {
    name: "tableMulti",
    data() {
      return {
        store: store,
        datenow: "",
      }
    },
    mounted: function () {
      this.time();
    },
    created() {
      this.init()
    },
    methods: {
      time() {
        const newDate = new Date();
        setInterval(() => {
          this.datenow = moment(new Date() - newDate).format('mm:ss:SS');
        }, 30)
      },
      init() {
        /*
        var serie = {
          "serie": new Date(), "operations": []
        };
        var child = store.game.getCurrentChild();
        child.evaluations.push(serie);
        //console.log("ITEM ",child);
        store.game.updateChildren(child);*/
        //store.game.initialization(this.$route.params.id);
        store.game.init("apprentissage", this.$route.params.id);
      },
      next(response, $event) {
        const eval_store = store.game;
        const item_part = store.game.getCurrentPartie();
        /*let titi = new Children("Mami", [], []);
        var titi = {
          "pseudo": "Mami", "apprentissages":[], "evaluations":[]
        };*/
        //console.log("CREATE ", eval_store.createChild(titi));
        //console.log("CREATE ", eval_store.setCurrentChild("Mami"));
        //console.log("GET ITEM", eval_store.getCurrentChild());
        const operation = {};
        operation.step = item_part.step;
        operation.operandeA = item_part.operandeA;
        operation.operandeB = item_part.operandeB;
        operation.response = response;
        operation.echec = false;

        if (item_part.result != response) {
          operation.echec = true;
          $event.currentTarget.classList.add('response-bad');
          this.updateBestResponse(item_part.result);
        } else {
          $event.currentTarget.classList.add('response-good');
        }
        eval_store.setOperation(operation);
        setTimeout(() => {
          if (item_part.step > 9) {
            item_part.done = true;
            eval_store.setCurrentPartie(item_part);
            this.$router.push({name: 'recap', params: {name: 'recap'}});
            return;
          }
          eval_store.nextEtape();
          let childResponse = document.querySelectorAll('.response h2');
          childResponse.forEach(function (element) {
            element.classList.remove('response-bad');
            element.classList.remove('response-good');
          });
        }, 400);
      },
      updateBestResponse(response){
        let childResponse = document.querySelectorAll('.response h2');
        childResponse.forEach(function (element) {
          if(element.innerHTML == response){
            element.classList.add('response-good');
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
