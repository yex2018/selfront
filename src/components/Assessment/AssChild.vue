<!-- 测评前置选择儿童 -->
<template>
	<div class="ass-child">
		<div class="tip">
			<divider>测评须知</divider>
			<ul v-if="keyName=='qzgxpp'||keyName=='qzgxpca'">
				<li>本报告的使用目的是帮助你找到最有效的改善点。通过科学的方法，我们可以更加清晰地了解自己应该如何建立有效的亲子关系。因此，您的<strong class="text-green">真实准确</strong>的反馈，对于获得有意义的反馈报告有着至关重要的意义！</li>
				<li>测试中的选项<strong class="text-green">没有对错</strong>之分，请基于平时与孩子的互动状况填写。<a class="text-blue" @click="goDetail">修改儿童信息请点这里></a></li>				
			</ul>
			<ul v-else>
				<li>测试中的选项没有对错之分，请基于儿童<strong class="text-green">最近2个月内</strong>的行为表现填写</li>
				<li>如果有些行为没有观察到或者不确定，根据您对儿童的了解，请填写您认为<strong class="text-green">最可能</strong>的表现</li>
				<li>请选择需要进行测评的儿童，并确认儿童的<strong class="text-green">生日</strong>和<strong class="text-green">性别</strong>信息，因为报告结果会根据您填写的儿童信息，自动与同年龄段以及同性别的儿童进行比对。如果信息有误，将<strong class="text-green">影响报告结果</strong>。<a class="text-blue" @click="goDetail">修改儿童信息请点这里></a></li>
			</ul>
		</div>
		<div class="child-info">
			<group>
				<selector title="姓名" :options="children" placeholder="请选择儿童" v-model="child.child_id" @on-change="chooseChild"></selector>
				<cell title="性别" :value="child.gender"></cell>
				<cell title="生日" :value="child.birth_date"></cell>
			</group>
			<div v-if="originalPrice=='0'" class="ass-btn" @click="commit">开始测试</div>
			<div v-else class="price-wrap">
				<span class="price vux-1px-t">{{originalPrice}}元</span>
				<span class="ass-btn1" @click="buyAss">立即购买</span>
			</div>
		</div>
		<div>
			<popup v-model="showPopup">
				<div class="popup">
					<div>
						<group>
							<cell title="测评产品" :value="assName"></cell>
							<cell title="支付金额">
       							<span style="color: red">{{discountPrice}}元</span>
							</cell>						
						</group>
					</div>
					<div style="padding-top:10px;">
						<group>
							<x-input title="优惠码" type="text" :show-clear="false" :max="8" placeholder="请输入8位优惠码" v-model="couponCode">
								<x-button slot="right" type="primary" :disabled="couponApplied" mini @click.native="updatePrice">使用</x-button>
							</x-input>
						</group>
					</div>
					<div style="padding:20px 15px;">
          				<x-button type="primary" action-type="button" @click.native="confirmAss">确定</x-button>
         			</div>
				</div>
			</popup>

			<toast v-model="showToastSuccess" type="success" width="15em">{{toastMsg}}</toast>
			<toast v-model="showToastText" type="text" width="15em">{{toastMsg}}</toast>	
		</div>		
    </div>
</template>
<script>
	import {Group,Cell,Selector,XButton,Popup,XInput,Toast,Divider} from 'vux'
	import * as assApi from '../../api/assessmentApi'
	import * as courseApi from '../../api/courseApi'
	import * as mineApi from '../../api/mineApi'
	export default {
		name:'ass-child',
		data(){
			return {
				children:[],
				assName:'',
				keyName:'',
				child:{
					child_id:'',
					gender:'',
					birth_date:''
				},
				originalPrice:'',
				discountPrice:'',
				couponCode:'',
				couponApplied: false,
				showPopup: false,
				showToastSuccess:false,
				showToastText:false,
				toastMsg:'',
			}
		},
		components:{Group,Cell,Selector,XButton,Popup,XInput,Toast,Divider},
		methods:{
			/* @desc:初始化页面 */
			loadInfo(){
				let vm = this
				document.title = '测评须知'
				vm.assName = vm.$route.query.assName
				vm.keyName = vm.$route.query.keyname
				vm.originalPrice = vm.$route.query.price
				vm.discountPrice = vm.originalPrice
				vm.getBabyList()
				vm.configWxjssdk()
			},
			/* @desc:获取儿童列表 */
			getBabyList(){
				let vm = this , body = {user_id:vm.getMsg('base','userInfo').user_id}
				mineApi.qrychild(body).then(resp=>{
					if(resp.data.res==0){
						vm.children = resp.data.data
						vm.children.forEach(item=>{
							vm.$set(item,'key',item.child_id)
							vm.$set(item,'value',item.name)
						})
						vm.child = vm.children[0]
					}
				})
			},
			/* @desc:选择儿童信息 */
			chooseChild(val){
				let vm = this
				vm.child = _.cloneDeep(vm.children).filter((item)=>{
					return item.child_id == val
				})[0]
				vm.child.birth_date = vm.formatDate(vm.child.birth_date)
				vm.child.gender = vm.formatGender(vm.child.gender)
			},
			/* @desc:提交信息进入免费测评 */
			commit(){
				let vm = this
				if(vm.child.child_id){
					vm.startEva()
				}else{
					vm.$vux.alert.show({
						title: '提示',
						content: '请选择儿童'
					})
				}
			},
			/* @desc:修改儿童信息 */
			goDetail(){
				if(this.child.child_id){
					this.$router.push({path:'/babyDetail/babyInfo',query:{child_id:this.child.child_id}})	
				}else{
					vm.$vux.alert.show({
						title: '提示',
						content: '请选择儿童'
					})
				}
			},
			startEva(){
				let vm = this,body1 = {
					evaluation_id:parseInt(vm.$route.query.evaluation_id),
					user_id:vm.getMsg('base','userInfo').user_id,
					child_id:vm.child.child_id,
					coupon_code:vm.couponApplied ? vm.couponCode : ''
				}

				assApi.addUserEvaluation(body1).then(resp=>{
					if(resp.data.res=='0'){
						let body2 = {
							user_evaluation_id:resp.data.data.user_evaluation_id,
							evaluation_id:vm.$route.query.evaluation_id,
							index:1,
							maxIndex:vm.$route.query.maxIndex,
							assName:vm.$route.query.assName,
							keyname:vm.$route.query.keyname
						}
						vm.$router.push({path:'assQueDetail',query:body2})
					}
				})
			},
			/* @desc:购买测评 */
			buyAss(){
				let vm = this
				vm.discountPrice = vm.originalPrice
				vm.couponCode = ''
				vm.couponApplied = false
				vm.showPopup = true
			},
			/* @desc:下单 */
			getOrder(){
				let vm = this, body = {
					name:vm.$route.query.assName,
					course_id:vm.$route.query.evaluation_id,
					price:Number(vm.discountPrice)*100,
					openid:vm.getCookie('openid'),
					user_id:vm.getMsg('base','userInfo').user_id,
					child_id:vm.child.child_id
				}
				courseApi.coursePay(body).then(resp=>{
					if(resp.data.res=='0'){
						vm.openPay(resp.data.data)
					}
				})
			},
			openPay(data){
				let arr = this.getCookie('wxconfig').split('|'),vm = this
				WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":arr[0],     			//公众号名称，由商户传入     
			           "timeStamp":data.TimeStamp,  //时间戳，自1970年以来的秒数     
			           "nonceStr":data.Nonce_str, 	//随机串     
			           "package":'prepay_id='+data.Prepay_id,     
			           "signType":"MD5",         	//微信签名方式：     
			           "paySign":data.Sign 			//微信签名 
			       },
			       function(res){     
			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
							vm.startEva()
			           }else{
			           		vm.$vux.alert.show({
			           			title: '北京心启点教育科技有限公司',
			           			content: '支付失败'
			           		})
			           }
			       }
			   ); 
			},
			updatePrice(){
				let vm = this , body = {user_id:vm.getMsg('base','userInfo').user_id,coupon_code:vm.couponCode}
				if(vm.couponCode){
					mineApi.qryCoupon(body).then(resp=>{
						if(resp.data.res=='0'){
							if(resp.data.data!=null){
								vm.discountPrice = vm.originalPrice * resp.data.data
								vm.discountPrice = vm.discountPrice.toFixed(2)
								vm.couponApplied = true
								vm.toastMsg = "优惠码使用成功！"
								vm.showToastSuccess = true
							} else {
								vm.toastMsg = resp.data.msg
								vm.showToastText = true
							}
						}						
					})
				} else {
					vm.toastMsg = "请输入优惠码"
					vm.showToastText = true
				}
			},
			confirmAss(){
				let vm = this, body = {user_id:vm.getMsg('base','userInfo').user_id,coupon_code:vm.couponCode}
				if(vm.child.child_id){
					if(vm.discountPrice < 0.01) {
						vm.startEva()
					} else {
						vm.getOrder()
					}					
				}else{
					vm.$vux.alert.show({
						title: '提示',
						content: '请选择儿童'
					})
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
	.ass-child{
		.tip{
			background-color: #fff;
			color: #666;
			padding: .3rem 0.2rem;
			font-size: 0.4rem;
			line-height: .7rem;
			a{text-decoration: underline;}
			ul{margin-left: .6rem;list-style-type:circle;
				li{margin-top: .3rem;}
			}
		}
		.child-info{
			background-color: #fff;
			margin-top: 0.2rem;
			.vux-no-group-title{
				margin-top: 0; 
				.weui-cell_select .weui-cell__bd{&:after{width: 0.266667rem;height: 0.266667rem;}}
			}
			.vux-selector{
				padding: 3px 0;
				.weui-cell__bd{position: relative;}
				select{direction: rtl;color: #999;padding-right: 0.426667rem;}
			}
			.vux-selector.weui-cell_select-after { padding: 0 15px; }
			// .weui-cells:after{border-bottom: none;}
			// .weui-cell:before{border-top: none;}
		}
		.btn-container{
			padding:0.8rem 0.426667rem 0;
			button{
				height: 46px;
				font-size: 0.453333rem;
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
				padding-left: 0.4rem;
				color: red;
			}
			.ass-btn1{
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
		.popup {
			.vux-no-group-title{
				margin-top: 0; 
				.weui-cell_select .weui-cell__bd{&:after{width: 0.266667rem;height: 0.266667rem;}}
			}
		}
	}
</style>