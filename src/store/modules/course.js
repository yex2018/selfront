import * as api from '../../api/courseApi'

const state = {
	courseList:[],// 课程列表
}

const actions = {
	/* 获取课程列表 */
	FETCH_COURSE_LIST:({commit,state},body) => {
		return api.getCourseList(body)
			.then(resp=>{
				let Data = resp.data.data
				commit('SET_COURSE_LIST',{Data})
			})
	}
}

const mutations = {
	SET_COURSE_LIST:(state,{Data}) => {
		state.courseList = Data
	}
}

const getters = {
	activeCourseList(state){
		return state.courseList
	}
}

export default {
	state,
	actions,
	mutations,
	getters
}