<!-- 我的宝贝-改造为新增儿童页面 -->
<template>
	<div class="mine-baby">
		<div class="headIcon">
			<img v-if="body.head_portrait" :src="body.head_portrait" alt="" @click="addPic">
			<img v-else alt="" @click="addPic">
		</div>
		<group>
	      	<x-input class="name" title="姓名" placeholder="请输入儿童姓名" v-model="body.name"></x-input>
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
					head_portrait:'', //儿童头像地址
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
				document.title = '我的宝贝'
				this.initRelation()
				this.configWxjssdk()
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
			},
			addPic(){
				let vm = this
				wx.chooseImage({
				    count: 1, // 默认9
				    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				    success: function (res) {
				        vm.upImg(res.localIds)
				    }
				});
			},
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
	@import './scss/fn.scss';
	.mine-baby{
		height: 100%;
		width: 100%;
		background: #fff;
		@include baby-info;
	}
</style>
