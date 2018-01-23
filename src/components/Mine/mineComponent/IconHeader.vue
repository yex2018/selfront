<template>
	<div class="mine-header bgGreen">
		<div class="mine-pic">
			<!-- <span class="icon iconfont icon-head_default absCenter"></span> -->
			<img :src="info.head_portrait" alt="">
		</div>
		<p class="tip">{{info.name}}</p>
	</div>
</template>
<script>
	export default{
		name:'icon-header',
		props:{
			info:Object
		}
	}
</script>
<style lang='scss'>

	.mine-header{
		height: 5.0rem;
		text-align: center;
		.mine-pic{
			width: 1.8rem;
			height: 1.8rem;
			border-radius: 50%;
			background: #dae2e2;
			display: inline-block;
			margin-top: 1.5rem;
			position: relative;
			.icon-head_default{
				color: #fff;
				font-size: 1.1rem;
			}
			img{
				width: inherit;
				height: inherit;
				border-radius: 50%;
			}
		}
		.tip{
			color: #fff;
			font-size: 0.373333rem;
			margin-top: 0.2rem;
			font-weight: bold;
		}
	}
</style>