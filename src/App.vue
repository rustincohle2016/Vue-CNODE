<template>
  <div id="app">
  <Header></Header>
   <div class="main">
     <router-view name="main">
       <!--接收routes中的路由对象-->
       <!--通过main指定的路由对象的改变使用不同的组件  main对应所显示组件-->
       <Postlist></Postlist>
     </router-view>
   </div>

    <!--注意写完组件后要在app组件进行渲染-->
  </div>
</template>

<script>
  import Header from './components/Header'
  import Postlist from './components/Postlist'
export default {
  name: 'App',
  components:{
    Header,Postlist
    // components组件内也要进行引用
  }
}
</script>

<style>
#app {

}
</style>
