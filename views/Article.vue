<template>
  <div id="Article">
    <article v-for="(item,index) in articleList" :key="index">
      <h2>{{item.title}}</h2>
      <div class="time">
        <p class="date">{{new Date(item.date).getDate()}}</p>
        <p class="m-y">
          <span>{{new Date(item.date).getMonth()+1}}月</span>
          <span>{{new Date(item.date).getFullYear()}}</span>
        </p>
      </div>
      <div class="show">
        <!-- <div 
          class="img"
          :style="{
            backgroundImage:`url(${coverImg[index%coverImg.length]})`
          }"
        ></div> -->
        <div class="des">{{item.des}}</div>
      </div>
      <div class="r-b">
        <p>浏览量：{{item.pv}}</p>
        <a :href="`/article/${item._id}`" >阅读全文</a>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      articleList: [],
      coverImg:[
        require('../assets/img/article/1.jpg'),
        require('../assets/img/article/2.jpg'),
        require('../assets/img/article/3.jpg')

      ]
    }
  },
  methods: {
    //获取文章列表
    getAll() {
      this.$axios({
        method:'get',
        url:'/art/all'

      }).then(({data}) => {
        // console.log(data);
        if(!data.code) {

          this.articleList = data.data;
        }
      })
    }

  },
  created() {
    this.getAll()
  }
};
</script>

<style lang="less" scoped>
#Article{
    flex: 1;
    article {
      position: relative;
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
    .time{
      @media screen and (max-width: 380px) {
        //当屏幕宽度小于等于380px时
        right: 4px;
        width: 65px;
      }
      position: absolute;
      top: 2px;
      right: 10px;
      width: 80px;
      .date{
        @media screen and (max-width: 380px) {
          //当屏幕宽度小于等于380px时
          font-size: 30px;
        }
        font-weight: bolder;
        font-size: 40px;
        text-align: center;
        color: #6bc30d;
      }
      .m-y{
        span:nth-of-type(1){
          float: left;
        }
        span:nth-of-type(2){
          float: right;
        }
      }
    }
    .show{
      display: flex;
      width: 100%;
      min-height: 50px;
      padding-top: 10px;
      .img{
        box-sizing: border-box;
        // width: 50%;
        padding-right: 2%;
        background-size: cover;
        background-position: center;
      }
      .des{
        box-sizing: border-box;
        width: 50%;
        color: rgb(65, 65, 65);
        padding-left: 2%;
      }
      
    }
    .r-b{
        position: absolute;
        right: 10px;
        bottom: 20px;
        p{
          position: relative;
          top: -10px;
          color: #aaa;
          font-size: 12px;
        }
        a{
          padding: 10px 20px;
          background-color: #409eff;
          color: #fff;
          transition: opacity .3s;
          &:hover{
            opacity: .8;
          }
        }
      }
  }
}
</style>