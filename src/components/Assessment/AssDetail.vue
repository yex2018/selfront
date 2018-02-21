<!-- 测评详情 -->
<template>
	<div class="ass-detail p-container">
		<div class="p-com-wrapper ass-info" v-if="endLoad">
			<div class="img-wrap vux-1px-b">
				<img :src="assInfo.picture" alt="">
			</div>
			<div class="ass-attr vux-1px-b">
				<p class="title">{{assInfo.name}}</p>
				<div class="attrs text-gray">
					<span>{{assInfo.maxIndex}}道精选问题</span>
					<span>{{assInfo.page_number}}页专业报告</span>
					<span>{{assInfo.person_count}}人测试过</span>
				</div>
			</div>
			<div class="ass-attr">
				<p class="title">
					<span class="icon iconfont icon-flag"></span>
					测评详情
				</p>
				<div class="detail" v-html="assInfo.details"></div>
			</div>
			<div class="ass-pdf activeBg" @click="getPDF">
				<span class="icon iconfont icon-pdf"></span>
				<p>点击查看报告样例</p>
			</div>
		</div>
		<div class="ass-btn" @click="goNext">下一步</div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import * as api from '../../api/assessmentApi'
	import * as mineApi from '../../api/mineApi'
	export default {
		name:'assDetail',
		data(){
			return {
				assInfo:{},
				endLoad:false
			}
		},
		components:{
			XHeader
		},
		methods:{
			loadInfo(){
				this.getAssDetail()
			},
			/* @desc:获取报告详情 */
			getAssDetail(){
				let vm = this,body = {evaluation_id:vm.$route.query.evaluation_id}
				api.getAssById(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.assInfo = resp.data.data
						document.title = vm.assInfo.name
					}
					vm.endLoad = true
				})
			},
			goNext(){
				let vm = this
				if(vm.getMsg('base','userInfo')!=null){
					let body = {
						user_id:vm.getMsg('base','userInfo').user_id
					}
					mineApi.qrychild(body).then(resp=>{
						if(resp.data.res == 0){
							if(resp.data.data!=null){
								let body = {
									evaluation_id:vm.assInfo.evaluation_id,
									assName:vm.assInfo.name,
									keyname:vm.assInfo.key_name,
									maxIndex:vm.assInfo.maxIndex,
									price:vm.assInfo.price
								}
								vm.$router.push({path:'assChild',query:body})
							}else{
								vm.$vux.confirm.show({
								  	// 组件除show外的属性
								  	title: '提示',
        							content: '您还未添加儿童信息，是否前往添加',
								  	onConfirm () {
								  		vm.$router.push({path:'/mineBaby'})
								  	}
								})
							}
						}
					})
				}
			},
			getPDF(){
				let vm = this
				location.href=vm.assInfo.sample_report
			}
		},
		created(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/css/base/variable/base-color.scss';
	.ass-detail{
		.p-com-wrapper{
			background-color: #fff;
			color: #666;
			height: calc(100% - 1.2rem);
		}
		.ass-info{
			.img-wrap{
				height: 4rem;
				padding-top: 0.3rem;
				text-align: center;
				img{
					height: 3.4rem;
				}
			}
			.ass-attr{
				padding: 0.133333rem 0.266667rem 0.4rem;
				.title{
					text-align: center;
					font-weight: bold;
					font-size: 0.373333rem;
					.icon-flag{
						font-weight: normal;
						position: relative;
						bottom: -0.036rem;
						&:before{
							font-size:0.5rem;
						}
					}
				}
				.attrs{
					display: flex;
					justify-content: space-between;
					padding-top: 0.2rem;
					font-size: 0.346667rem;
				}
				.detail{
					padding-top: 0.2rem;
					font-size: 0.346667rem;
				}
			}
			.ass-pdf{
				text-align: center;
				padding: 0.266667rem 0;
				width: 5rem;
				margin:0 auto;
				.icon-pdf{
					font-size: 1.6rem;
					color: #ff5562;
				}
				p{
					font-size: 0.4rem;
					padding-top: 0.266667rem;
					color: #565656;
				}
			}
		}
		.ass-btn{
			position: absolute;
			bottom: 0;
			color: #fff;
			background-color: $text-green-color;
			height: 1.2rem;
			width: 10rem;
			line-height: 1.2rem;
			text-align: center;
			font-size: 0.426667rem;
			&:active{
				background-color: $text-green-active-color;
			}
		}
	}
</style>
