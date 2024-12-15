import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex);

const actions = {
    // setFuzhi01({ commit }, value) {
    //     commit('FUZHI01', value);
    // }
}

const mutations = {
    FUZHI01(state, value) {
        state.pievalue = value
    },
    FUZHI02(state, value) {
        state.id=value
    },
    FUZHI03(state, value) {
        state.allData = value
    },
    FUZHI04(state, value) {
        state.num = value
    },
    FUZHI05(state, value) {
        state.objectiveData=value
    }
}

const state = {
    pievalue: true,
    id: 0,
    allData: [],
    num: 0,
    objectiveData:[]
}
export default new Vuex.Store({
    actions,
    mutations,
    state,
})