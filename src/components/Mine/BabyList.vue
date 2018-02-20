<!-- babyList -->
<template>
	<div class="baby-list">
		<group>
			<cell :title="baby.name" is-link @click.native="goDetail(baby)" v-for="baby in babyList" :key="baby.child_id">
				<span slot="icon" class="icon iconfont icon-baobeishuo"></span>
			</cell>
		</group>
		<div class="btn-container">
	    	<x-button type="primary" action-type="button" @click.native="addBaby">添加宝贝</x-button>
	    </div>
	</div>
</template>
<script>
	import {Cell,Group,XButton} from 'vux'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				babyList:[]
			}
		},
		components:{
			Cell,Group,XButton
		},
		methods:{
			loadInfo(){
				document.title = '我的宝贝'
				this.getBabyList()
			},
			/* @desc:获取儿童列表 */
			getBabyList(){
				let vm = this , body = {user_id:vm.getMsg('base','userInfo').user_id}
				api.qrychild(body).then(resp=>{
					if(resp.data.res==0){
						vm.babyList = resp.data.data
					}
				})
			},
			addBaby(){
				this.$router.push({path:'/mineBaby'})
			},
			goDetail(baby){
				this.$router.push({path:'/babyDetail/babyInfo',query:{child_id:baby.child_id}})
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.baby-list{
		background-color: #fff;position: relative;
		.vux-no-group-title{
			margin-top: 0; 
			// .weui-cell img{ width: 0.8rem;display: block;margin-right: 0.4rem; }
			.weui-cell{
				.iconfont {
					margin-right: 0.3rem;
					font-size: 27px !important;
				}
				.icon-baobeishuo{
					color: #feb000;
				}
			}
		}
		.add{
			display: flex;align-items: center;padding: 0.266667rem 0.4rem;
			.icon-add{font-size: 1.2rem;color:#666;width: 1.2rem;}
			.tip{font-size: 0.453333rem;padding-left: 0.35rem;flex: 1;height: 1.306667rem;line-height: 1.306667rem;}
		}
		.btn-container{position: absolute;bottom: 1.5rem;width: 10rem;}
	}
</style>