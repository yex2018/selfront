<!-- 用户个人信息页 -->
<template>
	<div class="mine-info">
		<div class="headIcon">
			<img :src="body.head_portrait" alt="">
		</div>
		<group>
			<x-input class="name" title="昵称" placeholder="请输入昵称" v-model="body.nick_name"></x-input>
	      	<x-input class="name" title="姓名" placeholder="请输入姓名" v-model="body.name"></x-input>
	      	<pixel-selector v-if="endLoad" title="性别" :options="sexList" :value="body.gender" @onSelect="chengeSex"></pixel-selector>
	      	<datetime v-model="body.birth_date" @on-change="changeDate" title="生日" :start-date=startDate :end-date=endDate></datetime>
	    </group>
	    <div class="btn-container">
	    	<x-button type="primary" action-type="button" @click.native="save">保存</x-button>
	    </div>
	</div>
</template>
<script>
	import {Group,Datetime,XInput,Selector,XButton,XHeader} from 'vux'
	import {PixelSelector} from './mineComponent'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				body:{
					head_portrait:'',
					nick_name:'',
					name:'',
					gender:'',
					birth_date:'',
					user_id:'',
					child_id:'0'
				},
				startDate:'1900-01-01',// 最小日期
				endDate: '2030-12-31',// 最大日期
				sexList:[{key: '1', value: '男',icon:'icon-boy'}, {key: '2', value: '女',icon:'icon-girl'}],
				endLoad:false,
				userInfo:{}
			}
		},
		components:{
			Group,Datetime,XInput,Selector,XButton,XHeader,PixelSelector
		},
		methods:{
			loadInfo(){
				let vm = this
				document.title = '个人信息'
				vm.getUserInfo()
			},
			changeDate(){},
			save(){
				let vm = this
				
				if(vm.checkInfo()){
					api.updateUser(vm.body).then(resp =>{
						if(resp.data.res == 0){
							this.$router.push({path:"/appbase/mine"})
						}
					})
				}
			},
			chengeSex(val){
				this.body.gender = val
			},
			checkInfo(){
				let vm = this
				if(vm.body.name==''){
					this.$vux.toast.show({
						text: '请输入姓名',
						type: 'text',
						width: '3.5rem'
					})
					return false
				}else if(vm.body.gender == ''){
					this.$vux.toast.show({
						text: '请选择性别',
						type: 'text',
						width: '4rem'
					})
					return false
				}else if(vm.body.birth_date == ''){
					this.$vux.toast.show({
						text: '请选择出生日期',
						type: 'text',
						width: '4rem'
					})
					return false
				}else{
					return true
				}
			},
			getUserInfo(){
				let vm = this,body={},user_id=''
				vm.body.user_id = user_id = vm.getMsg('base','userInfo').user_id
				vm.body.head_portrait = vm.getMsg('base','userInfo').head_portrait
				if(vm.userInfo){
					vm.$store.dispatch('FETCH_USER_INFO',{ user_id:user_id})
					.then(resp=>{
						vm.body.head_portrait = vm.getCookie('headimgurl')
						vm.body.nick_name = vm.$store.getters.userInfo.nick_name
						vm.body.name = vm.$store.getters.userInfo.name				
						vm.body.gender = vm.$store.getters.userInfo.gender				
						vm.body.birth_date = vm.formatDate(vm.$store.getters.userInfo.birth_date)
						vm.endLoad = true
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
	.mine-info{
		height: 100%;
		width: 100%;
		background: #fff;
		.name{
			.weui-cell__bd{
				padding-right: 11px;
				.weui-input{
					text-align: right;
				}
			}
			.weui-cell__ft{
				display: none;
			}
		}
		.weui-cells{
			margin: 1.17647059em 15px 0;
		}
		.weui-cell{
			padding: 13px 0;
			&:before{
				left: 0;
			}
		}
		.headIcon{
			width: 10rem;
			height: 4.1rem;
			border-radius: 50%;
			padding: 1rem 0;
			text-align: center;
			img{
				width: 1.8rem;
				height: 1.8rem;
				border-radius: 50%;
				background: #dae2e2;
			}
		}
		.btn-container{
			padding:0.8rem 15px 0;
			button{
				height: 46px;
				font-size: 20px;
			}
		}
		.vux-cell-box:before{left: 0;}
		.weui-cell_access .weui-cell__ft {padding-left: 16px;}
	}
</style>
