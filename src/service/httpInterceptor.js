/* store */
import store from '../store'
import Vue from 'vue'
import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)
// 显示
		


// 检测请求名是否需要拦截
function checkUrl(resp){
    let arr = resp.config.url.split('/'),flag = true
    unInterceptorUrl.forEach(item=>{
        if(item === arr[arr.length-1]){
            flag = false
        }
    })
    return flag
}

//不拦截的请求名
const unInterceptorUrl = ['qryuser','getevalution','QryReport']

export const request = function(config){
	store.commit('updateLoadingStatus', {isLoading: true})
    return config
}

export const response = function(response){
    store.commit('updateLoadingStatus', {isLoading: false})
    if(response.data.result == 404){
        Vue.$vux.alert.show({
            title: '提示',
            content: '程序正在修复中'
        })
    }
    if(response.data.res!=0&&checkUrl(response)){
    	Vue.$vux.alert.show({
			title: '提示',
			content: response.data.msg
		})
    }
    return response
    
}