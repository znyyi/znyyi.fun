<template>
  <div id="AdminLink">
    <div class="add">
      <el-tag type="success">添加友链</el-tag>
      <el-form :model="linkForm" label-width="80px">
        <el-form-item style="margin-top: 20px" label="名称">
          <el-input v-model="linkForm.name"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px" label="主页地址">
          <el-input v-model="linkForm.home"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px" label="LOGO">
          <el-input v-model="linkForm.logo"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px" label="描述">
          <el-input v-model="linkForm.des"></el-input>
        </el-form-item>

        <el-form-item style="margin-top: 30px">
          <el-button type="primary" @click="handleLinkSubmit()"
            >添加友链</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="remove">
      <el-tag type="success">友链列表</el-tag>
      <el-table :data="linkList" :fit="false" style="width: 100%">
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="home" label="主页"> </el-table-column>
        <el-table-column label="logo">
          <template #default="scope">
            <img :src="scope.row.logo" height="30" width="30" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="des" label="描述"> </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <!-- <el-button @click="handleDeleteLink(scope.row)" type="danger" icon="el-icon-delete" circle></el-button> -->
            <el-popconfirm 
              title="确定删除吗？" 
              popper-class='delete'
              @confirm="handleDeleteLink(scope.row)"
            >
              <template #reference>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLink",
  data() {
    return {
      linkForm: {
        name: "",
        home: "",
        logo: "",
        des: "",
      },
      linkList: [],
    };
  },
  methods: {
    //添加友链
    handleLinkSubmit() {
      let name = this.linkForm.name.trim();
      let home = this.linkForm.home.trim();
      let logo = this.linkForm.logo.trim();
      let des = this.linkForm.des.trim();

      if (!name || !home || !logo || !des) {
        return this.$message({
          message: "数据不完整",
          type: "error",
          duration: 1000,
        });
      }

      //发送数据给后端
      this.$axios({
        method: "post",
        url: "/admin/addLink",
        data: {
          name,
          home,
          logo,
          des,
        },
      }).then(({ data }) => {
        console.log(data);

        //添加友链失败
        if (data.code) {
          return this.$message({
            message: data.msg,
            type: "error",
            duration: 1000,
          });
        }

        this.$message({
          message: data.msg,
          type: "success",
          duration: 1000,
        });
        //清空linkForm
        this.linkForm = {};
        //重新获取友链
        this.getLinks();
      });
    },
    //获取友链
    getLinks() {
      this.$axios({
        method: "get",
        url: "/linkServer",
      }).then(({ data }) => {
        //获取友链失败
        if (data.code) {
          return this.$message({
            message: data.msg,
            type: "error",
            duration: 1000,
          });
        }

        this.linkList = data.data;
      });
    },
    //删除友链
    handleDeleteLink(item) {
      this.$axios({
        method: "DELETE",
        url: "/admin/linkDelete",
        data: {
          _id: item._id,
        },
      }).then(({ data }) => {
        if (!data.code) {
          this.$message({
            message: data.msg,
            type: "success",
            duration: 1000,
          });

          this.getLinks();
        }
      });
    },
  },
  created() {
    this.getLinks();
  },
};
</script>

<style lang="less" scoped>
#AdminLink {
  width: 100%;
}
.add {
  .el-tag {
    margin-bottom: 10px;
  }
  margin-bottom: 30px;
}
.remove {
  /deep/ table {
    width: 100% !important;
  }
}
</style>