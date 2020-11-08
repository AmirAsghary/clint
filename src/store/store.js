import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        dick: 'lick my balls this many times: ',
        times: 2
    },
    mutations: {
        increment (state, amount){
            return state.times = state.times + amount;
        }
    },
    actions: {
        increment (context, amount) {
            context.commit('increment', amount)
        }
    }})
export default store;