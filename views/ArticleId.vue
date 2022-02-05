<template>
  <div id="ArticleId"></div>
</template>

<script>
export default {
  name: "ArticleId",
  mounted() {
    //   console.log(this.$route.params.id);

    this.$axios({
      method: "post",
      url: "/art/address",
      data: {
        _id: this.$route.params.id,
      },
    }).then(({ data }) => {
      //   console.log(data.data);

      if (data.code) {
        return this.$message({  
            message: data.msg,
            type: "error",
            duration: 1000,
        });
      }


      //获取到md地址，在前端显示内容
      $.get(this.baseURL + data.data, (md) => {
        //   console.log(md);

        editormd.markdownToHTML("ArticleId", {
        markdown: md,
        tocm: true,
        })
    })

    })
  }
}
</script>

<style lang="less" scoped>
#ArticleId {
  flex: 1;
}
</style>