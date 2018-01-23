<template>
	<div class="login">
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
</template>
<script>
	import {XInput,Group,XButton} from 'vux'
	import * as api from '../../api/assessmentApi'
	export default {
		data(){
			return {
				showAccessTip:'获取验证码',
				countdown:60,
				showAccessButton:true,
				body:{
					telno:'',
					number:''
				}
			}
		},
		components:{
			XInput,Group,XButton
		},
		methods:{
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
							vm.getUserInfo(data)
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
			getUserInfo(data){
				let vm = this,body = {
					openid:vm.getCookie('openid')
				}
				api.qryUser(body).then(resp=>{
					if(resp.data.res == 0){
						vm.setMsg('base','userInfo',resp.data.data)
						vm.$router.push({path:data.path,query:data.query})
					}
				})
			}
		},
		beforeRouteEnter (to, from, next) {
		    next(vm=>{
		    	let body = {
			    	path:from.path,
			    	query:from.query
			    }
		    	vm.setMsg('login','data',body)
		    })
		},
		mounted(){
			document.title = '登录'
			console.log(this.$router)
		}
	}
</script>
<style lang='scss'>
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