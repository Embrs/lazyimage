<template lang="pug">
  #app
    .img
      LazyImage(:src="src" :width="100" :height="100")
</template>

<script>
import LazyImage from './components/LazyImage'

export default {
  name: 'App',
  components: {
    LazyImage
  },
  data() {
    return {
      src: "https://storagea.googleapis.com/relithe-dev/Category/brand/600fc5c0176f148e9a6bbc69.png?hash=L36t:vyZI;WC^jbcS$xZMcRPg3xa"
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 1000px;
  .img {
    width: 200px;
    height: 300px;
    background: #aaa;
  }
}
</style>
