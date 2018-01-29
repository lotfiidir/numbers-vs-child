<template>
  <div>
    <div @click="store.evaluation.step = 10">jump</div>
    <div class="progress-bar" v-bind:style="{ width: 10 * store.evaluation.step + '%' }">
      <p>
        {{store.evaluation.step}}
      </p>
    </div>
    <div class="operation">
      <h2>{{ $route.params.id }}</h2>
      <span class="multiplicator"></span>
      <h2>{{store.evaluation.operandeB}}</h2>
    </div>
    <div class="equal"></div>
    <div class="response number">
      <h2 v-for="response in store.evaluation.responses" @click="next(response, $event)">{{response}}</h2>
    </div>
    <div class="minuetrie">{{datenow}}</div>
    <div class="modal" v-if="store.evaluation.done">
      <div>
        <h2>Bravoooo !</h2>
        <router-link :to="{ name: 'homeEvalution'}">
          Refaire la table de {{store.evaluation.operandeA}}
        </router-link>
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
  import Children from "../store/children";
  import moment from 'moment';

  export default {
    name: "evaluationComponent",
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
        var serie = {
          "serie": this.datenow, "operations": []
        };
        var child = store.evaluation.getCurrentChild();
        child.evaluations.push(serie);
        console.log("ITEM ",child);
        store.evaluation.updateChildren(child);
        store.evaluation.initialization(this.$route.params.id);
      },
      next(response, $event) {
        const eval_store = store.evaluation;
        /*let titi = new Children("Mami", [], []);
        var titi = {
          "pseudo": "Mami", "apprentissages":[], "evaluations":[]
        };*/
        //console.log("CREATE ", eval_store.createChild(titi));
        //console.log("CREATE ", eval_store.setCurrentChild("Mami"));
        console.log("GET ITEM", eval_store.getCurrentChild());
        const answer = {};
        answer.step = eval_store.step;
        answer.operandeA = eval_store.operandeA;
        answer.operandeB = eval_store.operandeB;
        answer.select = response;
        answer.echec = false;

        if (eval_store.result != response) {
          answer.echec = true;
        }
        eval_store.stories.push(answer);
        
        setTimeout(() => {
          if (eval_store.step > 9) {
            eval_store.done = true;
            return;
          }
          eval_store.nextEtape();
        }, 300);
      }
    }
  }
</script>

<style scoped>

</style>
