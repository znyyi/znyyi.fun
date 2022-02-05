<template>
  <div class="visitor">
      <h4>最近访客</h4>
      <ul>
          <li 
            v-for="(item,index) in visitorList" :key="index"
            :style="{
                //backgroundImage: 'url('+item.photo+')'
                backgroundImage: `url(${baseURL}${item.visitor.photo})`
               // backgroundImage: 'url('+require('@/assets/img/personal/znyyi.png')+')'
            }"
          >
              <p>{{item.visitor.user}}</p>
          </li>
      </ul>


  </div>
</template>

<script>
export default {
  name: "Visitor",
  data() {
      return {
          visitorList: []
      }
  },
  created() {
      this.$axios({
          method:'get',
          url:'/visitor'

      }).then(({data}) => {
        //   console.log(data.data);
        //获取访客记录
        this.visitorList = data.data;          
      })

  }

};
</script>

<style lang="less" scoped>
.visitor{
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    width: 100%;
    margin-top: 10px;
    border-right: 1px solid #e8e9e7;

    // box-shadow: 0 0 4px #ddd;
    padding: 20px;
    h4{
        line-height: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e8e9e7;
        color: #383937;
        font-size: 15px;
    }
    ul{
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        height: 177px;
        li{
            width: 52px;
            height: 52px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin-bottom:6px;
            margin-left: 6px;
            position: relative;
            &:nth-of-type(4n+1){ //n从0开始计数
                margin-left: 0;
            }
            p{
                width: 100%;
                position: absolute;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, .4);
                color: #fff;
                font-size: 12px;
                line-height: 18px;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

        }
    }
}

</style>