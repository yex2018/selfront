import * as api from '../../api/mineApi'

const state = {
	userInfo: {}
}

const actions = {
	FETCH_USER_INFO: ({ commit, state }, body) => {
		return api.qryUser(body)
			.then(resp => {
				let Data = resp.data.data
				commit('SET_USER_INFO',{ Data })
			})
	}
}

const mutations = {
	SET_USER_INFO: (state, { Data }) => {
		state.userInfo = Data
	}
}

const getters = {
	userInfo(state) {
		return state.userInfo
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}