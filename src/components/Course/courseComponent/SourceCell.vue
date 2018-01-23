<template>
	<div class="source-cell vux-1px-b">
		<!-- @desc:video:1,audio:2,pdf:3,link:4 -->
		<span class="icon iconfont" :class="{'icon-ai-video':cell.type=='1','icon-music':cell.type=='2','icon-pdf1':cell.type=='3','icon-link':cell.type=='4'}"></span>
		<span class="title text-overflow">{{cell.index|sourid}}.{{cell.name}}</span>
		<span v-if="price" class="price text-overflow">{{cell.free|freeTo}}</span>
	</div>
</template>
<script>
	export default {
		name:'source-cell',
		props:{cell:Object,price:Boolean},
		filters:{
			freeTo:function(val){
				let arr = ['','试看']
				return arr[val]
			},
			sourid:function(val){
				if(val<10){
					return '0'+val
				}else{
					return val
				}
			}
		}
	}
</script>
<style lang='scss'>
	.source-cell{
		display: flex;
		background-color: #fff;
		height: 1.3rem;
		line-height: 1.3rem;
		padding: 0 0.4rem;
		.icon{width: 0.8rem;}
		.title{flex: 1;}
		.price{width: 1.2rem;}
	}
</style>