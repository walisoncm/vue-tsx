import { Module, ActionTree, GetterTree, MutationTree } from 'vuex'
import { CartItem } from '@/models/CartItem'
import { sha256 } from '@/utils/crypto'
import * as MathUtil from '@/utils/mathUtil'
import { Root } from '../interfaces'

const NAMESPACE = 'cart'
const types = {
  ADD_ITEM: 'ADD_ITEM',

  GET_LOCATION: 'GET_LOCATION',
  GET_TOTAL: 'GET_TOTAL',
  SET_LOCATION: 'SET_LOCATION'
}

interface State {
  items: CartItem[];
  location: {
    address: string;
    coord: {
      lat: number;
      lng: number;
    };
  };
  distance: {
    text: string;
    value: number;
  };
}

const sameItem = (item: CartItem) => (other: CartItem) => {
  const hash = sha256(
    [item.uuid, JSON.stringify([...item.addons].sort())].join('-')
  )

  return hash === other.hash
}

const itemTotal = (item: CartItem) => {
  const extra = item.addons.reduce((acc: number, cur) => acc + cur.price, 0)
  return (item.price + extra) * item.quantity
}

const itemHash = (item: CartItem) => {
  return sha256([item.uuid, JSON.stringify([...item.addons].sort())].join('-'))
}

const actions: ActionTree<State, any> = {}

const getters: GetterTree<State, any> = {
  [types.GET_LOCATION]: state => {
    return state.location
  },
  [types.GET_TOTAL]: state => {
    return MathUtil.sum(state.items.map(itemTotal))
  }
}

const mutations: MutationTree<State> = {
  [types.ADD_ITEM]: async (state, payload) => {
    const item = state.items.find(sameItem(payload.item))
    console.log('item', item, payload)

    if (item) {
      item.quantity += payload.item.quantity
    } else {
      state.items.push({
        ...payload.item,
        hash: itemHash(payload.item)
      })
    }
  },
  [types.SET_LOCATION]: async (state, payload) => {
    state.location = payload.location
  }
}

const initialState = (): State => ({
  location: {
    address: '',
    coord: {
      lat: 0,
      lng: 0
    }
  },
  distance: {
    text: '',
    value: 0
  },
  items: []
})

const module: Module<State, Root> = {
  namespaced: true,
  state: () => initialState(),
  getters,
  actions,
  mutations
}

export default module
export { NAMESPACE, types }
