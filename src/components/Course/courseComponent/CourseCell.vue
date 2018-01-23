<template>
	<div class="course-cell activeBg">
		<div class="container vux-1px-t">
			<img :src="cell.picture" alt="">
			<div class="info">
				<div class="name">{{cell.name}}</div>
				<div class="abstract text-gray">{{cell.abstract}}</div>
				<div class="other">
					<span class="price text-red">{{cell.price|price_con}}</span>
					<span class="count text-gray">{{cell.person_count}}人已学习</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'AssCell',
		props:{
			cell:Object
		},
		filters:{
			price_con(value){
				if(value=='0'){
					return '免费'
				}else{
					return value+'元'
				}
			}
		}
	}
</script>
<style lang='scss'>
	.course-cell{
		background-color: #fff;
		.container{
			margin-left: 0.4rem;
			padding: 0.266667rem 0.4rem 0.266667rem 0;
			display: flex;	
			img{
				width: 1.733333rem;
				height: 1.733333rem;
			}
			.info{
				flex: 1;
				padding-left: 0.266667rem;
				display: flex;
				flex-direction: column;
				.name{
					font-size: 0.373333rem;
					font-weight: bold;
					color: #27374D;
				}
				.abstract{
					font-size: 0.32rem;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.other{
					padding-top: 0.2rem;
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
				}
			}
		}
		
		
	}
</style>