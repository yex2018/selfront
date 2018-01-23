<template>
	<div class="ass-wrapper">
		<div class="title">{{ass.category}}</div>
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name:'AssCellWrapper',
		props:{
			ass:Object
		}
	}
</script>
<style lang='scss'>
	.ass-wrapper{
		.title{
			background-color: #fff;
			height: 1.066667rem;
			font-size: 0.4rem;
			line-height: 1.066667rem;
			padding-left: 0.4rem;
			font-weight: bold;
			margin-top: 0.2rem;
			color: #27374D;
		}
		.ass-cell:last-child{
			&::after{
				width:0;
			}
		}
	}
</style>