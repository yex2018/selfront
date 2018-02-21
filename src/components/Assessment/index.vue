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
					vm.getAssList()
				}else{
					api.qryUser(body).then(resp=>{
						if(resp.data.res == 0){
							vm.setMsg('base','userInfo',resp.data.data)
							vm.getAssList()
						}else{
							vm.getAssList()
						}
					})
				}
			},
			getAssList(access){
				let vm = this
				vm.assList = vm.$store.getters.activeAssList
				if(vm.assList.length == 0){
					vm.$store.dispatch('FETCH_ASSLIST',null)
					.then(resp=>{
						vm.assList = vm.$store.getters.activeAssList
					})
				}
			},
			goDetail(cell){
				this.$router.push({path:'/assDetail',query:{evaluation_id:cell.evaluation_id}})
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