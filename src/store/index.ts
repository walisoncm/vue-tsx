import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import VuexPersist from 'vuex-persist'

import cart from './modules/cart'
import user from './modules/user'
import { Root } from './interfaces'

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Store<Root>({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    incrementBy (state, payload) {
      state.count += payload.val
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    incrementBy (context, payload) {
      context.commit('incrementBy', payload)
    }
  },
  plugins: [vuexPersist.plugin],
  modules: {
    cart,
    user
  }
})
