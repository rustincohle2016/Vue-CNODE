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
    },

    {
      path: '/topic/:id',
      name: 'post_content',
      components:{
        main:Article,
        // 组件定义名称
      }
    },
    // 此对象是postlist的路由
    {
      name:'user_info',
      path:'/userinfo/name',
      components:{
        main:Userinfo,
      }
    }
  ]
})
