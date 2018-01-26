<template>
  <div>
    <div @click="store.apprentisage.step = 10">jump</div>
    <div class="progress-bar" v-bind:style="{ width: 10 * store.apprentisage.step + '%' }">
      <p>
        {{store.apprentisage.step}}
      </p>
    </div>
    <div class="operation">
      <h2>{{ $route.params.id }}</h2>
      <span class="multiplicator"></span>
      <h2>{{store.apprentisage.numberB}}</h2>
    </div>
    <div class="equal"></div>
    <div class="response number">
      <h2 v-for="response in store.apprentisage.responses" @click="next(response, $event)">{{response}}</h2>
    </div>
    <div class="minuetrie">{{datenow}}</div>
    <div class="modal" v-if="store.apprentisage.done">
      <div>
        <h2>Bravoooo !</h2>
        <router-link :to="{ name: 'tableMulti', query: { essai:'' }}">
          Refaire la table de {{store.apprentisage.numberA}}
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
        const sa = store.apprentisage;
        sa.responses = [];
        sa.numberA = this.$route.params.id;
        sa.numberB = sa.arrayMulti[Math.floor(Math.random() * sa.arrayMulti.length)];
        sa.result = sa._operation(sa.numberA, sa.numberB);
        sa.responses.push(sa.result);
        sa.responses.push(sa.result - sa.numberB);
        sa.responses.push(sa.result + sa.numberB);
        let shuffled = sa.responses.sort(function () {
          return .5 - Math.random()
        });
        shuffled.slice(0, 3);
        sa.arrayMulti.splice(sa.arrayMulti.indexOf(sa.numberB), 1);
      },
      next(response, $event) {
        const sa = store.apprentisage;
        if (sa.result != response) {
          $event.currentTarget.classList.add('response-bad');
          return;
        }
        $event.currentTarget.classList.add('response-good');

        setTimeout(() => {
          if (sa.step > 9) {
            sa.done = true;
            return;
          }

          sa.step++;
          sa.responses = [];
          sa.numberB = sa.arrayMulti[Math.floor(Math.random() * sa.arrayMulti.length)];
          sa.result = sa._operation(sa.numberA, sa.numberB);
          sa.responses.push(sa.result);
          sa.responses.push(sa.result - sa.numberA);
          sa.responses.push(parseInt(sa.result + sa.numberB));
          let shuffled = sa.responses.sort(function () {
            return .5 - Math.random()
          });
          shuffled.slice(0, 3);
          sa.currentTime.push(this.datenow);
          sa.arrayMulti.splice(sa.arrayMulti.indexOf(sa.numberB), 1);
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
