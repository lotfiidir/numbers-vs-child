<template>
  <div id="app">
    <div id="header">
      <div id="logo">
        <router-link to="/">
          <h2>Numbers VS Child</h2>
        </router-link>
      </div>
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
