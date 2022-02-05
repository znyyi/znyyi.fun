<template>
  <div id="AdminArticleAdd">
    <el-input v-model="title" placeholder="请输入文章标题" />
    <el-input v-model="des" placeholder="请输入文章描述" />
    <el-tag
        style="margin-top:10px"
    >请上传.md文件</el-tag>
    <el-upload
      class="upload-demo"
      ref="upload"
      name="files"
      :limit="1"
      :action="baseURL+'/admin/upload'"
      :file-list="fileList"
      :with-credentials="true"  
      :on-success="handleMDSuccess"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button size="small" type="primary">选取文件</el-button>
      </template>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button>

    </el-upload>
  </div>
</template>

<script>
export default {
  name: "AdminArticleAdd",
  data() {
    return {
      title: "",
      des:'',
      fileList: []
    }
  },
  methods: {
    submitUpload() {
        if(!this.title.trim() || !this.des.trim()){
            return this.$message({  
                message: '请输入文章标题和描述',
                type: "error",
                duration: 1000,
            });
        }
        this.$refs.upload.submit()
    },
    //上传成功之后的回调
    handleMDSuccess(res) {
        // console.log(res);

        this.$axios({
            method:'post',
            url:'/admin/articleAdd',
            data:{
                title:this.title.trim(),  //文章标题
                des:this.des.trim(),
                md:res.data  //md文件名
            }

        }).then(({data}) => {
            console.log(data);
            //md上传成功，且文章发表成功
            if(!data.code) {
              this.title = ''
              this.des = ''
              this.$message({  
                  message: data.msg,
                  type: "success",
                  duration: 1000,
              });
            }

        })

    }
  }
};
</script>

<style lang="less" scoped>
/deep/.upload-demo{
    margin-top: 10px;
}
</style>