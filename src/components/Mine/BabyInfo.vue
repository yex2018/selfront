<!-- 儿童详情-儿童信息 -->
<template>
	<div class="baby-info">
		<div class="headIcon">
			<img v-if="body.head_portrait" :src="body.head_portrait" alt="" @click="addPic">
			<img v-else alt="" @click="addPic">
		</div>
		<group>
	      	<x-input class="name" title="姓名" placeholder="请输入儿童姓名" v-model="body.name"></x-input>
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
					head_portrait:'',
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
						vm.body.head_portrait = _data.head_portrait
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
								content: '修改儿童信息成功',
								onHide () {
          console.log('Plugin: I\'m hiding now')
        }
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
			},
			/* @desc:预览图片 */
			addPic(){
				let vm = this
				wx.chooseImage({
				    count: 1, // 默认9
				    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'],
				    success: function (res) {
				        vm.upImg(res.localIds)
				    }
				});
			},
			/* @desc:上传图片 */
			upImg(localIds){
				let vm = this
				let localId = localIds.shift()
				wx.uploadImage({
				    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
				    isShowProgressTips: 1, // 默认为1，显示进度提示
				    success: function (res) {
				        let body = {
				        	mediaid:res.serverId
				        }
				        api.UploadChildImg(body).then(resp=>{
				        	if(resp.data.res=='0'){
				        		vm.body.head_portrait = resp.data.data
				        	}
				        })
				    }
				});
			}
		},
		created(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	@import './scss/fn';
	.baby-info{
		height: 100%;
		width: 100%;
		background: #fff;
		@include baby-info;
	}
</style>