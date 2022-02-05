<template>
  <div id="AdminArticleManager">
    <el-table :data="tableData" :fit="false" style="width: 100%">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="des" label="描述" :height="50"> </el-table-column>
      <el-table-column prop="md" label="md地址"> </el-table-column>
      <el-table-column prop="pv" label="浏览量"> </el-table-column>
      <el-table-column label="操作" :width="100">
        <template #default="scope">
          <!-- <el-button @click="handleDeleteLink(scope.row)" type="danger" icon="el-icon-delete" circle></el-button> -->
          <el-popconfirm
            title="确定删除吗？"
            popper-class="delete"
            @confirm="handleDeleteArticle(scope.row)"
          >
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AdminArticleManager",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getArticle() {
      this.$axios({
        method: "get",
        url: "/art/all",
      }).then(({ data }) => {
        // console.log(data);
        if (!data.code) {
          this.tableData = data.data;
        }
      });
    },
    //删除文章
    handleDeleteArticle(item) {
      this.$axios({
        method: "DELETE",
        url: "/admin/articleDelete",
        data: {
          _id: item._id,
          md: item.md
        },
      }).then(({ data }) => {
        if (data.code) {
          return this.$message({
            message: data.msg,
            type: "error",
            duration: 1000,
          });
          
        } else {
          this.$message({
            message: data.msg,
            type: "success",
            duration: 1000,
          });

          this.getArticle();
        }
      });
    },
  },
  created() {
    this.getArticle();
  },
};
</script>

<style lang="less" scoped>
#AdminArticleManager {
  width: 100%;
}
/deep/ table {
  width: 100% !important;
}
</style>