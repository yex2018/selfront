<template>
	<div class="mine-ass-cell">
		<div class="container vux-1px-b">
			<img :src="cell.picture" alt="">
			<div class="info">
				<div class="name">{{cell.name}}</div>
				<div class="abstract text-font">{{cell.abstract}}</div>
				<div class="other">
					<span class="time text-gray text-overflow">测试时间：{{cell.evaluation_time|time_cell}}</span>
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
			time_cell(value){
				if(value){
					return moment(value).format('YYYY-MM-DD HH:mm:ss')
				}
			}
		}
	}
</script>
<style lang='scss'>
	.mine-ass-cell{
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