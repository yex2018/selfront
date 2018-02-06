<!-- 我的测评 -->
<template>
	<div class="mine-ass p-container">
		<tab :line-width="1" custom-bar-width="60px">
	        <tab-item :selected="selected=='0'" @on-item-click="onItemClick">未完成</tab-item>
	        <tab-item :selected="selected=='1'" @on-item-click="onItemClick">已完成</tab-item>
	    </tab>
	    <div class="p-com-wrapper" v-if="assList.length>0&&endLoad">
	    	<ass-cell v-for="item in assList" :cell="item" key="item">
	    		<span slot="btn" v-if="item.current_question_id!='-1'" class="ass-btn  text-overflow" @click="assGo(item)">继续测评</span>
	    		<span slot="btn" v-else class="ass-btn text-overflow" @click="assRes(item)">查看报告</span>
	    	</ass-cell>
	    </div>
	    <div class="p-com-wrapper" v-if="assList.length==0&&endLoad">
	    	<error-info></error-info>
	    </div>
	    

	</div>
</template>
<script>
	import {Tab, TabItem} from 'vux'
	import { AssCell } from './mineComponent'
	import ErrorInfo from '../AppBase/ErrorInfo'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				selected:'0',
				allList:[],
				assList:[],
				endLoad:false
			}
		},
		components:{
			Tab, TabItem,AssCell,ErrorInfo
		},
		methods:{
			loadInfo(){
				let vm = this,body = {
					user_id:vm.getMsg('base','userInfo').user_id
				}
				if(vm.getMsg('mineAss','index')){
					vm.selected = vm.getMsg('mineAss','index')
				}
				document.title = '我的测评'
				api.getMineAss(body).then(resp=>{
					if(resp.data.res=='0'&&resp.data.data!=null){
						vm.allList = resp.data.data
						vm.render(vm.allList)
					}
					vm.endLoad = true
				})
			},
			render(data){
				let vm = this
				if(vm.selected=='0'){
					data.forEach(item=>{
						if(item.current_question_id!='-1'){
							vm.assList.push(item)
						}
					})
				}else if(vm.selected=='1'){
					data.forEach(item=>{
						if(item.current_question_id=='-1'){
							vm.assList.push(item)
						}
					})
				}
			},
			onItemClick(index){
				let vm = this
				vm.assList = []
				vm.setMsg('mineAss','index',index)
				if(index=='0'){
					vm.allList.forEach(item=>{
						if(item.current_question_id!='-1'){
							vm.assList.push(item)
						}
					})
				}else if(index=='1'){
					vm.allList.forEach(item=>{
						if(item.current_question_id=='-1'){
							vm.assList.push(item)
						}
					})
				}
			},
			assGo(item){
				let vm = this
				vm.setMsg('assDetail','info',item)
				let body = {
					user_evaluation_id:item.user_evaluation_id,
					evaluation_id:item.evaluation_id,
					index:item.current_question_id + 1 > item.maxIndex ? item.maxIndex : item.current_question_id + 1,
					maxIndex:item.maxIndex,
					assName:item.name,
					keyname:item.key_name
				}
				vm.$router.push({path:'/assQueDetail',query:body})	
			},
			/* @desc:查看报告结果 */
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
	@import '../../../static/lib/css/base/variable/base-color.scss';
	.mine-ass{
		.vux-tab .vux-tab-item.vux-tab-selected{
			color: $text-green-color;
			border-bottom-color: $text-green-color;
		}
		.p-com-wrapper{
			height: calc(100% - 44px);
		}
		.ass-btn{
			color: #fff;
			background-color: $text-green-color;
			padding: 0.08rem 0.133333rem;
			border-radius: 0.08rem;
		}
	}
</style>