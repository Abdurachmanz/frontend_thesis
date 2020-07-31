<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>


#app {
  margin: 0px auto;
  max-width: 480px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  box-sizing: border-box;
}
</style>
