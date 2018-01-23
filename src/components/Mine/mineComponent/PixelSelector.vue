<template>
	<div class="pixel-selector vux-x-input weui-cell">
		<span class="title">{{title}}</span>
		<div class="i-area">
			<span class="cell vux-1px" :class="
			{selected:valueId == cell.key}" :id="cell.icon" v-for="cell in options" @click="onSelect(cell.key)">
				<span class="icon iconfont" :class="cell.icon"></span>
				<span class="label">{{cell.value}}</span>
			</span>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				valueId:''
			}
		},
		props:{
			title:String,
			options:Array,
			value:String
		},
		methods:{
			onSelect(key){
				let vm = this
				if(key!=vm.valueId){
					vm.valueId = key
					this.$emit('onSelect',key)
				}
			}
		},
		mounted(){
			setTimeout(()=>{
				this.valueId = this.value
			},0)
			
		}
	}
</script>
<style lang='scss'>
	@import '../../../../static/lib/css/base/variable/base-color.scss';
	.pixel-selector{
		.title{
			width: 34px;
			display: inline-block;
		}
		.i-area{
			flex: 1;
			padding-left: 16px;
			padding-right: 2px;
    		text-align: right;
			.cell{
				position: relative;
				padding: 2px 12px 4px 8px;
				margin-right: 10px;
				text-align: center;
				display: inline-block;
				&::before{
					border-radius: 0.266667rem;
				}
				.icon-girl{
					color: pink;
				}
				.icon-boy{
					color:$text-green-color;
				}
			}
			.selected#icon-boy{
				background-color: $text-green-color;
				&::before{
					border-color: $text-green-color;
				}
			}
			.selected#icon-girl{
				background-color: pink;
				&:before{
					border-color: pink;
				}
			}
			.selected{
				color: #fff;
				border-radius: 0.136667rem;
				.icon-boy{
					color: #fff;
				}
				.icon-girl{
					color: #fff;
					
				}
			}
		}
	}
</style>