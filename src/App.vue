<template>
  <div id="app">
    <div id="header">
      <div id="logo">
        <router-link to="/">
          <h2>Numbers VS Child</h2>
        </router-link>
      </div>
      <nav>
        <ul>
          <li><router-link to="/apprentissage">Apprentissage</router-link></li>
          <li><router-link to="/evaluation">Evaluation</router-link></li>
          <li><router-link to="/info">Info</router-link></li>
        </ul>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "assets/css/style.css";
</style>
