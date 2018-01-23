const state = {
	isLoading: false //全局loading,暂时移除
}

const mutations = {
	updateLoadingStatus (state, payload) {
      	state.isLoading = payload.isLoading
    }
}

const getters = {
	activeIsLoading(state){
		return state.isLoading
	}
}


export default {
	state,
	mutations
}