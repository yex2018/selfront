<template>
	<div class="ass-que-detail" v-if="endLoad">
		<div>
			<div class="cent">
				<div class="num">{{Info.question_index}}/{{Info.maxIndex}}</div>
				<pro-bar class="pro" :percent="percent"></pro-bar>
			</div>
			
			<div class="ass-que" v-if="questions.dimensions.length==1">
				<div class="ques">
					{{Info.question_index}}、{{questions.question}}
				</div>
				<div v-for="(item,index) in questions.dimensions" @click="getItem(item,index)">
					<p class="dimension">{{item.dimension}}</p>
					<group>
				      	<radio :options="item.options" v-model="item.answer" @on-change="change"></radio>
				    </group>
				</div>
			</div>
			<div class="ass-que" v-if="questions.dimensions.length>1">
				<div class="ques">
					{{Info.question_index}}、{{questions.question}}
				</div>
				<div v-for="(item,index) in questions.dimensions">
					<p class="dimension">{{item.dimension}}</p>
					<group>
				      	<radio :options="item.options" v-model="item.answer" @on-change="change" @click.native="getItemTwo(item,index)"></radio>
				    </group>
				</div>

			</div>

			<div class="btn-container" v-if="questions.dimensions.length==1">
		    	<div v-if="Info.question_index!=1&&Info.maxIndex!=Info.question_index" class="btn_g">
		    		<span class="first_btn" @click="prev">上一题</span>
		    	</div>
		    	<div v-if="Info.question_index==Info.maxIndex" class="btn_g">
		    		<span @click="prev">上一题</span>
		    		<span class="submit activeBg" @click="submit">查看报告</span>
		    	</div>
		    </div>
		    <div class="btn-container" v-if="questions.dimensions.length>1">
		    	<span v-if="Info.question_index==1&&Info.maxIndex>1" class="first_btn" @click="next">下一题</span>
		    	<div v-if="Info.question_index!=1&&Info.maxIndex!=Info.question_index" class="btn_g">
		    		<span @click="prev">上一题</span>
		    		<span @click="next">下一题</span>
		    	</div>
		    	<div v-if="Info.question_index==Info.maxIndex" class="btn_g">
		    		<span @click="prev">上一题</span>
		    		<span class="submit activeBg" @click="submit">查看报告</span>
		    	</div>
		    </div>
		</div>
	</div>
</template>
<script>
	import { ProBar } from './assComponent'
	import { Radio, Group,XHeader } from 'vux'
	import * as api from '../../api/assessmentApi'
	export default {
		data(){
			return {
				Info:{},
				endLoad:false,
				percent:0,
				answer:[],
				curIndex:0,
				questions:[],
				defaultProps:{
					label:'value',
					value:'key'
				}
			}
		},
		components:{
			ProBar,Radio,Group,XHeader
		},
		methods:{
			loadInfo(data){
				let q_index = this.$route.query.index
				let vm = this,body = {
					evaluation_id:data?data.evaluation_id:vm.$route.query.evaluation_id,
					user_id:data?data.user_id:vm.$route.query.user_id,
					child_id:data?data.child_id:vm.$route.query.child_id,
					index:data?data.index:q_index
				}
				// 重置
				vm.answer = []
				vm.curIndex = 0
				api.getQue(body).then(resp=>{
					if(resp.data.res == 0){
						vm.Info = resp.data.data
						vm.questions = JSON.parse(vm.Info.content)
						if(vm.Info.answer!=''){
							vm.InitAnswer(vm.Info.answer,vm.questions)
						}else{
							vm.questions.dimensions.forEach(item=>{
								vm.$set(item,'answer','')
							})
						}
						vm.percent = vm.Info.question_index/vm.Info.maxIndex*100
						if(vm.percent==100&&vm.Info.answer!=''){
							vm.setMsg('assDetail','submitFlag',true)
						}
						vm.endLoad = true
					}else if(resp.data.res == 1 && resp.data.msg == "当前题目已经做完！"){
						this.$vux.alert.show({
							title: '提示',
							content: resp.data.msg,
							onHide () {
					           vm.$router.push({path:'/assResult'})
					        }
						})
					}
				})
				document.title = vm.$route.query.assName
			},
			InitAnswer(result,questions){
				let vm = this
				vm.answer = result.split(',')
				vm.answer.forEach((item,index)=>{
					vm.$set(vm.questions.dimensions[index],'answer',item)
				})
			},
			chooseInfo(data){
				let vm = this
				vm.answer[0] = data.key
				vm.next()
			},
			change(value, label){
				let vm = this
				vm.answer[vm.curIndex] = value
			},
			getItem(item,index){
				let vm = this
				vm.curIndex = index
				vm.isNext = true
				setTimeout(()=>{
					vm.next()
				},100)
			},
			getItemTwo(item,index){
				let vm = this
				vm.curIndex = index
			},
			next(){
				let vm = this
				if((vm.questions.dimensions.length!=vm.answer.length)||vm.checkAnswer()){
					
				}else{
					let str = ''
					vm.answer.forEach((item,index)=>{
						if(index==0){
							str+=item
						}else{
							str+=','+item
						}
					})
					vm.upAnswer(str)
				}
			},
			checkAnswer(){
				let vm = this
				for(let i = 0;i<vm.answer.length;i++){
					if(vm.answer[i]==''){
						return true
					}
				}
				return false
			},
			prev(){
				let vm = this,body = {
					evaluation_id:vm.$route.query.evaluation_id,
					user_id:vm.$route.query.user_id,
					child_id:vm.$route.query.child_id,
					index:parseInt(vm.Info.question_index)-1
				}
				vm.setMsg('assDetail','curIndex',parseInt(vm.Info.question_index)-1)
				vm.loadInfo(body)
			},
			upAnswer(answer){
				let vm = this,body = {
					evaluation_id:vm.$route.query.evaluation_id,
					user_id:vm.$route.query.user_id,
					child_id:vm.$route.query.child_id,
					current_question_id	:vm.Info.question_index,
					text_result:'',
					report_result:'',
					answer:answer,
					maxIndex:vm.Info.maxIndex,
					question_id:vm.Info.question_id
				}
				api.updateevalution(body).then(resp=>{
					if(resp.data.res == '0'){
						if(vm.Info.question_index==vm.Info.maxIndex){
							/*做完最后一题，等待提交*/
							let info = vm.getMsg('assDetail','info')
							vm.setMsg('assDetail','submitFlag',true)
						}else{
							vm.getNext()
						}
					}
				})
			},
			getNext(){
				let vm = this,body = {
					evaluation_id:vm.$route.query.evaluation_id,
					user_id:vm.$route.query.user_id,
					child_id:vm.$route.query.child_id,
					index:parseInt(vm.Info.question_index)+1
				}
				vm.setMsg('assDetail','curIndex',parseInt(vm.Info.question_index)+1)
				vm.loadInfo(body)
			},
			submit(){
				let vm = this
				if(vm.getMsg('assDetail','submitFlag')){
					vm.$vux.confirm.show({
						// 组件除show外的属性
						title: '提示',
        				content: '您已完成'+vm.$route.query.assName+'，是否前往查看测评结果？',
						onCancel () {
								   	
						},
						onConfirm () {
							vm.getReport()
						}
					})
				}else{
					vm.$vux.alert.show({
						title: '提示',
						content: '请选择答案再提交'
					})
				}
			},
			getReport(){
				let vm = this,body = {
					evaluation_id:vm.$route.query.evaluation_id,
					user_id:vm.$route.query.user_id,
					child_id:vm.$route.query.child_id,
					typeid:'0',
					user_evaluation_id:''
				}
				if(vm.$route.query.keyname=='skill'){
					vm.$router.replace({path:'/assResult',query:body})	
				} else{
					vm.$router.replace({path:'/assNoTemplate',query:body})
				}
				
			}
		},
		created(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	.ass-que-detail{
		height: 100%;
		background: #fff;
		.cent{
			width: 9.306667rem;
			padding: 0.266667rem 0.346667rem 0.2rem;
			display: flex;
			.num{
				width: 1rem;
			}
			.pro{
				flex: 1;
			}
		}
		.ass-que{
			.ques{
				width: 9.306667rem;
				padding: 0 0.346667rem 0.2rem;
				font-size: 17px;
			}
			.dimension{
				padding: 0.266667rem 0.346667rem 0;
				font-size: 16px;
			}
		}
		.btn-container{
			padding:0.8rem 0.426667rem 0;
			.first_btn{
				color: #01b38a;
				border: 1px solid #01b38a;
				width: 9.146667rem;
				display: inline-block;
				text-align: center;
				height: 1.066667rem;
				line-height: 1.066667rem;
				font-size: 0.426667rem;
				border-radius: 5px;
			}
			.btn_g{
				width: 9.146667rem;
				display: flex;
				justify-content: space-between;
				span{
					display: inline-block;
					text-align: center;
					height: 1.066667rem;
					line-height: 1.066667rem;
					font-size: 0.426667rem;
					color: #01b38a;
					border: 1px solid #01b38a;
					padding: 0 1.333333rem;
					border-radius: 5px;
				}
				.submit{
					border: 1px solid #fff;
					background-color: #01b38a;
					color: #fff;
				}
			}
		}
	}
</style>