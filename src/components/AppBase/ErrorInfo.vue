<template>
	<div class="error-info">
		<img src="../../../static/imgs/error.png" alt="">
		<p>没有符合条件的结果</p>
	</div>
</template>
<script>
	export default {
		name:'ErrorInfo'
	}
</script>
<style lang='scss'>
	.error-info{
		padding: 2.266667rem 0 1.6rem;
		text-align: center;
		color: #5a5a5a;
		height: 8.8rem;
		img{
			width: 3.36rem;
			height: 3.84rem;
		}
		p{
			padding-top: 0.4rem;
			font-size: 0.453333rem;
		}
	}
</style>