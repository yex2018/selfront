import Vue from 'vue'
import Vuex from 'vuex'
import assessment from './modules/assessment'
import course from './modules/course'
import mine from './modules/mine'
import loading from './modules/loading'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules:{
		assessment,
		course,
		mine,
		loading
	}
})

export default store