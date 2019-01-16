<template>
   <div class="article">
     <!--在数据未返回的时候，显示这个正在加载的gif-->
     <div class="loading" v-if="isLoading">
       <img src="../assets/loading.gif" >
     </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">
        {{post.title}}
        </div>
        <ul>
          <li>•发布于：{{post.create_at |formatDate}}</li>
          <!--创建时间-->
          <li>•作者:{{post.author.loginname}}</li>
          <li>•{{post.visit_count}}次浏览</li>
          <li>•来自{{post | tabFormatter}}</li>
        </ul>

      </div>
      <div v-html="post.content" class="topic_content"></div>
      <div id="reply">
        <div class="topbar">回复</div>
        <div v-for="(reply,index) in post.replies" class="replySec">
          <!--将传输到本地的回复数据渲染到页面上-->
          <router-link :to="{
          name:'user_info',
          params:{
          name:reply.author.loginname
          },
          // 此处点击则进入用户信息界面
          }
">
            <img :src="reply.author.avatar_url" alt="">
            <!--头像-->
          </router-link>
            <router-link :to="{
            name:'user_info',
            // 此处注意使用字符串
            params:{
            name:reply.author.loginname
            }
                    // 此处点击则进入用户信息界面

            }">

          <span>{{reply.author.loginname}}</span>
            </router-link>
          <!--用户名-->
          <span>{{index+1}}楼</span>
          <!--发言次序-->
          <p v-html="reply.content"></p>
        </div>
      </div>


    </div>
   </div>
</template>

<script>
    export default {
        name: "Article",
        data(){
          return{
            isLoading:false,
            post:{},
            // post定义为空对象,接收后台传来的数据
          }

        },
        methods:{
          getArticleData(){
            this.$http.get
            (
              `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
            )
              // `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
              .then(res=>{
                if(res.data.success == true){
                  //success状态为true时,表明获取数据成功
                  this.isLoading =false;
                  this.post = res.data.data;
                }
                // this.isLoading = false;
                // this.post = res.data.data;
              })
              .catch(function (err) {
                console.log(err)
              })
          }
        },
      beforeMount() {
          this.isLoading = true
          this.getArticleData()
        // 注意引用函数也要使用this指向
      }


    }
</script>

<style >
  @import url('../assets/markdown-github.css');
  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }

  #reply, .topic_header {
    background-color: #fff;
  }

  #reply {
    margin-top: 15px;
  }

  #reply img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -9px;
  }

  #reply a, #reply span {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
  .replySec{
    border-bottom:1px solid #e5e5e5;
    padding:0 10px;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }

  .replyUp a:nth-of-type(2) {
    margin-left: 0px;
    display: inline-block;
  }

  .topic_header {
    padding: 10px;
  }

  .topic_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  .topic_header ul {
    list-style: none;
    padding: 0px 0px;
    margin: 6px 0px;
  }

  .topic_header li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    border-top: 1px solid #e5e5e5;
    padding: 0 10px;
  }

  .markdown-text img {
    width: 92% !important;
  }
</style>
