<template>
	<div class="course-price  p-container">
		<div class="video-pic">
			<img v-if="!showFlag"  :src="courseInfo.picture" alt="">
			<div v-show="showFlag" class="prism-player" id="J_prismPlayer" style="position: absolute" ></div>
		</div>
		<div v-show="showFlag" class="prism-player" id="J_prismPlayer" style="position: absolute"></div>
		<div class="info-swiper" :class="{'change':isBuy!='1'}">
	       	<tab :line-width=2 active-color='#01ab41' v-model="index">
	        	<tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @click="selected = item" :key="index">{{item}}</tab-item>
	      	</tab>
	      	<swiper v-model="index" :show-dots="false">
	        	<swiper-item v-for="(item, index) in list" :key="index">
	        		<div  class="tab-swiper vux-center course-des" v-if="index == 0" v-html="courseInfo.details">
	          		</div>
	          		<div class="tab-swiper vux-center" v-if="index == 1">
	          			<source-cell v-for="cell in sourseList" :key="cell.type" :cell=cell @click.native="check(cell)" price></source-cell>
	          		</div>
	        	</swiper-item>
	      	</swiper>
	    </div>
	    <div class="price-wrap" v-if="isBuy=='1'">
			<span class="price vux-1px-t">{{courseInfo.price}}元</span>
			<span class="ass-btn" @click="buy_course">立即购买</span>
		</div>
	</div>
</template>
<script>
	import { XHeader, Tab, TabItem, Swiper, SwiperItem } from 'vux'
	import {SourceCell} from './courseComponent'
	import * as api from '../../api/courseApi'
	export default {
		data(){
			return {
				courseInfo:{},
				sourseList:[], // 课程信息
				index:0,
				selected:'主题介绍',
				list:['主题介绍','学习资源'],
				player:{},
				showFlag:false,
				isBuy:''// 0:已支付 1:未支付
			}
		},
		components:{
			XHeader,Tab, TabItem, Swiper, SwiperItem,SourceCell
		},
		methods:{
			loadInfo(){
				let vm = this
				this.getCourse()
				this.getCourseResourse()
				this.IsPay()
				this.configWxjssdk()
			},
			/* @desc:获取单个课程 */
			getCourse(){
				let vm = this , body = {
					course_id:vm.$route.query.course_id
				}
				api.getCourseById(body).then(resp=>{
					if(resp.data.res==0){
						vm.courseInfo = resp.data.data
						document.title = vm.courseInfo.name
						return resp.data.data.media
					}
				}).then(media=>{
					
				})
			},
			/* @desc:获取课程资源列表 */
			getCourseResourse(){
				let vm = this , body = {
					course_id:vm.$route.query.course_id
				}
				api.getResourse(body).then(resp=>{
					if(resp.data.res==0){
						vm.sourseList = resp.data.data
					}
				})
			},
			getMedia(media,data){
				let vm = this
				vm.player = new prismplayer({
		            id: 'J_prismPlayer',
		            width: '100%',
		            height: '230px',
		            autoplay: false,
		            //播放方式二：推荐
		            vid : media,
		            source : data.playAuth,
		            cover: data.coverurl
		        });
			},
			buy_course(){
			    let vm = this
			    if(vm.getMsg('base','userInfo')!=null){
			    	let body = {
				    	name:vm.courseInfo.name,
				    	course_id:vm.courseInfo.course_id,
				    	price:Number(vm.courseInfo.price)*100,
				    	openid:vm.getCookie('openid'),
				    	user_id:vm.getMsg('base','userInfo').user_id
				    }
				    api.coursePay(body).then(resp=>{
				    	if(resp.data.res=='0'){
				    		vm.openPay(resp.data.data)
				    	}
				    })
			    }			    
			},
			openPay(data){
				let arr = this.getCookie('wxconfig').split('|'),vm = this
				WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":arr[0],     //公众号名称，由商户传入     
			           "timeStamp":data.TimeStamp,         //时间戳，自1970年以来的秒数     
			           "nonceStr":data.Nonce_str, //随机串     
			           "package":'prepay_id='+data.Prepay_id,     
			           "signType":"MD5",         //微信签名方式：     
			           "paySign":data.Sign //微信签名 
			       },
			       function(res){     
			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			           		let body = {
			           			course_id:vm.courseInfo.course_id,
			           			user_id:vm.getMsg('base','userInfo').user_id
			           		}
			           		api.addUserCourse(body).then(resp=>{
			           			if(resp.data.res=='0'){
			           				alert('支付成功')
			           				vm.isBuy = '0'
			           			}
			           		})
			           }else{
			           		alert('支付失败')
			           }
			       }
			   );
			},
			IsPay(){
				let vm = this
				if(vm.getMsg('base','userInfo')!=null){
					let body = {
						course_id:vm.$route.query.course_id,
						user_id:vm.getMsg('base','userInfo').user_id
					}
					api.hasCourse(body).then(resp=>{
						if(resp.data.res=='0'){
							vm.isBuy = resp.data.data
						}
					})
				}
			},
			/* @desc:获取资源 */
			achSource(cell){
				/* @desc:video:1,audio:2,pdf:3,link:4 */
				if(cell.type=='3'||cell.type=='4'){
					location.href=cell.url
				}else if(cell.type=='1'){
					this.showFlag = true
					this.getVideoAuth(cell.url)
				}
			},
			/* @desc:获取视频权限 */
			getVideoAuth(media){
				let vm = this , body = {media:media,formmats:'mp4'}
				api.getVideoPlayAuth(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.cover = resp.data.data.coverurl
						vm.getMedia(vm.courseInfo.media,resp.data.data)
					}
				})
			},
			/* @desc:查看资源前判断是否付款 */
			check(cell){
				if(cell.free=='0'){
					if(this.isBuy=='0'){
						this.achSource(cell)
					}else if(this.isBuy=='1'){
						alert('此课程为收费课程，请购买后查看课件。')
					}
				}else{
					this.achSource(cell)
				}
			},
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/css/base/variable/base-color.scss';
	.course-price{
		.prism-player{
			position: relative !important;
		}
		.video-pic{
			height: 230px;
			width: 100%;
			img{
				width: 100%;
				height: 100%;
				display: inline-block;
			}
		}
		.info-swiper{
			height: calc(100% - 230px - 1.2rem) !important;
			.vux-slider{
				height: calc(100%  - 44px) !important;
				.vux-swiper{
					height: 100% !important;
				}
			}
			.vux-swiper .course-des{
				height: 100% !important;
				overflow-y: auto;
				background: #fff;
				padding: 0.133333rem 0.4rem;
			}
			.tab-swiper{
				font-size: 0.4rem;
				height: 100% !important;
				overflow-y: auto;
				.swipe-area,.swipe-description{
					padding:0 0.266667rem;
					label{
						color: #6d6d6d;
					}
				}
			}
		}
		.change{height: calc(100% - 230px) !important;}
		.ass-buy-btn{
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
		.price-wrap{
			position: absolute;
			bottom: 0;
			background-color: #fff;
			height: 1.2rem;
			width: 10rem;
			display: flex;
			.price{
				flex: 1;
				line-height: 1.2rem;
				font-size: 0.426667rem;
				color: #f9532d;
				padding-left: 0.4rem;
			}
			.ass-btn{
				color: #fff;
				background-color: $text-green-color;
				width: 3rem;
				line-height: 1.2rem;
				text-align: center;
				font-size: 0.426667rem;
				&:active{
					background-color: $text-green-active-color;
				}
			}
		}
	}
</style>