<template>
  <div id="app">
    <loading v-show="LOADING"></loading>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Loading from 'components/loading'
import storage from '@/utils/storage'
import jwtDecode from 'jwt-decode'
import { isEmpty } from '@/utils/index'

export default {
  created() {
    if (storage.get('token')) {
      const decode = jwtDecode(storage.get('token'))
      this.$store.dispatch('setAuthenticated', isEmpty(decode))
      this.$store.dispatch('setUser', decode)
    }
  },
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
