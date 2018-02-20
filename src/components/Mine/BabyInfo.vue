<!-- 儿童详情-儿童信息 -->
<template>
	<div class="baby-info">
		<group>
	      	<x-input class="name" title="姓名" placeholder="请输入儿童姓名" placeholder-align="right" text-align="right" v-model="body.name"></x-input>
	      	<pixel-selector v-if="endLoad" title="性别" :options="sexList" :value="body.gender" @onSelect="chengeSex"></pixel-selector>
	      	<datetime v-model="body.birth_date" title="生日" :start-date=startDate :end-date=endDate></datetime>
	      	<selector ref="defaultValueRef" title="家长身份" v-model="body.relation" :options="list"></selector>
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
		name:'baby-info',
		data(){
			return {
				body:{
					relation:'',
					name:'',
					gender:'',
					birth_date:'',
					user_id:'',
					child_id:''
				},
				startDate:'1900-01-01',// 最小日期
				endDate: '2030-12-31',// 最大日期
				list:[],
				sexList:[{key: '1', value: '男',icon:'icon-boy'}, {key: '2', value: '女',icon:'icon-girl'}],
				endLoad:false
			}
		},
		components:{
			Group,Datetime,XInput,Selector,XButton,XHeader,PixelSelector
		},
		methods:{
			/* @desc:根据child_id,获取儿童信息 */
			initChild(){
				let vm = this,body = {
					child_id:parseInt(vm.$route.query.child_id),
					user_id:vm.getMsg('base','userInfo').user_id
				}
				api.getChildById(body).then(resp=>{
					if(resp.data.res==0){
						let _data = resp.data.data
						vm.body.child_id = _data.child_id
						vm.body.birth_date = vm.formatDate(_data.birth_date)
						vm.body.gender = _data.gender.toString()
						vm.body.name = _data.name
						vm.body.relation = _data.relation
					}
					vm.endLoad = true
				})
			},
			/* @desc:获取儿童与家长关系，初始化list */
			initRelation(){
				let vm = this
				api.getRelation().then(resp=>{
					if(resp.data.res == 0){
						vm.list = vm.objToky(resp.data.data)
					}
				}).then(()=>{
					vm.initChild()
				})
			},
			/* @desc:修改性别 */
			chengeSex(val){
				this.body.gender = val
			},
			/* @desc:保存儿童信息 */
			save(){
				let vm = this
				if(vm.checkInfo()){
					vm.body.user_id = vm.getMsg('base','userInfo').user_id
					api.addchild(vm.body).then(resp=>{
						if(resp.data.res == 0){
							vm.$vux.alert.show({
								title: '提示',
								content: '修改儿童信息成功'
							})
						}
					})
				}
			},
			loadInfo(){
				document.title = '宝贝信息'
				this.initRelation()
				this.configWxjssdk()
			},
			/* @desc:检测修改信息 */
			checkInfo(){
				let vm = this
				if(vm.body.name==''){
					this.$vux.toast.show({
						text: '请输入姓名',
						type: 'text',
						width: '3.5rem'
					})
					return false
				}else if(vm.body.gender == ''){
					this.$vux.toast.show({
						text: '请选择性别',
						type: 'text',
						width: '4rem'
					})
					return false
				}else if(vm.body.birth_date == ''){
					this.$vux.toast.show({
						text: '请选择出生日期',
						type: 'text',
						width: '4rem'
					})
					return false
				}else if(vm.body.relation === ''){
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
		}
	}
</script>
<style lang='scss'>
	.baby-info{
		height: 100%;
		width: 100%;
		color: #666;

		.vux-no-group-title{
			margin-top: 0.2rem; 
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