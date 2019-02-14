<template>
    <div class="PostList">
      <div class="loading" v-if="isLoading">
        <!--v-if判断状态-->
        <img src="../assets/loading.gif">
      </div>
      <!--以上是控制空白页面展示动画-->
      <!--以下是主题列表-->
      <div class="posts" v-else>
        <ul>
          <li>
            <div class="toobar">
              <!--//作为主题分类-->
              <span>全部</span>
              <span>精华</span>
              <span>分享</span>
              <span>问答</span>
              <span>招聘</span>
            </div>
          </li>
          <li v-for="post in posts">
            <!--//主题展现区域-->
            <img :src="post.author.avatar_url" alt="">
            <!--注意这里的动态绑定src地址-->
            <!--//展示头像-->
            <span class="allcount">
              <span class="reply_count">
                {{post.reply_count}}
                <!--//帖子的回复量-->
              </span>
              /{{post.visit_count}}
              <!--//帖子的访问量-->
            </span>
            <!--帖子的分类-->
            <span :class="[{put_good:(post.good  == true),put_top:(post.top  == true),
        'topiclist-tab':(post.good  != true && post.top  != true)}]">
          <span>
            {{post | tabFormatter}}
          </span>
        </span>
            <!--标题区域-->
            <!--点击标题进入页面应使用router-link绑定地址,写article组件后加入-->
            <router-link :to="{
            name:'post_content',
            params: {
            id: post.id,
            // 此处将文章的ID传递给路由,由article组件接收
            name:post.author.loginname
            // 此处将文章的loginname传递给路由,由sidebar组件接收
            }
            }">
              <!--点击标题,将帖子的ID传输给article组件.-->
              <span>
              {{post.title}}
            </span>
            </router-link>

            <!--回复时间-->
            <span class="last_reply">
              {{post.last_reply_at | formatDate }}
            </span>
          </li>
          <li>
            <pagination></pagination>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import pagination from './Pagination'
    export default {
        name: "Postlist",
        data(){
          return {
            isLoading:false,
            posts:[],
            // post用于接收axios收到的数据,定义在data内
          }
        },
      components:{
          pagination,
      },
      //引用pagination组件
      methods:{
          getData(){
            this.$http.get('https://cnodejs.org/api/v1/topics',{
              params:{
                page:this.postpage,
                limit:20
              }
            })
            // 以上为使用get方法从后台拿到数据及格式要求
              .then(res=>{
                this.isLoading = false;
                this.posts  = res.data.data
                // posts为数据存储的数组,将拿到的数据填充进本地数组后进行
              })
              // then作为处理数据的方法
              .catch(function (err) {
                console.log(err)
              })
            // catch作为处理错误的方法
          }

      },
      beforeMount() {
          this.isLoading = true;//加载成功之前显示加载动画
          this.getData()//在页面加载之前获取数据
      }
    }
</script>

<style scoped>
  .PostList{
    background-color: #e1e1e1;
  }
  .posts {
    margin-top: 10px;
  }

  .PostList img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;
  }

  ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
  }

  li:not(:first-child):hover {
    background: #f5f5f5;;
  }

  li:last-child:hover {
    background: white;
  }

  li span {
    line-height: 30px;
  }

  .allcount {
    width: 70px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }

  .put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }

  .toobar {
    height: 40px;
    background-color: #f5f5f5;
  }

  .toobar span {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }

  .toobar span:hover {
    color: #9e78c0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }
</style>
