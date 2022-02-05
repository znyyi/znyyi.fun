<template>
  <div id="AdminEmailManager">
    <el-table :data="tableData" :fit="false" style="width: 100%">
      <el-table-column prop="name" label="Name"> </el-table-column>
      <el-table-column prop="email" label="Email" :height="50">
      </el-table-column>
      <el-table-column prop="message" :width="100" label="Message">
      </el-table-column>
      <el-table-column prop="date" label="Date"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <!-- <el-button @click="handleDeleteLink(scope.row)" type="danger" icon="el-icon-delete" circle></el-button> -->
          <el-popconfirm
            title="确定删除吗？"
            popper-class="delete"
            @confirm="handleDeleteEmail(scope.row)"
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
  name: "AdminEmailManager",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getEmails() {
      this.$axios({
        method: "post",
        url: "/email/get",
      }).then(({ data }) => {
        console.log(data);
        if (!data.code) {
            data.data.forEach(item => {
                item.date = this.formatDate(item.date)
            });

          this.tableData = data.data;
        }
      });
    },
    formatDate(val) {
      let date = new Date(val),
        YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds();

      hh < 10 && (hh = "0" + hh);
      mm < 10 && (mm = "0" + mm);
      ss < 10 && (ss = "0" + ss);

      return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    },
    handleDeleteEmail(item) {
        this.$axios({
            method:'delete',
            url:'/email/emailDelete',
            data:{id:item._id}
        }).then(({data}) => {
            // console.log(data);
            if(!data.code) {
                this.getEmails()
            }
        })
    }
  },
  created() {
    this.getEmails();
  },
};
</script>

<style lang="less" scoped>
#AdminEmailManager {
  width: 100%;
}
/deep/ table {
  width: 100% !important;
}
</style>