<!-- 儿童信息详情 -->
<template>
	<div class="baby-detail p-container">
		<tab :line-width="1" custom-bar-width="60px">
	        <tab-item :selected="selected=='0'" @on-item-click="onItemClick">宝贝信息</tab-item>
	        <tab-item :selected="selected=='1'" @on-item-click="onItemClick">测评报告</tab-item>
	    </tab>
	    <transition name="pixel-pop-in">
	      <router-view class="router-view p-com-wrapper"></router-view> 
	    </transition>
	</div>
</template>
<script>
	import {Tab, TabItem} from 'vux'
	export default{
		data(){
			return {
				selected:'0',
				child_id:''
			}
		},
		methods:{
			onItemClick(index){
				let vm = this , body = {child_id:vm.child_id}
				if(index=='0'){
					vm.$router.replace({path:'/babyDetail/babyInfo',query:body})
				}else if(index=='1'){
					vm.$router.replace({path:'/babyDetail/babyAss',query:body})
				}
			},
			loadInfo(){
				let vm = this,path=['BabyInfo','BabyAss']
		        vm.selected = _.indexOf(path,vm.$route.name)
		        vm.child_id = vm.$route.query.child_id
			}
		},
		components:{
			Tab,TabItem
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	@import '../../../static/lib/css/base/variable/base-color.scss';
	.baby-detail{
		.vux-tab .vux-tab-item.vux-tab-selected{
			color: $text-green-color;
			border-bottom-color: $text-green-color;
		}
		.p-com-wrapper{
			height: calc(100% - 44px);
		}
		.ass-btn{
			color: #fff;
			background-color: $text-green-color;
			padding: 0.08rem 0.133333rem;
			border-radius: 0.08rem;
		}
	}
</style>