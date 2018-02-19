<!-- 我的 -->
<template>
	<div>
		<div class="mine p-com-container">
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
	</div>
	
</template>
<script>
	import { Tabbar, TabbarItem,XInput,Group,XButton,Cell} from 'vux'
	import { IconHeader } from './mineComponent'
	import * as api from '../../api/assessmentApi'
	export default{
		data(){
			return {
				info:{}
			}
		},
		methods:{
			loadInfo(){
				document.title = '我的'
				this.getUserInfo()
			},
			getUserInfo(){
				let vm = this,body = {
					openid:vm.getCookie('openid')
				}
				
				vm.info = {
					name:decodeURI(vm.getCookie('nickname')),
					head_portrait:vm.getCookie('headimgurl')
				}

				if(vm.getMsg('base','userInfo')==null){
					api.qryUser(body).then(resp=>{
						if(resp.data.res == 0){
							vm.setMsg('base','userInfo',resp.data.data)
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
</style>