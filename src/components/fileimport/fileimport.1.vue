<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <input type="file" @change="getFile($event)">
      <button class="button button-primary button-pill button-small" @click="submit($event)">提交</button>
      <a :href="fileUrl" :download="fileName" >下载文件{{fileName}}</a>
      {{result}}
    </form>
    
  </div>
</template>

<script>
  import apis from '../../apis/apis';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        file: '',
        fileUrl:'#',
        fileName:'',
        result:'未上传',
      }
    },
    methods: {
      getFile: function (event) {
        this.file = event.target.files[0];
        this.fileName=this.file.name;
        console.log(this.file);
      },
      submit: function (event) {
        //阻止元素发生默认的行为
        event.preventDefault();

        apis.fileImportApi.updateFile({file:this.file})
        .then((response)=>{
            var data=response.data;
            this.fileUrl= data.url;
            this.result='上传成功';
            
        }).catch((error)=>{
            this.result='上传失败';
            console.log(error)
        });
      }
    }
  }
</script>
