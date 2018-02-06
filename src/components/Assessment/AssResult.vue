<!-- 测评结果页 -->
<template>
	<div class="ass-result p-container">
		<loading v-model="isLoading" text="正在生成报告报告结果"></loading>
		<div v-if="!isLoading&&repSucc" class="p-com-wrapper">
			<div class="res-head">
				<p class="ass-title text-green">社会技能发展水平</p>
				<p class="des">测试儿童：{{assRes.child.name}}</p>
				<p class="des">测试时间：{{assRes.evaluation_time}}</p>
			</div>
			<div class="res-sum">
				<p class="title">整体社会技能水平</p>
				<p class="text-green score">{{assRes.result.rpt_score.total}}</p>
				<p >SEL报告分</p>
				<div class="sum-wrap">
					<div>
						<p class="text-green score">{{sum.total}}</p>
						<p>与同年龄段儿童相比</p>
					</div>
					<div>
						<p class="text-green score pos"><span class="icon iconfont icon-up"></span>{{sum.percent_combined}}%</p>
						<p style="margin-bottom:0.266667rem;">超过同年龄段儿童比例</p>
						<p class="text-green score pos">
							<span class="icon iconfont icon-up" style="top:0.053333rem;"></span>{{sum.percent_gender}}%</p>
						<p>超过同年龄段{{assRes.child.gender}}童比例</p>
					</div>
				</div>
			</div>
			<div class="res-detail">
				<p class="title">社会技能-细分维度</p>
				<level-bar v-for="item in detail" :key="item.name" :bar=item></level-bar>
			</div>
			<div class="res-sugg">
				<p class="title">专家建议</p>
				<div class="sugg">
					<span>{{assRes.child.name}}在社会技能方面的整体发展状况</span><span v-html="assRes.result.suggestion1"></span>
				</div>
				<div class="sugg">帮助孩子成为最好的自己，需要进一步深入了解，既要知道孩子的优势，也要了解孩子的相对短板。</div>
				<div class="sugg" v-html="assRes.result.suggestion2"></div>
			</div>			
		</div>
		<div class="ass-b-btn" v-if="!isLoading&&repSucc" @click="getReport">获取完整报告</div>
		<div v-if="!isLoading&&!repSucc" class="p-com-wrapper">
			<div class="error-info">
				<img src="../../../static/imgs/error.png" alt="">
				<p>生成报告失败</p>
			</div>
			<div class="btn-container">
		    	<x-button type="primary" action-type="button" @click.native="loadInfo">点击生成报告</x-button>
		    </div>
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
			}
		},
		components:{
			LevelBar,Loading,XButton
		},
		methods:{
			loadInfo(){
				let vm = this,body = {
					user_evaluation_id:vm.$route.query.user_evaluation_id,
					typeid:vm.$route.query.typeid, //生成：0 查看：1					
				}
				document.title = '测评结果'
				vm.isLoading = true
				api.getAssRes(body).then(resp=>{
					if(resp.data.res=='0'&&resp.data.data.data_result){
						vm.assRes =  JSON.parse(resp.data.data.data_result)
						vm.sum = vm.assRes.result.level
						vm.detail = vm.getDetail(vm.sum.dimension,vm.assRes.result.rpt_score.dimension)
						vm.repSucc = true
					}
					vm.isLoading = false
				})
			},
			// 测评细节条目对象合并,翻译文字
			getDetail(levelArr,scoreArr){
				let vm = this,map = {assertion:'坚定自信',communication:'沟通能力',cooperation:'合作性',empathy:'同理心',engagement:'社会参与',responsibility:'责任感',selfcontrol:'自控力'},tans = {"高于平均水平":'high',"低于平均水平":'down',"平均水平":'ave'}
				levelArr.forEach((item,index)=>{
					Object.assign(item,scoreArr[index])
					vm.$set(item,'name_tip',map[item.name])
					vm.$set(item,'level_tip',tans[item.level])
				})

				return _.sortBy(levelArr, 'name')
			},
			getReport(){
				let vm = this,body = {
					user_evaluation_id:vm.$route.query.user_evaluation_id,
					openid:vm.getCookie('openid')
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
		color: #666;
		.p-com-wrapper{
			height: calc(100% - 1.2rem);
		}
		.res-head{
			text-align: center;
			padding: 0.5rem 0.266667rem;
			/*font-size: 0.426667rem;*/
			font-size: 14px;
			background-color: #fff;
			margin-bottom: 0.5rem;
			.ass-title{
				font-size: 20px;
				font-weight: bold;
				padding-bottom: 0.4rem;
			}	
		}
		.res-sum{
			padding: 0.3rem 0.266667rem;
			font-size: 14px;
			background-color: #fff;
			margin-bottom: 0.5rem;
			.title{
				/*font-weight: bold;*/
				font-size: 17px;
				font-weight:bold;
				margin-bottom: 0.4rem;
    			color: #27374D;
			}
			.score{
				font-weight: bold;
				font-size: 0.48rem;
				margin-bottom: 0.05rem;
				position: relative;
				height: 0.64rem;
				.icon{
					left: 0;top: 0.08rem;position: absolute;
				}
			}
			.pos{
				padding-left:0.45rem;
			}
			.sum-wrap{
				display: flex;
				margin-top: 0.266667rem;
				>div{
					flex: 1;
				}
			}
		}
		.res-detail{
			padding: 0.3rem 0.266667rem;
			background-color: #fff;
			margin-bottom: 0.5rem;
			.title{
				/*font-weight: bold;*/
				font-size: 17px;
				font-weight:bold;
				margin-bottom: 0.4rem;
				color: #27374D;
			}
		}
		.res-sugg{
			padding: 0.3rem 0.266667rem;
			background-color: #fff;
			margin-bottom: 0.5rem;
			.title{
				/*font-weight: bold;*/
				font-size: 17px;
				font-weight:bold;
				margin-bottom: 0.4rem;
				color: #27374D;
			}
			.sugg{
				font-size: 14px;
				color: #666;
				text-indent: 2em;
				line-height: 30px;
				ul{margin-left: .8rem;list-style-type:circle;text-indent: 0;}
			}
		}
		.weui-toast{
			width: 10em;
		}
		.error-info{
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