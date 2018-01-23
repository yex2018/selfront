import * as api from '../../api/assessmentApi'

const state = {
	assList:[],//测评列表
}

const actions = {
	/* 获取测评列表 */
	FETCH_ASSLIST:({commit,state},body) => {
		return api.getAssessmentList(body)
			.then(resp=>{
				let Data = resp.data.data
				commit('SET_ASSLIST',{Data})
			})
	}
}

const mutations = {
	SET_ASSLIST:(state,{Data}) => {
		state.assList = Data
	}
}

const getters = {
	activeAssList(state){
		return state.assList
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}