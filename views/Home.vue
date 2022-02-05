<template>
  <div id="Home">
    <!-- hello -->
    <div class="hello common">
      <h2>HELLO!</h2>
      <p class="des">
        你好！欢迎来到我的博客！我是一名WEB前端攻城狮，热衷于JavaScript、NodeJs、Vue……这是我的主页！我会在这里发表一些不成熟的技术文章，记录一些沙雕的日常。博客目前使用的是Vue
        + Element + Node + Express + MongoDB搭建的，如果对源码感兴趣的话可以<a
          href=""
          target="_blank"
          >点击这里</a
        >。欢迎提出宝贵的建议哦！
      </p>
      <div class="info">
        <div class="left">
          <h3>personal information</h3>
          <ul>
            <li>
              <p class="dt">NICKNAME</p>
              <p class="dd">Znyyi</p>
            </li>
            <li>
              <p class="dt">ADDRESS</p>
              <p class="dd">重庆市北碚区</p>
            </li>
            <li>
              <p class="dt">EMAIL</p>
              <p class="dd">980416540@qq.com</p>
            </li>
            <!-- <li>
              <p class="dt">GITHUB</p>
              <p class="dd"></p>
            </li> -->
          </ul>
        </div>
        <div class="right">
          <h3>skills</h3>
          <ul>
            <li>
              <p class="lang">
                <span class="s1">HTML5 & CSS3</span>
                <span class="s2">90%</span>
              </p>
              <p class="level">
                <span style="width: 90%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Javascript</span>
                <span class="s2">80%</span>
              </p>
              <p class="level">
                <span style="width: 80%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">NodeJs</span>
                <span class="s2">70%</span>
              </p>
              <p class="level">
                <span style="width: 70%"></span>
              </p>
            </li>
            <li>
              <p class="lang">
                <span class="s1">Vue</span>
                <span class="s2">70%</span>
              </p>
              <p class="level">
                <span style="width: 70%"></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- article -->
    <div class="article common">
      <h2>ARTICLE</h2>
      <p class="des">
        热门文章推荐。<router-link to="/article">更多文章</router-link
        >请访问文章页&gt;.&lt;
      </p>
      <div class="content">
        <div class="left">
          <div class="art">
            <img src="../assets/img/article/1.jpg" alt="" />
            <p class="title">{{ hotlist[0].title }}</p>
            <div class="cover">
              <a :href="`/article/${hotlist[0]._id}`" target="_blank">
                <p></p>
                <p>view more</p>
              </a>
            </div>
          </div>
          <div class="art">
            <img src="../assets/img/article/3.jpg" alt="" />
            <p class="title">{{ hotlist[1].title }}</p>
            <div class="cover">
              <a :href="`/article/${hotlist[1]._id}`" target="_blank">
                <p></p>
                <p>view more</p>
              </a>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="art">
            <img src="../assets/img/article/2.jpg" alt="" />
            <p class="title">{{ hotlist[2].title }}</p>
            <div class="cover">
              <a :href="`/article/${hotlist[2]._id}`" target="_blank">
                <p></p>
                <p>view more</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 实战经历 -->
    <div class="experience common">
      <h2>ACTUAL COMBAT EXPERIENCE</h2>
      <ul>
        <li>
          <div class="left">
            <p>2019-</p>
          </div>
          <div class="right">
            <h3>仿写苏宁易购</h3>
            <p class="img">
              <img src="../assets/img/technology/vue.jpg" alt="" />
            </p>
            <p class="company">重庆德克特公司实训</p>
            <p class="content">
              小组分工合作仿写苏宁易购电商网站，本人负责仿写搜索页面，及项目的整合，相关技术涉及html、css、js。
            </p>
          </div>
        </li>
        <li>
          <div class="left">
            <p>2021-</p>
          </div>
          <div class="right">
            <h3>仿写小米</h3>
            <p class="img">
              <img src="../assets/img/technology/vue.jpg" alt="" />
            </p>
            <p class="company">个人实训</p>
            <p class="content">
              仿写小米首页，分别实现pc端和移动端，相关技术涉及html、css、js。
            </p>
          </div>
        </li>
        <li>
          <div class="left">
            <p>2021-</p>
          </div>
          <div class="right">
            <h3>搭建个人技术博客</h3>
            <p class="img">
              <img src="../assets/img/technology/vue.jpg" alt="" />
            </p>
            <p class="company">个人实训</p>
            <p class="content">
              搭建个人技术博客，实现pc端和移动端响应式布局，技术选型vue + element + node + express + mongodb。
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 联系我 -->
    <div id="contact" class="contact common">
      <h2>CONTACT ME</h2>
      <p class="des">有任何问题联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
      <el-form
        ref="contactForm"
        :model="contactForm"
        :rules="rules"
        label-position="left"
      >
        <el-form-item label="Your Name" prop="name">
          <el-input v-model="contactForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Your Email" prop="email">
          <el-input v-model="contactForm.email"></el-input>
        </el-form-item>

        <el-form-item label="Your Message" prop="message">
          <el-input v-model="contactForm.message"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('contactForm')"
            >Send</el-button
          >
          <el-button @click="resetForm('contactForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      contactForm: {
        name: "",
        email: "",
        message: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "name is required",
            trigger: "blur",
          },
          {
            min: 2,
            max: 8,
            message: "Length should be 2 to 8",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "email is required",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              let reg = /^[^\s]+@[^\s]+$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("邮件格式不正确"));
              }
            },
            trigger: "blur",
          },
        ],
        subject: [
          {
            message: "",
            trigger: "blur",
          },
        ],
        message: [
          {
            required: true,
            message: "message is required",
            trigger: "blur",
          },
        ],
      },
      hotlist: [
        {
          _id: "",
          title: "",
        },
        {
          _id: "",
          title: "",
        },
        {
          _id: "",
          title: "",
        }
      ], //只允许显示三条数据,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //向后端发送数据
          this.$axios({
            method: "post",
            url: "/email",
            data: this.contactForm,
          }).then(({ data }) => {
            if (!data.code) {
              this.$message({
                message: data.msg,
                type: "success",
                duration: 1000,
              });
              //清空表单
              this.resetForm(formName);
            } else {
              return this.$message({
                message: data.msg,
                type: "error",
                duration: 1000,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    // if (this.$route.href == "/#contact") {
    //   setTimeout(() => {
    //     document.documentElement.scrollTop = 2060;
    //   }, 100);
    // }

    //获取前三条文章
    this.$axios({
      method: "get",
      url: "/art/hot",
    }).then(({ data }) => {
      console.log(data);

      if (!data.code) {
        this.hotlist = data.data;
      }
    });
  },
};
</script>

<style lang="less" scoped>
#Home {
  flex: 1;
  // min-width: 300px;

  .common {
    background: #fff;
    padding: 15px 15px 30px;
    margin-bottom: 10px;
    h2 {
      @media screen and (max-width: 380px) {
        //当屏幕宽度小于等于380px时
        font-size: 20px;
      }
      margin-bottom: 15px;
      font-size: 30px;
      letter-spacing: 3px;
      padding-top: 10px;
      font-family: "Quicksand";
    }
    p.des {
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      font-family: "Quicksand";
    }
  }
  .hello {
    .info {
      display: flex;
      font-family: "Quicksand";

      div.left,
      div.right {
        flex: 1;
        display: flex;
        flex-direction: column;
        h3 {
          margin-bottom: 30px;
          font-weight: 400;
          font-size: 22px;
          color: #666;
        }
        ul {
          @media screen and (max-width: 400px) {
            //当屏幕宽度小于等于400px时
            font-size: 12px;
          }
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }

      div.left {
        ul > li {
          display: flex;
          p.dt {
            width: 40%;
            font-weight: bold;
          }
          p.dd {
            flex: 1;
          }
        }
      }
      div.right {
        ul > li {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
          p.lang {
            display: flex;
            justify-content: space-between;
            letter-spacing: 2px;
            span.s1 {
              font-weight: bold;
            }
            span.s2 {
              font-size: 12px;
              font-weight: bold;
              color: #999;
            }
          }
          p.level {
            height: 5px;
            background: #ececec;
            span {
              background: #bfe2e6;
              display: block;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .article {
    .content {
      display: flex;
      div.left {
        margin-right: 1px;
        flex: 1;
        div.art:nth-of-type(2) {
          margin-top: 2px;
        }
      }
      div.right {
        margin-left: 1px;
        flex: 1;
      }

      .art {
        position: relative;
        overflow: hidden;
        &:hover {
          div.cover a {
            opacity: 1;
            p:nth-of-type(1) {
              top: 32%;
            }
            p:nth-of-type(2) {
              bottom: 32%;
            }
          }
          p.title {
            bottom: -30px;
          }
        }

        img {
          width: 100%;
          display: block;
        }
        p.title {
          @media screen and (max-width: 380px) {
            //当屏幕宽度小于等于380px时
            font-size: 12px;
          }
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30px;
          background-color: rgba(0, 0, 0, 0.2);
          font-weight: 700;
          line-height: 30px;
          color: #fff;
          text-align: center;
          transition: bottom 0.3s;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-family: "Quicksand";
        }
        div.cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          a {
            display: block;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.5s;
            text-align: center;

            p {
              position: absolute;
              font-family: "Quicksand";
              font-weight: bold;
              transition: 0.3s;
            }
            p:nth-child(1) {
              top: 20%;
              width: 100%;
              text-align: center;
              color: #fff;
              font-size: 22px;
              text-transform: uppercase; //字母大写
            }
            p:nth-child(2) {
              left: 50%;
              bottom: 20%;
              width: 30%;
              min-width: 80px;
              padding: 0 5px;
              height: 32px;
              border-radius: 16px;
              text-align: center;
              line-height: 32px;
              transform: translateX(-50%);
              color: #000;
              background-color: #bfe2e6;
            }
          }
        }
      }
    }
  }

  .experience {
    font-family: "Quicksand";
    ul {
      margin-top: 40px;

      li {
        display: flex;

        div.left {
          width: 200px;
          @media screen and (max-width: 500px) {
            //当屏幕宽度小于等于400px时
            width: 90px;
          }

          p {
            @media screen and (max-width: 500px) {
              //当屏幕宽度小于等于400px时
              width: 70px;
            }
            position: relative;
            top: -12px;
            width: 160px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-weight: 700;
            background-color: #bfe2e6;

            &::after {
              position: absolute;
              top: 0;
              right: -30px;
              content: "";
              width: 0;
              height: 0;
              border: 15px solid transparent;
              border-left-color: #bfe2e6;
            }
          }
        }

        div.right {
          box-sizing: border-box;
          flex: 1;
          padding-left: 20px;
          padding-right: 20px;
          padding-bottom: 40px;
          border-left: 2px solid #bfe2e6;

          h3 {
            position: relative;
            margin-bottom: 20px;
            margin-top: -10px;
            line-height: 25px;
            font-size: 20px;

            &::before {
              position: absolute;
              content: "";
              top: 10px;
              left: -23px;
              width: 4px;
              height: 4px;
              background-color: #000;
            }
          }

          p.img {
            margin-bottom: 20px;
          }

          p.company {
            color: #000;
            margin-bottom: 20px;
          }

          p.content {
            color: #777;
            letter-spacing: 1px;
            font-size: 16px;
          }
        }

        &:last-child div.right {
          border-color: transparent;
          padding-bottom: 20px;
        }
      }
    }
  }
  .contact {
    .el-form {
      font-family: "Quicksand";
      padding: 0 40px;
      .el-form-item {
        flex-direction: column;
        .el-button {
          display: inline-block;
          width: 95px;
          height: 40px;
          margin-top: 20px;
          border: 0;
          border-radius: 20px;
          box-shadow: 0 0 0 #bbb;
          background-color: #bfe2e6;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 2px;
          font-family: "Quicksand", "sans-serif";
          color: #000;
          cursor: pointer;
          transition: box-shadow 0.3s;
          &:last-child {
            background: rgb(222, 224, 224);
          }

          &:hover {
            box-shadow: 0 3px 5px #bbb;
          }
        }
      }
    }
  }
}
</style>>
