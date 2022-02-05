<template>
  <div id="Admin">
    <article>
      <h2>后台管理</h2>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="邮件管理" name="first">
          <AdminEmailManager></AdminEmailManager>
        </el-tab-pane>
        <el-tab-pane label="文章发表" name="second">
          <AdminArticleAdd></AdminArticleAdd>
        </el-tab-pane>
        <el-tab-pane label="文章管理" name="third">
          <AdminArticleManager></AdminArticleManager>
        </el-tab-pane>
        <el-tab-pane label="友链管理" name="fourth">
          <AdminLink></AdminLink>
        </el-tab-pane>
      </el-tabs>
    </article>
  </div>
</template>

<script>
import AdminLink from "@/components/Admin/AdminLink.vue";
import AdminArticleAdd from "@/components/Admin/AdminArticleAdd.vue";
import AdminArticleManager from "@/components/Admin/AdminArticleManager.vue";
import AdminEmailManager from "@/components/Admin/AdminEmailManager.vue";

import { mapState } from "vuex";
export default {
  name: "Admin",
  computed: {
    ...mapState(["userInfo"]),
  },
  components: {
    AdminLink,
    AdminArticleAdd,
    AdminArticleManager,
    AdminEmailManager,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  created() {
    this.$axios({
      method: "post",
      url: "/login/checkAdmin",
    }).then(({ data }) => {
      if (data.code) {
        this.$message({
          message: data.msg,
          type: "error",
          duration: 1000,
        });
        this.$router.push("/");
      }
    });
  },
};
</script>

<style lang="less" scoped>
#Admin {
  flex: 1;
  article {
    @media screen and (max-width: 380px) {  //当屏幕宽度小于等于380px时
      padding: 10px 8px;
    }
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand";
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
    .el-tabs {
      @media screen and (max-width: 490px) and (min-width: 400px){
        //当屏幕宽度小于等于490px大于400px时
        width: 340px;
      }
      @media screen and (max-width: 410px){
        //当屏幕宽度小于等于410px时
        width: 295px;
      }
    }
  }
}
</style>