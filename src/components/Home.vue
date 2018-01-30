<template>
  <div>
    <div class="modal-addchild" v-if="!childAdded">
      <h2>Ajout d'un enfant</h2>
      <input type="text" autofocus autocomplete="off"
             placeholder="Pseudo de l'enfant..."
             @keyup.enter="addChild"/>
    </div>
    <div>
      <aside v-show="childAdded">
        <section class="child-container">
          <div class="header">
            <h1>Enfants</h1>
            <input autofocus autocomplete="off"
                   placeholder="Pseudo..."
                   class="new-child"
                   @keyup.enter="addChild"/>
          </div>
          <section class="main">
            <ul class="child-list">
              <li class="child" v-for="enfant in enfants">
                <p @click="store.game.setCurrentChild(enfant.pseudo)">{{enfant.pseudo}}</p>
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
  </div>
</template>
<script>
  import store from "../store/store";

  export default {
    name: "home",
    data() {
      return {
        store: store,
        childAdded: store.game.fetchChildrens().length !== 0,
        enfants: store.game.fetchChildrens(),
        image: {
          apprenti: '../assets/images/apprenti-mode.png',
          eval: '../assets/images/eval-mode.png',
        }
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
        }
      }
    },
  }
</script>

<style scoped>

</style>
