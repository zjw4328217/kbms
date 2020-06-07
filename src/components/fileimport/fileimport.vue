<template>
  <div class="container _importfile">
            <div v-show="!dialogEdittVisible">

            
             <el-form label-position="right" label-width="68px" :inline="true" :model="formSearch" ref='formSearch' class="demo-form-inline">
                <el-form-item label="文件名称" prop='name'>
                    <el-input  v-model="formSearch.name" placeholder="文件名称"></el-input>
                </el-form-item>
                 <el-form-item label="文件类型" prop="type">
                    <el-select v-model="formSearch.type" placeholder="文件类型">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="知识库文件" value="知识库文件"></el-option>
                        <el-option label="办公软件包" value="办公软件包"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label-width="0">
                    <el-button  type="primary" @click="onSearch">查询</el-button>
                    <el-button  type="warning" @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
            <el-form>
                <el-form-item>
                    <el-button size="small" round type="primary" @click="onOpenAdd">导入文件</el-button>
                <el-button size="small" round type="danger" @click="onDeleteMany">批量删除</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格---start -->
            <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="60">
                </el-table-column>
                <el-table-column prop="name" label="文件名称" width="160" align="center">
                    <template slot-scope="scope">
                        <a :href="scope.row.url" target="_blank" style="color: #00D1B2" @click="onDetail(scope.$index, scope.row)">{{ scope.row.name}}</a>
                    </template>
                </el-table-column>
                 <el-table-column prop="type" label="文件类型" align="center" min-width="160">
                </el-table-column>
                 <el-table-column prop="des" label="文件描述" align="center" min-width="160">
                </el-table-column>
                 <el-table-column prop="createTime" label="导入日期" align="center" :formatter="this.$common.timestampToTime" min-width="160">
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="160">
                    <template slot-scope="scope">
                        <a :href="scope.row.url" :download="scope.row.name">
                          <el-button size="mini">下载</el-button>
                        </a>
                        
                        <el-button size="mini" plain type="danger" @click="onDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
            <!-- 表格---end -->
            </div>
            <!-- 新增弹框---start -->
          <div v-show="dialogEdittVisible">
              <el-form label-position="right" label-width="80px" :rules="rulesEdit" :disabled="formEditDisabled" :inline="false" ref="formEdit" :model="formEdit" class="demo-form-inline">
                  <el-form-item  label="上传文件">
                        <el-button  size="small" type="primary" >点击上传
                          <input type="file" style="opacity:0;width:80px;height:100%;position:absolute;top:0;left:0;cursor:pointer;" @change="getFile($event)">
                      </el-button>
                      <span :class="{ 'el-icon-success': this.file, 'el-icon-warning': !this.file}">{{this.file?'已上传':'未上传'}}</span>
                      
                  </el-form-item>
                  <el-form-item label="文件名称" prop="name">
                      <el-input v-model="formEdit.name" placeholder="文件名称" ></el-input>
                  </el-form-item>
                   <el-form-item label="文件类型" prop="type">
                    <el-select v-model="formEdit.type" placeholder="文件类型">
                        <el-option label="知识库文件" value="知识库文件"></el-option>
                        <el-option label="办公软件包" value="办公软件包"></el-option>
                    </el-select>
                </el-form-item>
                  <el-form-item label="文件描述" prop="des">
                      <el-input  v-model="formEdit.des" placeholder="文件描述"></el-input>
                  </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                  <el-button @click="onCancel">取 消</el-button>
                  <el-button v-if="!formEditDisabled" type="primary" @click="onSave($event)">确 定</el-button>
              </div>
            </div>
        <!-- 新增弹框---end -->
        </div>
</template>
<style lang="scss">
._importfile {
  .el-input {
        width: 220px;
  }
  .el-icon-success{
    color:#00D1B2;
  }
  .el-icon-warning{
    color:red;
  }
 

}
</style>

<script>
import apis from '../../apis/apis';
export default {
    name: 'fileimport',
    data() {
        return {
            formSearch:{
                name:'',
                type:'',
            },
            formEdit:{
                id:'',
                name:'',
                type:'',
                des:'',
                url:'',
            },
            file:null,//上传的文件对象
            rulesEdit:{
                name: [
                    { required: true, message: "请输入文件名称", trigger: "blur" },
                    { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
                    ],
                type: [
                    { required: true, message: "请输入文件类型", trigger: "change" }
                    ]
            }
            ,
            tableData:[
                {
                    name:'个人年度报告',//文件名称
                    type:'办公类文件',//文件类型
                    des:'这是一个年度报告',//文件描述
                    url:'#',//文件url
                    createTime:'2019-11-17 20:01:13',//导入日期
                }
            ],
            listLoading:false,
            multipleSelection:[],
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 80
            },
            formEditTitle:'新增',
            dialogEdittVisible:false,
            formEditDisabled:false,
        }
    },
    mounted(){
      this.onSearch();
    },
    methods:{
        onSearch(){
          this.listLoading=true;
          let param = Object.assign({}, this.formSearch,this.pageInfo);
            apis.fileImportApi.getList(param)
            .then((data)=>{
                this.listLoading=false;
                if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            this.pageInfo.pageTotal=json.count;
                            this.tableData=json.data;
                        }
                        else if (json.message) {
                            this.$message({message: json.message,type: "error"});
                        }
                }
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
        onReset(){
            this.$refs['formSearch'].resetFields();
        },
        onOpenAdd(){
          this.dialogEdittVisible=true;
        },
        getFile: function (event) {
        
          this.file = event.target.files[0];
          event.target.value="";
          if(this.file){
            this.formEdit.name=this.file.name;
          }
          else{
            this.formEdit.name='';
          }
          
          console.log(this.file);
        },
        onDeleteMany(){
             var ids= this.multipleSelection.map(item => item.id);
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
            debugger;
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.kbmsApi.deleteBatch({ids:ids})
                        .then((data)=>{
                            this.$common.isSuccess(data,()=>{
                               
                                this.onSearch();
                            });
                        })
                        .catch((err)=>{
                           
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });
                    
                }).catch(() => {
                    this.$message({type: 'info',message: '已取消删除'});
                });

        },
        onDetail(){

        },
        onDelete(index, rowData){
           var id=rowData.id;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.fileImportApi.delete({id:id})
                    .then((data)=>{
                        this.$common.isSuccess(data,()=>{
                            debugger;
                            this.onSearch();
                        });
                    })
                    .catch((err)=>{
                        debugger;
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                
            }).catch(() => {
                this.$message({type: 'info',message: '已取消删除'});
            });
        },
        onSave(event){
           //阻止元素发生默认的行为
          event.preventDefault();
        this.$refs["formEdit"].validate(valid => {
          
          if(valid&&this.file){
            apis.fileImportApi.updateFile({file:this.file})
            .then((response)=>{
                var data=response.data;
                if (data.uploaded&&data.uploaded == "true") {

                    this.formEdit.url=data.url;
                    let param = Object.assign({}, this.formEdit);
                        apis.fileImportApi.add(param)
                        .then((data)=>{
                            if(data&&data.data){
                                var json=data.data;
                                if(json&&json.status=='SUCCESS'){
                                    this.$message({message: '上传成功',type: "success"});
                                    this.onSearch();
                                    this.onCancel();
                                    return;
                                }
                            }
                          this.$message({message: '执行失败，请重试',type: "error"});
                        })
                        .catch((err)=>{
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });
                    }
                    else{
                        this.$message({message: data.message,type: "error"});
                    }

                }).catch((err)=>{
                    this.$message({message: err.message,type: "error"});
                    
                });
            }
            
          });

        },
        onCancel(){
          this.$refs['formEdit'].resetFields();
          this.dialogEdittVisible=false;
          this.file=null;
        },
         /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
         /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.onSearch();
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.onSearch();
        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            this.$refs[formName].resetFields();
        },
    }
}
</script>


