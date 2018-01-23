<template>
	<div class="pro-bar">
		<div class="progress-bar progress-bar-striped active" :style="{width:percent+'%'}"></div>
	</div>
</template>
<script>
	export default {
		props:{
			percent:Number
		}
	}
</script>
<style lang='scss'>
	.pro-bar{
		height: 20px;
		overflow: hidden;
		background-color: #f5f5f5;
		border-radius: 4px;
		-webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
		box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
		.progress-bar {
		    float: left;
		    width: 0;
		    height: 100%;
		    font-size: 12px;
		    line-height: 20px;
		    color: #fff;
		    text-align: center;
		    background-color: #01b38a;
		    -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
		    box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
		    -webkit-transition: width .6s ease;
		    -o-transition: width .6s ease;
		    transition: width .6s ease;
		}
		.progress-bar-striped{
		    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
		    background-size: 40px 40px;
		}
		.progress-bar.active{
		    animation: progress-bar-stripes 2s linear infinite;
		}
		@keyframes progress-bar-stripes {
			0% {
			    background-position: 40px 0;
			}
			100% {
			    background-position: 0 0;
			}
		}
	}
</style>