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
      <h2 v-for="response in store.game.getCurrentPartie().responses" @click="next(response, $event)">{{response}}</h2>
    </div>
    <div class="minuetrie" v-show="false">{{datenow}}</div>
  </div>
</template>
<script>
  import store from "../store/store";
  import moment from 'moment';
  export default {
    name: "tableMulti",
    data() {
      return {
        store: store,
        datenow: "",
      }
    },
    created() {
      this.init()
    },
    mounted: function () {
      this.time();
    },
    methods: {
      time() {
        const newDate = new Date();
        setInterval(() => {
          this.datenow = moment(new Date() - newDate).format('mm:ss:SS');
        }, 30)
      },
      init() {
        store.game.init("apprentissage", this.$route.params.id);
      },
      next(response, $event) {
        const eval_store = store.game;
        const item_part = store.game.getCurrentPartie();
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
        setTimeout(() => {
        let childResponse = document.querySelectorAll('.response h2');
          childResponse.forEach(function (element) {
            if(element.innerHTML == response){
              element.classList.add('response-good');
            }
          })
        }, 200);
      }
    }
  }
</script>

<style scoped>

</style>
