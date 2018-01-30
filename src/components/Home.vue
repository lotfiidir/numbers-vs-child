<template>
  <div>
    <div class="modal-addchild" v-if="!childAdded">
      <h2>Ajout d'un enfant</h2>
      <input type="text" autofocus autocomplete="off"
             placeholder="Pseudo de l'enfant..."
             v-model="enfant"
             @keyup.enter="addChild(enfant)" />
    </div>
    <aside v-show="childAdded">
      <section class="child-container">
        <div class="header">
          <h1>Enfants</h1>
          <input autofocus autocomplete="off"
                 placeholder="Pseudo..."
                 class="new-child"
                 v-model="enfant"
                 @keyup.enter="addChild(enfant)" />
        </div>
        <section class="main">
          <ul class="child-list">
            <li class="child">
              <div class="view" v-for="enfant in enfants">
                <label>{{enfant.pseudo}}</label>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </aside>
    <div class="wrap-number">
      <div class="box-apprenti box-choice">
        <router-link to="/apprentissage">
          <h2> Je revise mes tables</h2>
          <img :src="image.apprenti" width="200" alt="image apprentissage">
        </router-link>
      </div>
      <div class="box-eval box-choice">
        <router-link to="/evaluation">
          <h2>Je teste mon niveau</h2>
          <img :src="image.eval" width="200" alt="image evaluation">
        </router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>
<script>
  import store from "../store/store";
  export default {
    name: "home",
    data() {
      return {
        store: store,
        childAdded: false,
        enfants: store.evaluation.fetchChildrens(),
        image: {
          apprenti: '../assets/images/apprenti-mode.png',
          eval: '../assets/images/eval-mode.png',
        }
      }
    },
    methods: {
      addChild(enfant){
        store.evaluation.createChild(enfant);
        this.childAdded = !this.childAdded;
        this.enfants = store.evaluation.fetchChildrens();
      }
    }
  }
</script>

<style scoped>

</style>
