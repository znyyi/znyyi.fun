<template>
  <div id="LoginBox" @click="closeLoginBox">
    <div class="main" @click.stop>  <!-- 阻止 div#main 冒泡 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户登录" name="login">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="rules"
            label-width="60px"
          >
            <el-form-item style="margin-top: 20px" label="用户名" prop="name">
              <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 30px" label="密码" prop="pwd">
              <el-input v-model="loginForm.pwd" type="password"></el-input>
            </el-form-item>

            <el-form-item style="margin-top: 30px">
              <el-button type="primary" @click="loginSubmit('loginForm')"
                >立即登录</el-button
              >
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册账号" name="register">
          <!-- ref 与验证表单的validate函数 搭配使用 -->
          <el-form
            ref="regForm"  
            :model="regForm"
            :rules="rules"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="name">
              <el-input v-model="regForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="regForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repwd">
              <el-input v-model="regForm.repwd" type="password"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="regSubmit('regForm')"
                >立即注册</el-button
              >
              <el-button @click="resetForm('regForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'


export default {
  name: "LoginBox",
  emits:["closeLoginBox"],
  data() {
    return {
      activeName: "login",
      regForm: {
        name: "",
        pwd: "",
        repwd: "",
      },
      loginForm: {
        name: "",
        pwd: "",
      },
      rules: {
        name: [
          {
            //验证器
            validator: (rule, value, callback) => {
              let reg = /^[^\s]{2,8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("请输入2-8位非空格昵称"));
              }
            },
            trigger: "blur",
          },
        ],
        pwd: [
          {
            validator: (rule, value, callback) => {
              let reg = /^[\w,.?;'"<>/|\\:!@##$%^&*()-=+]{6,16}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("请输入6-16位非空格字符"));
              }
            },
            trigger: "blur",
          },
        ],
        repwd: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请确认密码"));
              } else if (value !== this.regForm.pwd) {
                callback(new Error("两次的密码不一致！"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //vuex
    ...mapMutations(['updateUserInfo']),

    regSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 向后端发送数据
          this.$axios({
            method: "post",
            url: "/reg",
            data: {
              user: this.regForm.name,
              pwd: this.regForm.pwd
            },
          }).then(({ data }) => {
            console.log(data);

            if(data.code == 0){

              // alert('submit!')
              this.$message({
                message: data.msg,
                type: 'success',
                duration:1000
              })  

                //注册成功，切换到登录选项卡页面，清空注册表单内容
                this.activeName = 'login'
                //清空注册表单内容
                this.resetForm('regForm')
            }
            else if (data.code == 2){
              // alert('User name already exists!')
              this.$message({
                message:data.msg,
                type:'error',
                duration:1000
                })
            }

          });
        }
        //注册失败： 
        else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // 向后端发送数据

          this.$axios({
            method: "post",
            url: "/login",
            data: {
              user: this.loginForm.name,
              pwd: this.loginForm.pwd
            },
          }).then(({ data }) => {
            console.log(data);
            if(data.code == 0){
      

              // 登录成功
              this.$message({
                message: data.msg,
                type: 'success',
                duration:1000
              })  
              //调用methods中关闭弹窗的方法
              this.closeLoginBox()

              //修改vuex的数据
              this.updateUserInfo(data.data)

              //1s后当前页面刷新
              setTimeout(()=>{window.location.reload() },1000)
               

            }else if (data.code == 3 || data.code == 5){

              this.$message({
                message:data.msg,
                type:'error',
                duration:1000
                })
            }
          })
        } 
        else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //关闭弹窗
    closeLoginBox() {
      // 改变父组件中bool数据值,关闭loginbox
      this.$emit("closeLoginBox")  //子传父 子向父传一个函数执行，可带子的data数据作为参数
    }
  },
};
</script>

<style lang="less" scoped>
#LoginBox {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  .main {
    width: 300px;
    height: 300px;
    padding: 10px 30px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>>
