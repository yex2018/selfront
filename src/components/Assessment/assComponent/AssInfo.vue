<!-- 测评信息 -->
<template>
	<div class="ass-info">
		<div class="img-wrap vux-1px-b">
			<img :src="info.picture" alt="">
		</div>
		<div class="ass-attr vux-1px-b">
			<p class="title">{{info.name}}</p>
			<div class="attrs text-gray">
				<span>{{info.maxIndex}}道精选问题</span>
				<span>{{info.page_number}}页专业报告</span>
				<span>{{info.person_count}}人测试过</span>
			</div>
		</div>
		<div class="ass-attr">
			<p class="title">
				<span class="icon iconfont icon-flag"></span>
				测评详情
			</p>
			<div class="detail" v-html="info.details"></div>
		</div>
		<div class="ass-pdf activeBg" @click="getPDF">
			<span class="icon iconfont icon-pdf"></span>
			<p>点击查看报告样例</p>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
			info:Object
		},
		methods:{
			getPDF(){
				location.href=this.info.sample_report
			}
		}
	}
</script>
<style lang='scss'>
	.ass-info{
		.img-wrap{
			height: 4rem;
			padding-top: 0.3rem;
			text-align: center;
			img{
				height: 3.4rem;
			}
		}
		.ass-attr{
			padding: 0.133333rem 0.266667rem 0.4rem;
			.title{
				text-align: center;
				font-weight: bold;
				font-size: 0.373333rem;
				.icon-flag{
					font-weight: normal;
					position: relative;
					bottom: -0.036rem;
					&:before{
						font-size:0.5rem;
					}
				}
			}
			.attrs{
				display: flex;
				justify-content: space-between;
				padding-top: 0.2rem;
				font-size: 0.346667rem;
			}
			.detail{
				padding-top: 0.2rem;
				font-size: 0.346667rem;
			}
		}
		.ass-pdf{
			text-align: center;
			padding: 0.266667rem 0;
			width: 5rem;
			margin:0 auto;
			.icon-pdf{
				font-size: 1.6rem;
				color: #ff5562;
			}
			p{
				font-size: 0.4rem;
				padding-top: 0.266667rem;
				color: #565656;
			}
		}
	}
</style>