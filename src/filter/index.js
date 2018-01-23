// 全局应用过滤器
import moment from 'moment'
import _ from 'lodash'

export default {
	install(Vue){

		// 首字母大写
		Vue.filter('capStr',(value)=>{
			if(value){
				return _.capitalize(value)
			}
		})

		// 格式化日期
		Vue.filter('time_con',(value)=>{
            if(value){
                return moment(value.substring(0,8)).format('YYYY-MM-DD')+' '+value.substr(8,2)+':'+value.substr(10,2)+':'+value.substr(12,2)
            }
        })
	}
}
