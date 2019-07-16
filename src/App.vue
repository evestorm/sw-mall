<template>
  <div id="app">
    <loading v-show="LOADING"></loading>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loading from 'components/loading'
export default {
  computed: {
    ...mapState([
      'LOADING'
    ])
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus">
html,
body,
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  width 100%
  height 100%
</style>
