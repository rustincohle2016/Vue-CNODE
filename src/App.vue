<template>
  <div id="app">
  <Header></Header>
  <Postlist></Postlist>
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
