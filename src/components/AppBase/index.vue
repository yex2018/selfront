<!-- app-base -->
<template>
	<div class="app-base p-container">
    <transition name="pixel-pop-in">
      <router-view class="router-view"></router-view> 
    </transition>
		<tabbar v-model="selected">
      <tabbar-item class="activeBg" @click.native="changeTab(0)">
        <span slot="icon" class="icon iconfont icon-ceping"></span>
        <span slot="label">测评</span>
      </tabbar-item>
      <tabbar-item class="activeBg" @click.native="changeTab(1)">
        <span slot="icon" class="icon iconfont icon-kecheng"></span>
        <span slot="label">学习</span>
      </tabbar-item>
      <tabbar-item class="activeBg" @click.native="changeTab(2)">
        <span slot="icon" class="icon iconfont icon-wode"></span>
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
	</div>
</template>
<script>
	import { Tabbar, TabbarItem } from 'vux'
	export default {
    data(){
      return {
        selected:0
      }
    },
		components: {
      Tabbar,
      TabbarItem
    },
    methods:{
      loadInfo(){
        let vm = this,path=['Assessment','Course','Mine']
        //获取sessionStorage中的index,选择路由
        vm.selected = _.indexOf(path,vm.$route.name)
        // if(vm.getMsg('Index','path')){
        //   vm.selected = parseInt(vm.getMsg('Index','path'))
        // }
      },
      changeTab(value){
          let index = parseInt(value),path=['Assessment','Course','Mine'],vm = this
          //保存已选择index
          vm.setMsg('Index','path',value)
          vm.$router.push({name:path[index]})
      }
    },
    created(){
      this.loadInfo()
      // 开发环境手动初始化cookie
      if(process.env.NODE_ENV == 'development'){
        this.initCookie()  
      }
      
    }
	}
</script>
<style lang='scss'>
  @import '../../../static/lib/css/widget/tabbar/tabbar.scss';
  .app-base{
      
  }
</style>