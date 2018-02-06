<!-- 儿童详情-儿童测评结果 -->
<template>
	<div class="baby-ass">
		<div v-if="assList.length>0&&endLoad">
	    	<ass-cell v-for="item in assList" :cell="item" key="item">
	    		<span slot="btn" class="ass-btn text-overflow" @click="assRes(item)">查看报告</span>
	    	</ass-cell>
	    </div>
	    <error-info v-if="assList.length==0&&endLoad"></error-info>
	</div>
</template>
<script>
	import { AssCell } from './mineComponent'
	import ErrorInfo from '../AppBase/ErrorInfo'
	import * as api from '../../api/mineApi'
	export default {
		name:'baby-ass',
		data(){
			return {
				assList:[],
				endLoad:true
			}
		},
		components:{
			AssCell,ErrorInfo
		},
		methods:{
			loadInfo(){
				document.title = '宝贝信息'
				this.getList()
			},
			/* @desc:获取儿童测评报告列表 */
			getList(){
				let vm = this , body = {
					child_id:vm.$route.query.child_id
				}
				api.qryEvaluationByChildId(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.assList = resp.data.data
					}
				})
			},
			assRes(item){
				let vm = this , body = {
					evaluation_id:item.evaluation_id,		
					user_id:vm.getMsg('base','userInfo').user_id,	
					child_id:item.child_id,
					typeid:1, //生成：0 查看：1
					user_evaluation_id:item.user_evaluation_id
				}
				/* @desc:暂时只有一个结果模板 */
				if(item.key_name=='skill'){
					vm.$router.push({path:'/assResult',query:body})	
				}else{
					vm.$router.push({path:'/assNoTemplate',query:body})
				}
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.baby-ass{}
</style>