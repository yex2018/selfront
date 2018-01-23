// 测评相关api
import { fetch,postData } from '../service/httpService'
import { baseUrl,jsonUrl } from '../config/env'

export function getAssessmentList(body){
	return fetch(baseUrl+'getevalutionlist',body)
	// return fetch(jsonUrl+'static/json/AssessmentList.json')
}

export function getAssDetail(body) {
	return fetch(jsonUrl+'static/json/AssessmentDetail.json')
}

export function sendCode(body) {
	return fetch(baseUrl+'sendcode',body)
}

export function login(body){
	return postData(baseUrl+'login',body)
}

export function getQue(body){
	return fetch(baseUrl+'getevalution',body)
	// return fetch(jsonUrl+'static/json/singleQue.json')
}

export function qryUser(body){
	return fetch(baseUrl+'qryuser',body)
}

export function updateevalution(body){
	return fetch(baseUrl+'updateevalution',body)
}

export function qryReport(body){
	return fetch(baseUrl+'QryReport',body)
}

// 查看报告
export function qryReports(body){
	return fetch(baseUrl+'QryReports',body)
}

// 获取单个课程
export function getAssById(body){
	return fetch(baseUrl+'GetEvalutionByID',body)
}

// 获取测评结果
export function getAssRes(body){
	return fetch(baseUrl+'QryReport',body)
	// return fetch(jsonUrl+'static/json/AssResult.json')
}

