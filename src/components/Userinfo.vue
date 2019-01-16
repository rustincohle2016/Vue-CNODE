<template>
   <div class="userInfomation">
     <section>

     <img :src="userinfo.avatar_url" alt="">
     <span>{{userinfo.loginname}}</span>
     <p>积分:{{userinfo.score}}</p>
     <p>注册时间:{{userinfo.create_at|formatDate}}</p>

     </section>
      <!--以上为用户信息展示-->
     <div>
       <p>最近的主题</p>
       <ul>
         <li v-for="item in userinfo.recent_replies">
          <router-link :to="{
          name:'post_content',
          params:{
          id:item.id
          }
          }">
            {{item.title}}
          </router-link>
         </li>
         <!--帖子的标题指向article组件,所以使用文章组件的路由-->
       </ul>
     </div>
   </div>
</template>

<script>
    export default {
      name: "User_info",
      data() {
        return {
          userinfo: {}
        }
      },
      methods: {
        getData() {
          this.$http.get
          (
            `https://cnodejs.org/api/v1/user/${this.$route.params.name}`
          )
          // `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
            .then(res => {
              if (res.data.success == true) {
                //success状态为true时,表明获取数据成功
                this.isLoading = false;
                this.userinfo = res.data.data;
              }
              // this.isLoading = false;
              // this.post = res.data.data;
            })
        }
      },
      beforeMount() {
        this.getData()
      }
    }
</script>

<style scoped>
  .userInfomation {
    background: white;
    width: 75%;
    margin: 10px auto;
  }
  .userInfomation section {
    padding: 12px;
  }
  .userInfomation img {
    width: 30px;
  }
  .userInfomation li {
    list-style:none;
  }
  .userInfomation .replies,
  .userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
  }
  .userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }
  .userInfomation > div >ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
  }
  .userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
  }

</style>
