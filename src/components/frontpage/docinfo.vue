<template>
  <div class="_docinfo">
    <div class='wrapper'>
      <div class='flexContainer'>
        <header class='head' >
            <el-row type="flex" justify="center">
                <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="14">
                    <nav class='nav'>
                        <div class='left'>
                            <a href="/">Lan MAO</a>
                        </div>
                        <div class='right'>
                            <ul>
                                <router-link to="/" target="_blank"><li>首页</li></router-link>
                                <router-link to="/home" target="_blank"><li>后台</li></router-link>
                            </ul>
                        </div>
                    </nav>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="14">
                   
                </el-col>
            </el-row>
        </header>
        <main class='main'>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="22" :md="20" :lg="14" :xl="14">
                        <section class="content">
                            <div class="title-outer">
                                <div class="title">
                                    <h2>{{docData.title}}</h2>
                                </div>
                                <div class="title-bar">
                                    <div>{{$common.timestampToTimeCN(docData.updateTime)}}</div>
                                    <div>{{docData.depositoryBank}}</div>
                                    <div>{{docData.businessType}}</div>
                                    <div>{{docData.businessScene}}</div>
                                </div>
                            </div>
                            <!-- 留言编辑器---start -->
                            <div  class="editor-outer" >
                                <div class="document-editor__editable">
                                    {{this.contentText}}
                                </div>
                            </div>
                        <!-- 留言编辑器---end -->
                        </section>
                       
                    
                </el-col>
            </el-row>
        </main>
        
         
        <v-footer></v-footer>
        
      </div>
    </div>
  </div>
</template>
<style lang="scss">
._docinfo{
    .wrapper {
    // position: absolute;
    // top: 0;
    // bottom: 0;
    height:100vh;
    width: 100%;
    overflow:auto;
    .flexContainer {
      display: flex;
      flex-direction: column;
      min-height:100vh;
      .head {
        background-color: #27ae60;
        flex: 0 0 50px;
        .nav{
            display: flex;
            justify-content:space-between;//两端对齐
            height:50px;
            .left{
                display: flex;
                width:100px;
                align-items: center;
                justify-content: center;
                color:white;
                font-family:Microsoft YaHei;
                font-size: 18px;
                width:100px;
                a{
                    color:white;
                    cursor: pointer;
                }
                a:hover{
                    text-shadow: 0 0 1px white;
                }
            }
            .right{
                display: flex;
                align-items: center;
                justify-content: flex-end;
                width:200px;
                font-size:16px;
                ul {
                    display: flex;
                    li{
                        text-align: center;
                        color:white;
                        cursor: pointer;
                        // border:1px solid green;
                        list-style: none;
                        width:50px;
                    }
                    li:hover{
                        text-shadow: 0 0 1px white;
                    }
                }
                
            }
        }

      }
      .main {
        flex: auto;
        .content{
            .title-outer{
                .title{
                    min-height:28px;
                }
                margin-top:15px;
                border-bottom: 1px solid #e0e0e0;
                padding-bottom: 15px;
                .title-bar{
                    margin-top:10px;
                    color:#858585;
                    display: flex;
                    flex-flow:row wrap;
                    min-height:21px;
                    div{
                        margin-right:14px;
                    }
                }
            }
            .editor-outer{
                margin-top:0px;
            }
        }
      }
    }
  }
}
</style>
<script>
import vFooter from '@/components/common/Footer.vue';
import apis from '../../apis/apis';
export default {
    components: {
         vFooter
    },
    name:'',
    data(){
        return{
            listLoading:false,
            EditorObj:null,
            docid:this.$route.query.docid,
            docData: { //表单新增,编辑,查看
                id:null,
                title: '这是很长很长很长很长很长很长的一个标题',
                updateTime:'2019-1-15 17:23:24',
                content:'',//内容
                depositoryBank:'文档类型',//存管银行
                businessType:'文档类型',//业务类型
                businessScene:'文档类型',//业务场景
            },
            contentText:'',
        }
    },
    mounted() {
        this.initCKEditor();
        
        this.$nextTick(()=>{
            this.onSearch();
        });
        
    },
    methods:{
        onSearch(){
            this.listLoading=true;
            let param = {id:this.docid};
            apis.kbmsApi.getOne(param)
            .then((response)=>{
                this.listLoading=false;
                this.$common.isSuccess_Search(response,(json)=>{
                    this.docData=json.data;
                    var content=json.data.content==null?'':json.data.content;
                    if(this.EditorObj==null){
                        // this.$message({message: '富文本编辑器初始化异常,请刷新页面',type: "error"});
                        this.contentText=content.replace(/<[^>]*>/ig,"").replace(/\&nbsp;/g,""); 

                    }
                    else{
                        this.contentText='';
                        this.EditorObj.setData(content);
                    }
                    
                });
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
         //初始化容器
        initCKEditor() {
            try{
                DecoupledEditor.create(document.querySelector('.document-editor__editable'), {
                    ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command.
                        uploadUrl: '/api/img-api/upload'
                    }
                })
                .then(editor => {
                        this.EditorObj = editor;
                        this.EditorObj.isReadOnly=true;
                        console.log('初始化富编辑器');
                })
                .catch(err => {
                        console.error(err);
                        console.log('初始化富编辑器失败');
                });
            }
            catch(e){
                this.$message({message: '富文本编辑器初始化异常,请刷新页面',type: "error"});
            }
        },
    }
}
</script>


