<template>
  <div id="Link">
    <article>
      <h2>友情链接</h2>
      <p>
        请在
        <router-link to="/message">留言区</router-link>申请友链，本站友链信息
      </p>
      <p>名称：znyyi&gt;.&lt;</p>
      <p>主页：<span class="code">http://znyyi.fun/</span></p>
      <p>图标：<span class="code">http://znyyi.fun/favicon.ico</span></p>
      <p>描述：爱好前端的码农一枚</p>
    </article>
    <article class="linkList">
      <ul>
        <li v-for="(item, index) in linkList" :key="index">
          <!-- svg 矢量图 -->
          <!-- viewBox 设置一个虚拟盒子 分别设置左上角顶点坐标 和 右下角顶点坐标 -->
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 300"
            preserveAspectRatio="none"
          >
            <!-- path 自定义画图  d属性表示起点，V/v（绝对位置移动/相对位置移动）垂直，H/h（绝对位置移动/相对位置移动）水平-->
            <path 
              d="M 600 300 V 0 H 0 V 300 H 600"
              fill="none"
              stroke-dashoffset = "1800"
              stroke-dasharray = '1800'

            ></path>
          </svg>
          <a :href="item.home" target="_blank">
            <div class="top">
              <p
                class="logo"
                :style="{
                  backgroundImage: `url(${item.logo})`,
                }"
              ></p>
              <p class="name">{{ item.name }}</p>
            </div>
            <p class="des">{{ item.des }}</p>
          </a>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
export default {
  name: "Link",
  data() {
    return {
      linkList: [],
    };
  },
  methods: {
    getLinks() {
      this.$axios({
        method:'get',
        url:'/linkServer'
      }).then(({data}) => {
        //获取友链失败
        if(data.code) {
          return this.$message({
            message:data.msg,
            type:'error',
            duration:1000
          })
        }

        this.linkList = data.data;
      })
    }
  },
  created() {
    this.getLinks()
  }
};
</script>

<style lang="less" scoped>
#Link {
  flex: 1;
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand";
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
    p {
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      &.border {
        border-bottom: 1px dotted rgb(170, 170, 170);
      }
    }
    code {
      text-indent: 0;
      display: inline-block;
      font-family: "Quicksand";
      font-size: 14px;
    }
    span.code {
      @media screen and (max-width: 380px) {
        //当屏幕宽度小于等于380px时
        font-size: 12px;
      }
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
    a {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  article.linkList {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        position: relative;
        box-sizing: border-box;
        flex: 1;
        min-width: 260px;
        margin: 0 7.5px 15px;
        padding: 5px;
        background: rgba(27, 31, 35, 0.06);

        &:hover path{
          stroke-dashoffset:0

        }

        svg {
          position: absolute;
          top: 0;
          left: 0;
          path{
            stroke: #521a92;
            transition: 1s;
          }
        }

        a {
          position: relative;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          &:hover {
            text-decoration: none;
          }
          div.top {
            display: flex;
            p.logo {
              overflow: hidden;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background-size: 80%;
              background-position: center;
              background-repeat: no-repeat;
              background-color: white;
            }
            p.name {
              flex: 1;
              font-size: 14px;
              height: 50px;
              margin-left: 15px;
              line-height: 50px;
              color: #409eff;

              word-break: break-all;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
          p.des {
            font-size: 12px;
            height: 60px;

            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>