import Vue from 'vue'
import Router from 'vue-router'
import Article from "../components/Article";
import Postlist from "../components/Postlist";
import Userinfo from "../components/Userinfo"


Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'root',
      path: '/',
      components: {
        // 注意这里使用components!!!!
        main: Postlist
      }
      // 当显示首页时,显示postlist组件
    },

    {
      path: '/topic/:id',
      name: 'post_content',
      // 此对象是article组件的路由
      components:{
        main:Article,
        // 当进入article页面时,显示article组件
        // 组件定义名称
      }
      // 以上组件接收postlist组件收到的ID
    },

    {
      name:'user_info',
      // 此对象为用户信息的路由
      path:'/userinfo/:name',
      components:{
        main:Userinfo,
      }
    },

  ]
})
