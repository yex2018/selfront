<!-- 我的 -->
<template>
	<div>
		<div class="mine p-com-container" v-if="loginFlag=='1'">
			<icon-header :info="info"></icon-header>
			<tabbar class="vux-1px-b">
		      <tabbar-item class="activeBg" @click.native="goAss">
		        <span slot="icon" class="icon iconfont icon-ceping"></span>
		        <span slot="label">我的测评</span>
		      </tabbar-item>
		      <tabbar-item class="activeBg" @click.native="goCourse">
		        <span slot="icon" class="icon iconfont icon-kecheng"></span>
		        <span slot="label">我的学习</span>
		      </tabbar-item>
		      <tabbar-item class="activeBg" @click.native="goBaby">
		        <span slot="icon" class="icon iconfont icon-baobeishuo"></span>
		        <span slot="label">我的宝贝</span>
		      </tabbar-item>
		    </tabbar>
		    <group>
				<cell title="个人信息" is-link @click.native="goMineInfo">
					<span slot="icon" class="icon iconfont icon-head_default"></span>
					<!-- <img slot="icon" src="/static/imgs/test/icon.jpg"> -->
				</cell>
			</group>
		</div>
		<div class="login" v-if="loginFlag=='0'">
			<img src="../../../static/imgs/login/logo_1.png" alt="">
			<group>
		      	<x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" v-model="body.telno"></x-input>
		      	<x-input title="验证码" class="weui-vcode" v-model="body.number">
			        <x-button v-if="showAccessButton" slot="right" type="primary" mini @click.native="sendCode">{{showAccessTip}}</x-button>
			        <x-button v-if="!showAccessButton" disabled type="default" slot="right" mini >{{countdown}}秒</x-button>
			    </x-input>
		    </group>
		    <div class="btn-container">
		    	<x-button type="primary" action-type="button" @click.native="login">登录</x-button>
		    </div>
		    
		</div>
	</div>
	
</template>
<script>
	import { Tabbar, TabbarItem,XInput,Group,XButton,Cell} from 'vux'
	import { IconHeader } from './mineComponent'
	import * as api from '../../api/assessmentApi'
	export default{
		data(){
			return {
				info:{},
				loginFlag:'1',// 0：未登陆，1：已登陆
				showAccessTip:'获取验证码',
				countdown:60,
				showAccessButton:true,
				body:{
					telno:'',
					number:''
				}
			}
		},
		methods:{
			loadInfo(){
				this.getUserInfo()
			},
			getUserInfo(){
				let vm = this,body = {
					openid:vm.getCookie('openid')
				}
				let info = {
					name:decodeURI(vm.getCookie('nickname')),
					head_portrait:vm.getCookie('headimgurl')
				}
				if(vm.getMsg('base','userInfo')!=null){
					vm.info = info
					document.title = '我的'
				}else{
					api.qryUser(body).then(resp=>{
						if(resp.data.res == 0){
							vm.setMsg('base','userInfo',resp.data.data)
							vm.info = info
							vm.loginFlag = '1'
							document.title = '我的'
						}else{
							vm.loginFlag = '0'
							document.title = '登录'
						}
					})
				}
			},
			goBaby(){
				this.$router.push({path:'/babyList'})
			},
			goMineInfo(){
				this.$router.push({path:'/mineInfo'})
			},
			goAss(){
				this.setMsg('mineAss','index',0)
				this.$router.push({path:'/mineAss'})
			},
			goCourse(){
				this.$router.push({path:'/mineCourse'})
			},
			goTab(){
			},
			sendCode(){
				let vm = this,body = {
					telno:vm.body.telno
				}
				if(vm.body.telno.length!='11'){
					this.$vux.toast.show({
						text: '请输入正确的手机号',
						type: 'text',
						width: '4.5rem'
					})
				}else{
					vm.showAccessButton=false
					api.sendCode(body)
					let accessCountdown = setInterval(()=>{
						vm.countdown = vm.countdown - 1
						if(vm.countdown === -1){
							vm.resetCode()
							clearInterval(accessCountdown)
						}
					},1000)
				}
				
			},
			resetCode(){
				let vm = this;
				vm.showAccessButton=true
				vm.countdown = 10
				vm.showAccessTip = '重新获取'
			},
			login(){
				let vm = this,body = {
					telno:vm.body.telno,
					number:vm.body.number,
					openid:vm.getCookie('openid'),
					name:decodeURI(vm.getCookie('nickname'))
				}
				if(vm.checkInfo()){
					api.login(body).then(resp=>{
						if(resp.data.res=='0'){
							vm.setMsg('Index','path',0)
							let data = vm.getMsg('login','data')
							vm.getUserLogin(data)
						}
					})
				}
			},
			checkInfo(){
				let vm = this
				if(vm.body.telno.length!='11'){
					this.$vux.toast.show({
						text: '请输入正确的手机号',
						type: 'text',
						width: '4.5rem'
					})
					return false
				}else if(vm.body.number == ''){
					this.$vux.toast.show({
						text: '请输入验证码',
						type: 'text',
						width: '3.5rem'
					})
					return false
				}else{
					return true
				}
			},
			getUserLogin(data){
				let vm = this,body = {
					openid:vm.getCookie('openid')
				},info = {
					name:decodeURI(vm.getCookie('nickname')),
					head_portrait:vm.getCookie('headimgurl')
				}
				api.qryUser(body).then(resp=>{
					if(resp.data.res == 0){
						vm.setMsg('base','userInfo',resp.data.data)
						vm.info = info
						vm.loginFlag = '1'
						document.title = '我的'
					}
				})
			}
		},
		components: {
	      	Tabbar,
	      	TabbarItem,
	      	IconHeader,
	      	XInput,Group,XButton,Cell
	    },
	    created(){
	    	this.loadInfo()
	    }
	}
</script>
<style lang='scss'>
	.mine{
		.vux-no-group-title{
			margin-top: 0.266667rem; 
			.weui-cell span{ width: 0.8rem;display: block;}
			.icon{color:#229cee;font-size: 0.533333rem;}
			.weui-cell__ft{&:after{width: 0.266667rem;height: 0.266667rem;}}
		}
		.weui-tabbar{
			position: relative;
			.weui-tabbar__item{
				padding-top: 0.2rem;
				padding-bottom: 0.2rem !important;
				.iconfont {
					font-size: 27px !important;
				}
				.icon-ceping{
					color: #20e4a0;
				}
				.icon-kecheng{
					color: #229cee;
				}
				.icon-baobeishuo{
					color: #feb000;
				}
			}
			.weui-bar__item_on{
				.weui-tabbar__label{
					color: #575656 !important;
				}
			}
			.weui-tabbar__label{
				padding-top: 0.1rem;
			}
		}
	}
	.login{
		background-color: #fff;
		height: 100%;
		img{
			width: 10rem;
			padding-bottom: 1rem;
			display: block;
			margin:0 auto;
		}
		.vux-no-group-title{
			margin-top: 0.133333rem;
		}
		.btn-container{
			padding:0.8rem 0.426667rem 0;
			button{
				height: 46px;
				font-size: 20px;
			}
		}
		.weui-vcode,.weui-name{
			button.weui-btn{
				width: 2.653333rem;
			}
			.weui-btn_disabled.weui-btn_default{
				color: #fff;
				background-color: #ddd;
			}
			.weui-label{
				width: 5em !important;
			}
		}
	}
</style>