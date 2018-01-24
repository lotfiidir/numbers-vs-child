<template>
  <div>
    <div class="operation">
      <h2>{{ $route.params.id }}</h2>
      <span class="multiplicator"></span>
      <h2>{{store.apprentisage.numberB}}</h2>
    </div>
    <div class="equal"></div>
    <div class="response number">
      <h2 v-bind:class="{ 'response-good': isCorrect, 'response-bad': isNotCorrect }"
          v-for="response in store.apprentisage.responses" @click="next(response,$event)">{{response}}</h2>
    </div>
    <div class="minuetrie">{{datenow}}</div>
    <div class="modal" v-if="store.apprentisage.done">
      <h2>Bravoooo !</h2>
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
        isCorrect: false,
        isNotCorrect: false,
      }
    },
    mounted: function() {
      this.time()
    },
    created() {
      this.init()
    },
    methods: {
      time() {
        const self = this;
        this.datenow = moment().format('mm:ss');
        setInterval(self.time, 1000)
      },
      init() {
        const sa = store.apprentisage;
        /*const initTime = new Date();
        setInterval(() => {
          sa.time = timeFormat(new Date() - initTime);
          console.log(sa.time);
        },30);*/

        sa.step = 1;
        sa.responses = [];
        this.isCorrect = false;
        this.isNotCorrect = false;
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
        console.log('PASSSEEDDDD');
      },
      next(response, $event) {
        this.isCorrect = false;
        this.isNotCorrect = false;
        const sa = store.apprentisage;
        if (sa.step > 10) {
          sa.done = true;
        }
        if (sa.result != response) {
          $event.currentTarget.classList.add('response-bad');
          console.log($event.currentTarget);
          return;
        }
        $event.currentTarget.classList.add('response-good');

        setTimeout(() => {
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
          sa.arrayMulti.splice(sa.arrayMulti.indexOf(sa.numberB), 1);
        }, 2000);

        $event.currentTarget.classList.remove('response-good');
        $event.currentTarget.classList.remove('response-bad');
      }
    }
  }
</script>

<style scoped>

</style>
