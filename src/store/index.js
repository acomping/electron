import Vue from 'vue'
import Vuex from 'vuex'

import specimen from "./modules/specimen.js"

Vue.use(Vuex)

const state = {}

const getters = {

}

const mutations = {

}

const actions = {

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        specimen  // specimen模块命名为specimen，要在specimen.js声明namespaced: true才有用
    }
})
