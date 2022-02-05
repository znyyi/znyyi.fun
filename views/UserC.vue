<template>
  <div id="User">
    <article>
      <h2>修改用户资料</h2>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="修改用户名" name="first">
          <el-form
            ref="userForm"
            :model="userForm"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item style="margin-top: 20px" label="原用户名：">
              {{ userInfo.user }}
            </el-form-item>
            <el-form-item style="margin-top: 20px" label="用户名：" prop="name">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>

            <el-form-item style="margin-top: 30px">
              <el-button type="primary" @click="userNameUpdate('userForm')"
                >确认修改</el-button
              >
              <el-button @click="resetForm('userForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <el-form
            ref="pwdForm"
            :model="pwdForm"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item
              style="margin-top: 20px"
              label="原密码："
              prop="oldPwd"
            >
              <el-input v-model="pwdForm.oldPwd" type="password"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 20px" label="新密码：" prop="pwd">
              <el-input v-model="pwdForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item
              style="margin-top: 20px"
              label="确认新密码："
              prop="repwd"
            >
              <el-input v-model="pwdForm.repwd" type="password"></el-input>
            </el-form-item>

            <el-form-item style="margin-top: 30px">
              <el-button type="primary" @click="userPwdUpdate('pwdForm')"
                >确认修改</el-button
              >
              <el-button @click="resetForm('pwdForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改头像" name="third">
          <el-alert title="点击 + 选择图片自动上传修改" type="warning">
          </el-alert>
          <el-upload
            class="avatar-uploader"
            name="file0"
            :action="baseURL + '/user/avatar'"
            :with-credentials="true"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </article>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "UserC",
  data() {
    return {
      activeName: "first",
      userForm: {
        name: "",
      },
      pwdForm: {
        oldPwd: "",
        pwd: "",
        repwd: "",
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
        oldPwd: [
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
              } else if (value !== this.pwdForm.pwd) {
                callback(new Error("两次的密码不一致！"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      imageUrl: "",
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["updateUserName", "updateUserInfo", "updateUserPhoto"]),

    //修改用户名
    userNameUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/user/name",
            data: {
              user: this.userForm.name,
            },
          }).then(({ data }) => {
            if (data.code) {
              return this.$message({
                message: data.msg,
                type: "error",
                duration: 1000,
              });
            }

            //修改成功，提示给用户
            this.$message({
              message: data.msg,
              type: "success",
              duration: 1000,
            });
            //更新vuex的数据
            this.updateUserName(this.userForm.name);
            this.resetForm("userForm");
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //修改用户密码
    userPwdUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "/user/pwd",
            data: {
              oldPwd: this.pwdForm.oldPwd,
              pwd: this.pwdForm.pwd,
            },
          }).then(({ data }) => {
            if (data.code) {
              return this.$message({
                message: data.msg,
                type: "error",
                duration: 1000,
              });
            }

            //修改密码成功
            this.$message({
              message: data.msg,
              type: "success",
              duration: 1000,
            });
            //清除vuex的数据
            this.updateUserInfo({});
            this.$router.push("/");
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //头像上传成功的回调(显示图片)
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(res);

      if (res.code) {
        return this.$message({
          // 头像上传失败
          message: res.msg,
          type: "error",
          duration: 1000,
        });
      }

      this.$message({
        //提示 头像上传完成
        message: res.msg,
        type: "success",
        duration: 1000,
      });
      this.updateUserPhoto(res.data); //更新vuex中的photo数据
    },
    //头像上传之前的回调
    beforeAvatarUpload(file) {
      const isJPGorPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGorPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPGorPNG && isLt2M;
    },
  },
  created() {
    this.$axios({
      method: "post",
      url: "/login/checkUser",
    }).then(({ data }) => {
      // console.log(data);
      if (data.code) {
        this.$message({
          message: data.msg,
          type: "error",
          duration: 1000,
        });
        this.$router.push("/");
      }
    })
  }
};
</script>

<style lang="less" scoped>
#User {
  flex: 1;
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand";
    @media screen and (max-width: 380px) {  //当屏幕宽度小于等于380px时
      padding: 10px 8px;
    }
    h2 {
      @media screen and (max-width: 380px) {  //当屏幕宽度小于等于380px时
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
    .el-tabs{
      @media screen and (max-width: 340px) {  //当屏幕宽度小于等于340px时
        width: 295px;
      }
    }
  }

  //样式穿透 /deep/ 或 :deep() 在组件的scoped中对于element组件中的样式设置无效，则添加 /deep/ 设置样式穿透
  :deep(.avatar-uploader .el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
  }
  :deep(.avatar-uploader .el-upload:hover) {
    border-color: #409eff;
  }
  :deep(.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    line-height: 178px;
    height: 178px;
    text-align: center;
  }
  :deep(.avatar) {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>