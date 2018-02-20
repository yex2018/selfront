<!-- 我的宝贝-改造为新增儿童页面 -->
<template>
	<div class="mine-baby">
		<group>
	      	<x-input class="name" title="姓名" placeholder="请输入儿童姓名" placeholder-align="right" text-align="right" v-model="body.name"></x-input>
	      	<pixel-selector title="性别" :options="sexList" :value="body.gender" @onSelect="chengeSex"></pixel-selector>
	      	<datetime v-model="body.birth_date" title="生日" :start-date=startDate :end-date=endDate></datetime>
	      	<selector title="家长身份" :options="list" v-model="body.relation"></selector>
	    </group>
	    <div class="btn-container">
	    	<x-button type="primary" action-type="button" @click.native="save">保存</x-button>
	    </div>
	</div>
</template>
<script>
	import {Group,Datetime,XInput,Selector,XButton,XHeader} from 'vux'
	import {PixelSelector} from './mineComponent'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				body:{
					name:'', //儿童姓名
					gender:'', // 儿童性别
					birth_date:'', // 儿童生日
					user_id:'', // 用户id
					child_id:'0', //儿童id
					relation:'' // 用户儿童关系
				},
				startDate:'1900-01-01',// 最小日期
				endDate: '2030-12-31',// 最大日期
				list:[], //儿童关系列表
				sexList:[{key: '1', value: '男',icon:'icon-boy'}, {key: '2', value: '女',icon:'icon-girl'}]
			}
		},
		components:{
			Group,Datetime,XInput,Selector,XButton,XHeader,PixelSelector
		},
		methods:{
			/* @desc:获取儿童与家长关系，初始化list */
			initRelation(){
				let vm = this
				api.getRelation().then(resp=>{
					if(resp.data.res == 0){
						vm.list = vm.objToky(resp.data.data)
					}
				})
			},
			chengeSex(val){
				this.body.gender = val
			},
			save(){
				let vm = this
				if(vm.checkInfo()){
					vm.body.user_id = vm.getMsg('base','userInfo').user_id
					api.addchild(vm.body).then(resp=>{
						if(resp.data.res == 0){
							vm.$vux.alert.show({
								title: '提示',
								content: '添加儿童信息成功'
							})
							let data = vm.getMsg('mineBaby','data')
							vm.$router.push({path:data.path,query:data.query})
						}
					})
				}
				
			},
			loadInfo(){
				document.title = '添加宝贝'
				this.initRelation()
			},
			checkInfo(){
				let vm = this
				if(vm.body.name==''){
					this.$vux.toast.show({
						text: '请输入姓名',
						type: 'text',
						width: '3.5rem'
					})
					return false
				}else if(vm.body.birth_date == ''){
					this.$vux.toast.show({
						text: '请选择出生日期',
						type: 'text',
						width: '4rem'
					})
					return false
				}else if(vm.body.relation == ''){
					this.$vux.toast.show({
						text: '请选择家长身份',
						type: 'text',
						width: '4rem'
					})
					return false
				}else{
					return true
				}
			}
		},
		created(){
			this.loadInfo()
		},
		beforeRouteEnter (to, from, next) {
		    next(vm=>{
		    	let body = {
			    	path:from.path,
			    	query:from.query
			    }
		    	vm.setMsg('mineBaby','data',body)
		    })
		}
	}
</script>
<style lang='scss'>
	.mine-baby{
		height: 100%;
		width: 100%;
		color: #666;

		.vux-no-group-title{
			margin-top: 0; 
			.weui-cell_select .weui-cell__bd{&:after{width: 0.266667rem;height: 0.266667rem;}}
		}
		.vux-selector{
			padding: 3px 0;
			.weui-cell__bd{position: relative;}
			select{direction: rtl;color: #999;padding-right: 0.426667rem;}
		}
		.vux-selector.weui-cell_select-after { padding: 0 15px; }
	}
</style>
