<template>
  <div id="AppSide"  :class="{ isCloseAppSide,isShowAppSide }" >
    <div class="innerbox" @click.stop>
      <!-- 个人信息 -->
      <Psersonal></Psersonal>

      <!-- 用于固定定位 -->
      <div :class="{ fixed: ifFixed }">
        <!-- 热门文章 -->
        <HotArticle></HotArticle>

        <!-- 最近访客 -->
        <Visitor></Visitor>
      </div>

    </div>
    
  </div>
</template>

<script>
import Psersonal from "@/components/AppSide/Personal.vue";
import HotArticle from "@/components/AppSide/HotArticle.vue";
import Visitor from "@/components/AppSide/Visitor.vue";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {

    };
  },
  components: {
    Psersonal,
    HotArticle,
    Visitor,
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEventFn);
    window.addEventListener('resize',this.resizeEventFn)

    document.documentElement.addEventListener("click", () => {
      if(this.isShowAppSide) {
        let scorllTop = document.body.scrollTop || document.documentElement.scrollTop;
       
        this.updateIsShowAppSide(false);
        this.updateisCloseAppSide(true);
        this.updateisHidden(false)

        document.documentElement.style.overflow = ''
        setTimeout(()=>{
          this.updateisCloseAppSide(false)
          if(scorllTop >= 220) {
              this.updateifFixed(true);
          }
        },300)
      }
      
    });
  },
  methods: {
    ...mapMutations(["updateIsShowAppSide", "updateifFixed",'updateisCloseAppSide','updateisHidden']),
    scrollEventFn() {
        let scorllTop = document.body.scrollTop || document.documentElement.scrollTop;

        if (!this.isShowAppSide && !this.isCloseAppSide && scorllTop >= 220) {
          this.updateifFixed(true);
        } else {
          this.updateifFixed(false);
        }

    },
    resizeEventFn() {
      let screenWidth = document.documentElement.clientWidth || document.body.clientWidth
      let scorllTop = document.body.scrollTop || document.documentElement.scrollTop;

      if(screenWidth > 800) {
        this.updateIsShowAppSide(false)
        this.updateisHidden(false)
        document.documentElement.style.overflow = ''
        if(scorllTop >= 220) {
            this.updateifFixed(true);
        }
      }
    }
  },
  computed: {
    ...mapState(['isCloseAppSide',"isShowAppSide", "ifFixed"]),
  },
};
</script>

<style lang="less" scoped>
#AppSide{
  @media screen and (max-width: 800px) {
    //当屏幕宽度小于等于800px时
    position: absolute;
    left: -270px;
  }
    left: 0;
    transition: left 0.2s;
    width: 270px;
    min-width: 270px;
    margin-right: 8px;
    z-index: 6;

    &::-webkit-scrollbar {
      display: none;
    }
    div.fixed {
        position: fixed;
        top: 61px;
        width: 270px;
        z-index: 2;
    }
}

.isCloseAppSide {
  @media screen and (max-width: 800px){
    position: fixed !important;
    left: -270px !important;
    top: 50px;
    overflow-y: auto;
    @h:calc(calc(100%) - 50px);
    height: @h;
    div{
      margin-bottom: 0px;
      margin-top: 0px;
    }
  }

}

.isShowAppSide {
  @media screen and (max-width: 800px){
    position: fixed !important;
    left: 0 !important;
    top: 50px;
    overflow-y: auto;
    @h:calc(calc(100%) - 50px);
    height: @h;
    div{
      margin-bottom: 0px;
      margin-top: 0px;
    }
  }
}


</style>