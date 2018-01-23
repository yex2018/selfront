<!-- 单选项列表组件 -->
<template>
	<div class="radio_list">
		<div class="radio_item ratain-border-bottom" v-for="item in options" @click="chooseNode(item)">
			<span class="radio_label">{{item[defaultProps.label]}}</span>
			<span class="check icon iconfont icon-gou" v-show="item[defaultProps.value]===curValue"></span>
			<span class="radio_core" :class="{'checked':item[defaultProps.value]===curValue}"></span>
			<input type="radio" v-bind:value="curValue" value="item[defaultProps.value]">
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				curValue:''//当前value值
			}
		},
		props:{
			options:{
				type:Array,
				required:true
			},
			value:{
				type:String,
				required:false,
				default:''
			},
			defaultProps:{
				type:Object,//配置项
				required:false,
				default:function(){
					return {
						label:'label',
						value:'value'
					}
				}
			}
		},
		methods:{
			chooseNode(item){
				this.curValue = item[this.defaultProps.value]
				this.$emit('chooseNode',item)
			}
		},
		mounted(){
			this.curValue = this.value
		}
	}
</script>
<style lang='scss'>
	@import '../../../../static/lib/css/base/variable/base-color.scss';
	.radio_list{
		width: 100%;
		.radio_item{
			height: 1.146667rem;
			margin-left: 0.4rem;
			line-height: 1.146667rem;
			.radio_label{
				font-size:0.4rem;
			}
			input{
				display: none;
			}
			.check{
				float: right;
				padding-right: 0.4rem;
				color: $text-green-color;
			}
			.radio_core{
				display: inline-block;
			    background-color: #fff;
			    border-radius: 100%;
			    border: 1px solid #ccc;
			    position: relative;
			    width: 20px;
			    height: 20px;
			    vertical-align: middle;
			    float: right;
			    &::after{
					content: " ";
				    border-radius: 100%;
				    top: 5px;
				    left: 5px;
				    position: absolute;
				    width: 8px;
				    height: 8px;
				    -webkit-transition: -webkit-transform .2s;
				    transition: -webkit-transform .2s;
				    transition: transform .2s;
				    transition: transform .2s, -webkit-transform .2s;
				    -webkit-transform: scale(0);
				    transform: scale(1);
				    z-index: 3;
				    background-color: #fff;
			    }
			}
			.checked{
				background-color: #26a2ff;
    			border-color: #26a2ff;
			}

		}
	}
</style>