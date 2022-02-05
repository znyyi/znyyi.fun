<template>
  <div id="About">
    <article>
      <h2>About Me</h2>
      <p>90后 爱好前端的萌新一枚🤭</p>
      <p>坚持敲代码，可以防止脱发哦...</p>

    </article>
    <article>
      <h2>ABOUT SITE</h2>
      <p><code>前  端：</code><span class="code">Vue + Element</span></p>
      <p><code>后  端：</code><span class="code">Node + Express + Mongodb</span></p>
      <p class="border"><code>服务器：</code><a target="_blank" href="https://www.aliyun.com/1111/new?userCode=xqfx5ty6">阿里云ECS</a></p>
      <p>欢迎大家浏览本站，有任何建议可在留言板留言，看到会第一时间回复哦！</p>
    </article>
    <article>
      <h2>ABOUT COPYRIGHT</h2>
      <p>源码开源：<a href="javascript:void(0)" >ZNYYI的github</a></p>
      <p>在注明出处的前提下，本站文章允许非商业用途的转载。</p>
    </article>
    <article>
      <h2>OTHER</h2>
      <p>我是一名前端开发者，如果有合作相关事宜的话，可以通过 <a href="/#contact" >contact me</a> 联系我。或者可以在👈左侧边栏找到我的联系方式哦。</p>
    </article>

  </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
   
  }

}
</script>

<style lang='less' scoped>
#About{
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
    p {
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      &.border{
        border-bottom: 1px dotted rgb(170, 170, 170);
      }
    }
    code{
      text-indent: 0;
      display: inline-block;
      font-family: "Quicksand";
      font-size: 14px;
    }
    span.code{
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
    a{
      color: #409eff;
      &:hover{
        text-decoration: underline;
      }
    }
    
  }

}
</style>