<!-- 测评结果分数条 -->
<template>
	<div class="level-bar-wrap">
		<div class="left">
			<p class="name text-green">{{bar.name_tip}}&emsp;{{bar.name|capStr}}</p>
			<div class="bar-contain">
				<div class="level-bar">
					<div class="progress-bar" :style="{width:bar.score+'%'}" :class="{'bgGreen':bar.level_tip=='high','bgYellow':bar.level_tip=='down','bgBlue':bar.level_tip=='ave'}"></div>
				</div>
				<span class="bar-score" :class="{'text-green':bar.level_tip=='high','text-yellow':bar.level_tip=='down','text-blue':bar.level_tip=='ave'}">{{bar.score}}</span>
			</div>
			
		</div>
		<div class="right" :class="{'text-green':bar.level_tip=='high','text-yellow':bar.level_tip=='down','text-blue':bar.level_tip=='ave','ave-hack':bar.level_tip=='ave'}">{{bar.level}}</div>
	</div>
	
</template>
<script>
	export default {
		props:{
			bar:Object
		}
	}
</script>
<style lang='scss'>
	.level-bar-wrap{
		margin-top: 0.133333rem;
		display: flex;
		.left{
			flex: 1;padding-bottom: 0.186667rem;
			.name{font-size: 14px;padding-bottom: 0.066667rem;}
			.bar-contain{
				display: flex;
				.bar-score{
					font-size: 14px;
				}
				.level-bar{
					flex: 1;
					height: 0.2rem;
					border-radius: 0.1rem;
					overflow: hidden;
					margin-top: .2rem;
					/*background-color: #f5f5f5;*/
					/*-webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);*/
					/*box-shadow: inset 0 1px 2px rgba(0,0,0,.1);*/
					.progress-bar {
					    float: left;
					    width: 0;
					    height: 100%;
					    font-size: 14px;
					    line-height: 20px;
					    color: #fff;
					    text-align: center;
					    border-radius: 0.1rem;
					    -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
					    box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
					    -webkit-transition: width .6s ease;
					    -o-transition: width .6s ease;
					    transition: width .6s ease;
					}

				}
				span{width: 1rem;padding-left: 0.3rem;display: flex;align-items: center;}
			}
			
		}
		.right{
			width: 1.2rem;
			padding: 0.253333rem 0 0;
			font-size: 14px;
		}
		.right.ave-hack{
			padding: 0.373333rem 0.133333rem 0;
		}
	}
</style>