// 课程相关api
import { fetch,postData } from '../service/httpService'
import { baseUrl,jsonUrl } from '../config/env'

export function getCourseList(body){
	return fetch(baseUrl+'QryCourse',body)
}

/* @desc:Get Single Course */
export function getCourseById(body){
	return fetch(baseUrl+'GetCourseByID',body)
}

/* @desc:Get Course Resourse */
export function getResourse(body){
	return fetch(baseUrl+'GetResource',body)
}

export function addUserCourse(body){
	return postData(baseUrl+'usercourse',body)
}

/* @desc:查看课程是否用户被看过 data:'0'：没看过 */
export function hasCourse(body){
	return fetch(baseUrl+'QryUserCourse',body)
}

export function getVideoPlayAuth(body){
	return fetch(baseUrl+'GetVideoPlayAuth',body)
}

// 课程支付下单
export function coursePay(body){
	return fetch(baseUrl+'wxPayOrder',body)
}
