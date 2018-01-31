<template>
  <div>
    <div class="btn-aside-wraper" @click="showAside = !showAside" v-bind:class="{rotate: showAside}">
      <div class="btn-aside"></div>
    </div>
    <div class="modal-addchild" v-if="!childAdded">
      <h2>Ajout d'un enfant</h2>
      <input type="text" autofocus autocomplete="off"
             placeholder="Pseudo de l'enfant..."
             @keyup.enter="addChild"/>
    </div>
    <div>
      <aside v-show="childAdded" v-bind:class="{show :showAside}">
        <section class="child-container">
          <div class="header">
            <h1>Enfants</h1>
            <input autofocus autocomplete="off"
                   placeholder="Ajouter..."
                   class="new-child"
                   @keyup.enter="addChild"/>
          </div>
          <section class="main">
            <ul class="child-list">
              <li class="child" v-for="enfant in enfants">
                <p @click="changeChild(enfant.pseudo)" v-bind:class="{active:(enfant.pseudo == store.game.currentPlayer)}">{{enfant.pseudo}}</p>
              </li>
            </ul>
          </section>
        </section>
      </aside>
      <div class="wrap-number">
        <div class="box-apprenti box-choice" v-bind:class="{added:!childAdded}">
          <router-link to="/apprentissage">
            <h2> Je revise mes tables</h2>
            <img :src="imageApprentissage" width="200" alt="image apprentissage">
          </router-link>
        </div>
        <div class="box-eval box-choice" v-bind:class="{added:!(childAdded && !store.game.locked)}">
          <div v-bind:class="{locked : store.game.locked}">
            <router-link to="/evaluation">
              <h2>Je teste mon niveau</h2>
              <img :src="imageEvalaluation" width="200" alt="image evaluation">
            </router-link>
          </div>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
  import store from "../store/store";
  import imageApprentissage from "../assets/images/apprentissagemode.png";
  import imageEvalaluation from "../assets/images/evaluationmode.png";

  export default {
    name: "home",
    data() {
      return {
        store: store,
        showAside: false,
        childAdded: store.game.fetchChildrens().length !== 0,
        enfants: store.game.fetchChildrens(),
        imageApprentissage: imageApprentissage,
        imageEvalaluation: imageEvalaluation,
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.childAdded) {
        next();
      }
    },
    methods: {
      addChild(e) {
        const child = e.target.value;
        this.$nextTick(function () {
          this.enfants = store.game.fetchChildrens();
        });
        store.game.createChild(child);
        if (this.enfants.length < 1) {
          this.childAdded = !this.childAdded;
          store.game.setCurrentChild(child);
          this.store.game.currentPlayer = store.game.getCurrentChild().pseudo;
        }
      },
      changeChild(e){
        this.$nextTick(()=>{
          store.game.currentPlayer = e;
          }
        );
        store.game.setCurrentChild(e);
      }
    },
  }
</script>

<style scoped>

</style>
