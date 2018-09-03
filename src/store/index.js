import Vue from 'vue'
import Vuex from 'vuex'
import nav from './module/nav'
import routeState from './module/routeState'
import organiZation from './module/organiZation'
import userStati from './module/userStati'

let modules={
	nav,
	routeState,
	organiZation,
	userStati
}
Vue.use(Vuex);
export default new Vuex.Store({
	modules
})

