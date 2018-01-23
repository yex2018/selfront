import axios from 'axios'

/* ajax-get */
export const fetch = (url,data={}) =>{
	return new Promise((resolve,reject) => {
		axios({
			method:'get',
			url:url,
			params:data
		}).then(resp=>{
			resolve(resp)
		},reject)
	})
}

/* ajax-post */
export const postData = (url,data={}) =>{
	return new Promise((resolve,reject)=>{
		axios({
			method:'post',
			url:url,
			data:data
		}).then(resp=>{
			resolve(resp)
		},reject)
	})
}