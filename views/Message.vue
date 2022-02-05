<template>
  <div id="Message">
    <article>
      <h2>留言板</h2>
      <p>请文明发言，禁止广告哦\(^o^)/~</p>
      <el-input 
        type="textarea" 
        :rows="2" 
        placeholder="请输入内容" 
        maxlength="100"
        show-word-limit
        v-model="textarea"
      ></el-input>
      <div class="btn">
        <el-popover
          placement="bottom-start"
          :width="280"
          popper-class='bqBox'
          trigger="click"
        >
          <template #reference>
            <i class="iconfont icon-biaoqing bq"></i>

          </template>
          <!-- 表情文字 -->
          <ul class="emoji">
            <li @click="handleEmojiClick(item)" v-for="item in emoji" :key="item">{{item}}</li>
          </ul>
 
        </el-popover>
        <el-button type="primary" size="mini" @click="handleMessageClick">发表</el-button>

      </div>
    </article>

    <!-- 留言内容显示 -->
    <article class="content">
      <ul>
        <li v-for="(item,index) in msgList" :class="index" :key="item._id">
          <!--父留言-->
          <div class="parent">
            <!--留言-->
            <div class="left">
              <!--用户头像-->
              <img :src="baseURL+item.user.photo" alt="">
            </div>
            <div class="right">
              <div class="name-time">
                <!--用户名-->
                <span>{{ item.user.user }}</span>
                <!--留言时间-->
                <span>{{ formatDate(item.date) }}</span>
              </div>
              <div class="message">
                <!--留言内容-->
                {{ item.msg }}
              </div>
              <!-- 点赞和回复 -->
              <div class="like-reply" >
                <i
                  class="like iconfont icon-xinaixin"
                  :class="{
                    isLike:userInfo.user && (item.likes.indexOf(userInfo._id) !== -1)
                  }"
                  @click="handleLikesClick(item)"
                ></i>
                <!--点赞数-->
                <span>{{ item.likes.length }}</span>
                <i
                  class="reply iconfont icon-huifu"
                  @click="handleReplyClick(item,item.user,item.msg)"
                ></i>
              </div>
            </div>
          </div>
          <!--子留言-->
          <div class="child" v-for="(childItem,index) in item.children" :key="index">
            <div class="left">
              <img :src="baseURL+childItem.user.photo" alt="">
            </div>
            <div class="right">
              <div class="name-time">
                <span>{{ childItem.user.user }}</span>
                <span>{{ formatDate(childItem.date) }}</span>
              </div>
              <div class="message">
                <span>@{{ childItem.replyUser.user }} <span class="replyUserMsg">{{childItem.replyUserMsg}}</span></span>
                {{ childItem.msg }}
              </div>
              <div class="like-reply">
                <i
                  class="like iconfont icon-xinaixin"
                  :class="{
                    isLike:userInfo.user && (childItem.likes.indexOf(userInfo._id) !== -1)
                  }"
                  @click="handleLikesClick(item,childItem)"
                 
                ></i>
                <span>{{ childItem.likes.length}}</span>
                <i
                  class="reply iconfont icon-huifu"
                  @click="handleReplyClick(item,childItem.user,childItem.msg)"
                ></i>
              </div>
            </div>
          </div>
          <!--回复框-->
          <div
            class="replyInput"
            :class="{
              show: item.ifShowReply
            }"            
          >
            <el-input
              :placeholder="item.replyUser.user && '@'+item.replyUser.user"
              v-model="item.reply"
              size="mini"
            ></el-input>
            <el-button
              class="replyBtn"
              type="primary"
              size="mini"
              @click="handleReplySubmit(item)"
            >回复
            </el-button>
            <div class="clear"></div>
          </div>
        </li>
      </ul>
    </article>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Message',
  data() {
    return {
      textarea: '',
      emoji: ['💯', '🔢', '😀', '😃', '😄', '😁', '😆', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳']
      ,msgList:[],

    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    handleEmojiClick(item) {
      this.textarea += item
    },
    //留言发表
    handleMessageClick() {
      // 验证用户是否登录
      if(!this.userInfo.user){
        return  this.$message({  
          message: '请先登录',
          type: "error",
          duration: 1000,
        });
      }


      let msg = this.textarea.trim()
      //验证没有内容
      if(!msg){
        return  this.$message({  
          message: '请输入留言内容',
          type: "error",
          duration: 1000,
        });
      }

      //往后端发送请求
      this.$axios({
        method:'post',
        url:'/msg/report',
        data: {msg}

      }).then(({data})=>{
        console.log(data);
        
        //留言成功
        if(!data.code){
          this.$message({  
            message: data.msg,
            type: "success",
            duration: 1000,
          });
          this.textarea = ''
          //重新获取留言数据
          this.getMsg()
        }
      })

    },
    //请求留言数据
    getMsg() {
      this.$axios({
        method: 'get',
        url: '/msg/get'

      }).then(({data}) => {
        console.log(data);

        if(data.code) {
          return  this.$message({  
            message: '请求留言数据失败，请稍后再试',
            type: "error",
            duration: 1000,
          });
        }

        //添加一些新属性
        data.data.forEach(item => {
          //控制回复框显示与否
          item.ifShowReply = false;
          //存储每个留言的回复
          item.reply = ''
          //存储回复的父用户是谁
          item.replyUser = {}
          //存储回复的父用户的留言是什么
          item.replyUserMsg = ''
          
        });


        //请求留言数据成功
        this.msgList = data.data;

      })

    },
    //处理时间格式
    formatDate(val) {
      let date = new Date(val),   //val为 时间戳 Number类型
      YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds()

      hh < 10 && (hh = '0' + hh)
      mm < 10 && (mm = '0' + mm)
      ss < 10 && (ss = '0' + ss)

      return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`
    },
    //点击回复按钮
    handleReplyClick(item,replyUser,replyUserMsg) {
      // console.log(item);

      //未登录时，不让打开回复框
      if(!this.userInfo.user) {
        return  this.$message({  
          message: '请先登录',
          type: "error",
          duration: 1000,
        });
      }

      item.ifShowReply = !item.ifShowReply
      item.replyUser = replyUser

      item.replyUserMsg = replyUserMsg


    },
    //回复提交
    handleReplySubmit(item) {
      let reply = item.reply.trim()

      if(!reply) {
        return  this.$message({  
          message: '请输入回复内容',
          type: "error",
          duration: 1000,
        }); 
      }

      this.$axios({
          method:'post',
          url:'/msg/reply',
          data: {
            msg: reply,
            _id: item._id,
            replyUserId: item.replyUser._id,
            replyUserMsg : item.replyUserMsg
          }

        }).then(({data}) => {
          console.log(data);

          if(data.code) {
            return  this.$message({  
              message: data.msg,
              type: "error",
              duration: 1000,
            });
          }


          //回复成功
          this.$message({  
            message: data.msg,
            type: "success",
            duration: 1000,
          });
          // 重新请求留言数据
          this.getMsg()


        })

    },

    //点赞
    handleLikesClick(item,childItem) {
      //未登录时，不让点赞
      if(!this.userInfo.user) {
        return  this.$message({  
          message: '请先登录',
          type: "error",
          duration: 1000,
        });
      }


      this.$axios({
          method:'post',
          url:'/msg/like',
          data: {
            item,
            childItem
          }

        }).then(({data}) => {

          //重新请求留言数据
          this.getMsg()

          //提示点赞成功
          if(data.code == 0){
            return  this.$message({  
              message: data.msg,
              type: "success",
              duration: 1000,
            }); 
          }else if(data.code == 1){
            return  this.$message({  
              message: data.msg,
              type: "error",
              duration: 1000,
            }); 
          }
        })
    }

  },
  created() {
    this.getMsg()
  }




}
</script>

<style lang="less" scoped>
#Message{
  flex: 1;
  article{
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: 'Quicksand';
    h2 {
      @media screen and (max-width: 380px) {
        //当屏幕宽度小于等于380px时
        font-size: 18px;
      }
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
      text-transform: uppercase;
    }
    p{
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
    }
    :deep(.el-textarea){
      margin-top: 20px;
      textarea{
        min-height: 80px !important;
        font-family: 'Quicksand';
        color: #444;
        font-size: 14px;
        letter-spacing: 4px;
        line-height: 30px;
        &:focus{
          border: 1px solid #00b7ff;

        }
      }
    }

    .btn{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      i.bq{
        font-size: 20px;
        cursor: pointer;
      }
      
    }
    
    &.content {
      user-select: none;

      ul {
        li {
          padding-bottom: 5px;
          margin-bottom: 10px;
          border-bottom: 1px dashed #ddd;
          font-size: 12px;
          font-family: "Microsoft YaHei", "sans-serif";

          div.parent, div.child {
            display: flex;
            padding: 4px 0;
          }

          div.child {
            margin-left: 55px;
            margin-top: 3px;
            border-bottom: 1px solid #ddd;
            &:nth-of-type(2){
              // border: none;
            border-top: 1px solid #ddd;

            }
            &:nth-last-of-type(2){
              border-bottom: none;
            }
          }

          div.left {
            overflow: hidden;
            width: 40px;
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;

            img {
              width: 100%;
              height: 100%;
            }
          }

          div.right {
            flex: 1;

            div.name-time {
              font-size: 12px;
              margin-bottom: 3px;

              span:nth-child(1) {
                color: #73b899;
              }

              span:nth-child(2) {
                color: #aaa;
                margin-left: 10px;
                font-family: "Microsoft YaHei", "sans-serif";
              }
            }

            div.message {
              color: #666;
              letter-spacing: 2px;
              margin-bottom: 3px;
              word-break: break-word;
              display: flex;
              flex-direction: column;
              font-size: 14px;

              span {
                color: #409eff;
                margin-right: 5px;
                margin-bottom: 4px;
                font-size: 10px;
                padding: 2px 5px;
                background: rgb(232, 233, 233);
                
                &.replyUserMsg{
                  color: #666;
                }
              }
            }

            div.like-reply {
              i {
                cursor: pointer;
                font-size: 14px;
                color: #aaa;
              }

              i.isLike {
                color: #f30606;
              }

              span {
                display: inline-block;
                width: 43px;
                font-size: 12px;
                color: #aaa;
              }
            }
          }
        }
      }
    }

    .replyInput {
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-left: 55px;
      transition: height .3s;

      &.show {
        height: 60px;
      }

      .replyBtn {
        padding: 4px 9px !important;
        float: right;
      }
    }

  }
  
}

ul.emoji{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow:auto;
  li{
    width: 30px;
    height: 30px;
    font-size: 20px;
    border: 1px solid rgb(206, 205, 205);
    box-sizing: border-box;
    cursor: pointer;
  }
}

</style>