<template>
	<div class="mine-course-cell activeBg vux-1px-b">
		<div class="container">
			<img :src="cell.picture" alt="">
			<div class="info">
				<div class="name">{{cell.name}}</div>
				<div class="abstract text-font">{{cell.abstract}}</div>
				<div class="other">
					<span class="time text-gray">有效期至：{{cell.valid_period|date_cell}}</span>
					<slot name="btn"></slot>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import moment from 'moment'
	export default{
		props:{
			cell:Object
		},
		filters:{
			date_cell(value){
				if(value){
					return moment(value.toString()).format('YYYY-MM-DD')
				}
			}
		}
	}
</script>
<style lang='scss'>
	.mine-course-cell{
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
					font-weight: 600;
				}
				.abstract{
					font-size: 0.32rem;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.other{
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
				}
			}
		}	
	}
</style>