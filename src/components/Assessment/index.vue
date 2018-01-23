<!-- 测评 -->
<template>
	<div class="assessment p-com-container">
		<ass-cell-wrapper v-for="item in assList" :ass="item" :key="item.category">
			<ass-cell v-for="cell in item.data" :cell="cell" :key="cell.evaluation_id" @click.native="goDetail(cell)"></ass-cell>
		</ass-cell-wrapper>
	</div>
</template>
<script>
	import { AssCell,AssCellWrapper } from './assComponent'
	import * as api from '../../api/assessmentApi'
	export default{
		data(){
			return {
				assList:[]
			}
		},
		components:{
			AssCell,
			AssCellWrapper
		},
		methods:{
			loadInfo(){
				let vm = this
				document.title = '测评'
				vm.getUserInfo()
			},
			getUserInfo(){
				let vm = this,body = {
					openid:vm.getCookie('openid')
				}
				if(vm.getMsg('base','userInfo')!=null){
					vm.getAssList(vm.getMsg('base','userInfo').role)
				}else{
					api.qryUser(body).then(resp=>{
						if(resp.data.res == 0){
							vm.setMsg('base','userInfo',resp.data.data)
							vm.getAssList(vm.getMsg('base','userInfo').role)
						}else{
							vm.getAssList(0)
						}
					})
				}
			},
			getAssList(access){
				let vm = this,body = {
					user_access:access
				}
				vm.assList = vm.$store.getters.activeAssList
				if(vm.assList.length == 0){
					vm.$store.dispatch('FETCH_ASSLIST',body)
					.then(resp=>{
						vm.assList = vm.$store.getters.activeAssList
					})
				}
			},
			goDetail(cell){
				// this.setMsg('assDetail','info',cell)
				if(Number(cell.price)>0){
					this.$router.push({path:'/assPriceDetail',query:{evaluation_id:cell.evaluation_id}})
				}else if(cell.price==0){
					this.$router.push({path:'/assFreeDetail',query:{evaluation_id:cell.evaluation_id}})
				}
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.assessment{
		color: #666;
	}
</style>