<!-- 测评结果页(无模板) -->
<template>
	<div class="ass-result p-container">
		<loading v-model="isLoading" text="正在生成报告报告结果"></loading>
		<div class="ass-b-btn" v-if="!isLoading&&repSucc" @click="getReport">获取完整报告</div>
		<div v-if="!isLoading&&!repSucc" class="p-com-wrapper">
			<div class="info">
				<img src="../../../static/imgs/error.png" alt="">
				<p>生成报告失败</p>
			</div>
			<div class="btn-container">
		    	<x-button type="primary" action-type="button" @click.native="loadInfo">点击生成报告</x-button>
		    </div>
		</div>
        <div v-if="!isLoading&&repSucc" class="info">
            <img src="../../../static/imgs/error.png" alt="">
            <p>报告生成成功</p>
        </div>
	</div>
</template>
<script>
	import * as api from '../../api/assessmentApi'
	import {LevelBar} from './assComponent'
	import { Loading,XButton } from 'vux'
	export default{
		data(){
			return {
				isLoading:true,
				assRes:{},
				sum:{},
				detail:[],
                repSucc:false,//生成报告成功
                allInfo:{},
			}
		},
		components:{
			LevelBar,Loading,XButton
		},
		methods:{
			loadInfo(){
				let vm = this,body = {
					evaluation_id:vm.$route.query.evaluation_id,		
					user_id:vm.$route.query.user_id,	
					child_id:vm.$route.query.child_id,
					typeid:vm.$route.query.typeid, //生成：0 查看：1
					openid:vm.getCookie('openid'),
					user_evaluation_id:vm.$route.query.user_evaluation_id,
				}
				document.title = '测评结果'
				vm.isLoading = true
				api.getAssRes(body).then(resp=>{
					if(resp.data.res=='0'&&resp.data.data){
						// vm.assRes =  JSON.parse(resp.data.data.data_result)
						// vm.sum = vm.assRes.result.level
                        // vm.detail = vm.getDetail(vm.sum.dimension,vm.assRes.result.rpt_score.dimension)
                        vm.allInfo = resp.data.data
						vm.repSucc = true
					}
					vm.isLoading = false
				})
            },
            getReport(){
				let vm = this,body = {
					user_evaluation_id:vm.allInfo.user_evaluation_id,
					evaluation_id:vm.$route.query.evaluation_id,
					openid:vm.getCookie('openid'),
					user_id:vm.$route.query.user_id
				}
				api.qryReports(body).then(resp=>{
					if(resp.data.res==0){
						vm.$vux.alert.show({
						  	title: '提示',
						  	content: '完整报告已通过微信消息发送给您，请返回薄荷叶教育公众号主页面查看消息'
						})
					}
				})
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-result{
		.p-com-wrapper{
			height: calc(100% - 1.2rem);
		}
		.info{
			padding: 2.266667rem 0 1.6rem;
			text-align: center;
			color: #5a5a5a;
			height: 8.8rem;
			img{
				width: 3.36rem;
				height: 3.84rem;
			}
			p{
				padding-top: 0.4rem;
				font-size: 0.453333rem;
			}
		}
		.btn-container{
			padding:0 15px;
			button{
				height: 46px;
				font-size: 20px;
			}
		}
	}
</style>