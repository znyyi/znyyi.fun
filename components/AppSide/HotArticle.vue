<template>
  <div class="hotArticle">
      <h4>Hot Articles</h4>
      <ul>
          <li v-for="(item,index) in hotlist" :key="index">
              <i>{{index+1}}</i>
              <a :href="`/article/${item._id}`" >{{item.title}}</a>
          </li>
      </ul>

  </div>
</template>

<script>

export default {
  name: "HotArticle",
  data() {
      return {
          hotlist: [] //只允许显示三条数据
      }
  },
  created() {
      this.$axios({
          method:'get',
          url:'/art/hot'
      }).then(({data}) => {
          console.log(data);

          if(!data.code){
            this.hotlist = data.data;
          }
      })

  }


};
</script>

<style lang="less" scoped>
    .hotArticle{
        box-sizing: border-box;
        width: 100%;
        font-family: "Quicksand";
        border-right: 1px solid #e8e9e7;

        // box-shadow: 0 0 4px #ddd;
        background-color: #fff;
        padding: 20px;
        h4 {
            line-height: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e8e9e7;
            color: #383937;
            font-size: 16px;
        }
        ul{
            margin-top: 12px;
            li{
                box-sizing: border-box;
                overflow: hidden;
                display: flex;
                height: 40px;
                line-height: 40px;
                padding: 0 3px;
                &:nth-of-type(1) i{
                    background-color: #71a598;
                }
                &:nth-of-type(2) i{
                    background-color: #6eb3a3;
                }
                &:nth-of-type(3) i{
                    background-color: #93bbb2;
                }
                i{
                    display: block;
                    width: 22px;
                    height: 22px;
                    margin-top: 9px;
                    margin-right: 15px;
                    border-radius: 50%;
                    line-height: 16px;
                    font-size: 16px;
                    font-style: normal;
                    color: #fff;
                    text-align: center;
                    font-weight: 100;
                    font-family: "Pacifico", "sans-serif";
                }
                a{
                    flex: 1;
                    color: #787977;
                    font-size: 14px;
                    text-decoration: none;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    &:hover{
                        color: #409eff;
                        text-decoration: underline;

                    }
                }
                
            }
        }
    }

</style>