<template>
  <div id="AppNav">
      <div class="main" >
          <!-- logo -->
          <div class="logo">
              <a @click.stop="showAppSide" href="javascript:void(0)">znyyi.fun</a>
          </div>
          <!-- 导航 -->
          <div class="nav">
              <ul>
                  <li><router-link to="/"><span>首</span><span>页</span></router-link></li>
                  <li><router-link to="/article"><span>文</span><span>章</span></router-link></li>
                  <li><router-link to="/message"><span>留</span><span>言</span></router-link></li>
                  <li><router-link to="/link"><span>友</span><span>链</span></router-link></li>
                  <li><router-link to="/about"><span>关</span><span>于</span></router-link></li>
                
              </ul>
          </div>

          

          <!-- 登录成功之后，显示用户头像 -->
          <div v-if="userInfo.user" class="user">  
              <UserPhoto></UserPhoto>
          </div>

          <!-- 登录与注册按钮 -->
          <div v-else class="login">
              <el-button @click="loginBtnClick" type="success" size="mini">登录 / 注册</el-button>
          </div>




          <!-- 登录弹窗 -->
          <LoginBox @closeLoginBox="closeLoginBox" v-if="isShowLoginBox"></LoginBox>
      </div>
  </div>

  

</template>

<script>
import LoginBox from '@/components/LoginBox.vue'
import UserPhoto from '@/components/UserPhoto.vue'
import {mapState,mapMutations} from 'vuex'


export default {
    components: {
        LoginBox,UserPhoto
    },
    data() {
        return{
            isShowLoginBox:false
        }
    },
    methods:{
        ...mapMutations(['updateIsShowAppSide','updateifFixed','updateisCloseAppSide','updateisHidden']),
        loginBtnClick(){
            this.isShowLoginBox = !this.isShowLoginBox
        },
        closeLoginBox(){
            this.isShowLoginBox = !this.isShowLoginBox
        },

        showAppSide() {
            let screenWidth = document.documentElement.clientWidth || document.body.clientWidth
            if (screenWidth <= 800) {

                this.updateifFixed(false)

                if(this.isShowAppSide) {
                    let scorllTop = document.body.scrollTop || document.documentElement.scrollTop;
                    
                    this.updateIsShowAppSide(false)
                    this.updateisCloseAppSide(true)
                    this.updateisHidden(false)

                    document.documentElement.style.overflow = ''
                    setTimeout(()=>{
                        this.updateisCloseAppSide(false)
                        if(scorllTop >= 220) {
                            this.updateifFixed(true);
                        }
                    },300)
                   
                }else{
                    this.updateIsShowAppSide(true)
                    this.updateisCloseAppSide(false)
                    this.updateisHidden(true)
                    document.documentElement.style.overflow = 'hidden'
                }
            }
        }
    },
    computed: {
        ...mapState(['userInfo','isShowAppSide'])
    }

}
</script>

<style lang="less" scoped>
#AppNav{
    width: 100%;
    height: 50px;
    box-shadow: 0 0 5px #777;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 99;

    .main{
        display: flex;
        justify-content: space-between;
        max-width: 1300px;
        height: 100%;
        margin: 0 auto;
        padding: 0 10px;
        box-sizing: border-box;

        .logo{
            height: 100%;
            line-height: 40px;
            a{
                @media screen and (max-width: 800px) {  //当屏幕宽度小于等于800px时
                    font-size: 20px;   
                }
                
                font-family: "Pacifico";
                font-size: 30px;
                color: rgba(0, 0, 0,.7);
            }
        }

        .nav{
            ul{
                display: flex;
                height: 50px;
                li{
                    height: 50px;
                    a{
                        @media screen and (max-width: 700px) {  //当屏幕宽度小于等于700px时
                            padding: 0 10px;
                        }
                        @media screen and (max-width: 500px) {  //当屏幕宽度小于等于500px时
                             padding: 0 12px;
                            flex-direction: column;
                            span:first-of-type{
                                line-height: 35px;
                            }
                            span:last-of-type{
                                line-height: 0px;
                            }
                        }
                        @media screen and (max-width: 400px) {
                            padding: 0 8px;
                        }


                        display: flex;
                        height: 48px;
                        // min-width: 28px;
                        line-height: 48px;
                        padding: 0 25px;
                        font-weight: bolder;
                        transition: color .3s;
                        color: #777;
                        
                        &.router-link-active{
                            border-bottom: 2px solid #00b7ff;
                            color: #00b7ff;
                        }
                        &:hover{
                            color: #00b7ff;
                        }
                    }
                }
            }
        }

        .login{
            .el-button{
                margin-top: 11px;
                @media screen and (max-width: 500px) {  //当屏幕宽度小于等于800px时
                    padding: 0 6px;
                    font-size: 10px;
                }
            }
        }

        .user{
            margin-left: 26px;
        }
    }
}
</style>
