<template>
  <div id="app">
  	<!-- <loading v-model="isLoading" text="努力加载中"></loading> -->
    <transition name="pixel-pop-in">
      <router-view class="router-view"></router-view> 
    </transition>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.loading.isLoading
    })
  }/*,
  beforeUpdate(){
    if (location.href.indexOf('?#') == -1) {
      let arr = location.href.split('#')
      let url = arr[0]+'?#'+arr[1]
      location.href = url
    }
  }*/
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
html,body,#app {
	height:100%;
  background:#f2f2f2;
  
}
      .router-view {
        width: 100%;
        height:100%;
        margin:0 auto;
      }
      .pixel-pop-out-enter-active,
    .pixel-pop-out-leave-active,
    .pixel-pop-in-enter-active,
    .pixel-pop-in-leave-active {
      will-change: transform;
      transition: all 500ms ease;
      height: 100%;
      position: absolute;
      backface-visibility: hidden;
      perspective: 1000;
    }
    .pixel-pop-out-enter {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
    .pixel-pop-out-leave-active {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .pixel-pop-in-enter {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .pixel-pop-in-leave-active {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
</style>
