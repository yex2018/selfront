import * as api from '../../api/mineApi'

const state = {
	areaList: [],
	userInfo: {}
}

const actions = {
	FETCH_PROVINCE_LIST: ({ commit, state }, body) => {
		return api.getProvinceList(body)
			.then(resp => {
				let Data = resp.data.data
				commit('SET_PROVINCE_LIST', { Data })
			})
	},

	FETCH_CITY_LIST: ({ commit, state }, body) => {
		return api.getCityList(body)
			.then(resp => {
				let Data = resp.data.data
				commit('SET_CITY_LIST', { Data })
			})
	},

	FETCH_USER_INFO: ({ commit, state }, body) => {
		return api.qryUser(body)
			.then(resp => {
				let Data = resp.data.data
				commit('SET_USER_INFO',{ Data })
			})
	}
}

const mutations = {
	SET_PROVINCE_LIST: (state, { Data }) => {
		state.areaList = Data
	},
	SET_CITY_LIST: (state, { Data }) => {
		state.areaList.push(...Data)
	},
	SET_USER_INFO: (state, { Data }) => {
		state.userInfo = Data
	}
}

const getters = {
	areaList(state) {
		return state.areaList
	},
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