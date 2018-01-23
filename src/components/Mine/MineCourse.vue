<!-- 我的课程 -->
<template>
	<div class="mine-course p-container">
		<div v-if="courseList.length>0&&endLoad">
	    	<course-cell v-for="item in courseList" :cell="item" key="item" @click.native="courseGo(item)">
	    		<span v-if="item.price=='0'" slot="btn" class="ass-btn">免费</span>
	    		<span v-else slot="btn" class="ass-btn">已付费</span>
	    	</course-cell>
	    </div>
	    <div v-if="courseList.length==0&&endLoad">
	    	<error-info></error-info>
	    </div>
	</div>
</template>
<script>
	import {XHeader} from 'vux'
	import ErrorInfo from '../AppBase/ErrorInfo'
	import { CourseCell } from './mineComponent'
	import * as api from '../../api/mineApi'
	export default {
		data(){
			return {
				courseList:[],
				endLoad:false
			}
		},
		components:{
			XHeader,ErrorInfo,CourseCell
		},
		methods:{
			loadInfo(){
				let vm = this,body = {
					user_id:vm.getMsg('base','userInfo').user_id
				}
				document.title = '我的学习'
				api.getMineCourse(body).then(resp=>{
					if(resp.data.res=='0'&&resp.data.data!=null){
						vm.courseList = resp.data.data
					}
					vm.endLoad = true
				})
			},
			courseGo(cell){
				if(Number(cell.price)>0){
					this.$router.push({path:'/coursePrice',query:{course_id:cell.course_id}})
				}else if(cell.price==0){
					this.$router.push({path:'/courseFree',query:{course_id:cell.course_id}})
				}
			}
		},
		mounted(){
			this.loadInfo()
		}
	}
</script>
<style lang='scss'>
	
</style>