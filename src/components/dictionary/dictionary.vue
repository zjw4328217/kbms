<template>
  <div class="container _dictionary">
    <el-row :gutter="30">
      <!-- 左侧 start -->
      <el-col :span="12">
        <div class="left">
             <el-form label-position="right" label-width="80px;" :inline="true" :model="formSearch" ref='formSearch' class="demo-form-inline">
                <el-form-item label="字典名称" prop='name'>
                    <el-input  v-model="formSearch.name" placeholder="字典名称"></el-input>
                </el-form-item>
                <el-form-item label="字典编码" prop='code'>
                    <el-input  v-model="formSearch.code" placeholder="字典编码"></el-input>
                </el-form-item>
                
                <el-form-item label=" ">
                    <el-button  type="primary" @click="onSearch">查询</el-button>
                    <el-button  type="warning" @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
            <el-form>
                <el-form-item>
                    <el-button size="small" round type="primary" @click="onOpenAdd">新增</el-button>
                    <el-button size="small" round type="primary" @click="onOpenEdit">修改</el-button>
                    <el-button size="small" round type="danger" @click="onDelete">删除</el-button>

                </el-form-item>
            </el-form>
            <!-- 表格---start -->
            <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="radio" width="60">
                    <template slot-scope="scope">
                        <el-radio v-model="selectId" :label="scope.row.id" @change="onSearch_Detail(scope.row.id)">{{null}}</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="字典名称" min-width="160" align="center" sortable>
                    <template slot-scope="scope">
                        <a href="javacript:;" style="color: #00D1B2;display:block;" @click="onSelect(scope.$index, scope.row)">{{ scope.row.name}}</a>
                    </template>
                </el-table-column>
                 <el-table-column  prop="code" label="字典编码" align="center" min-width="160">
                </el-table-column>
                 <el-table-column prop="des" label="字典描述" align="center" min-width="160">
                </el-table-column>
            </el-table>
            <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
            <!-- 表格---end -->
            <!-- 编辑弹框---start -->
        <el-dialog class="_edit"  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="510px" @close="closeDialog('formEdit')">
            <el-form label-position="right" label-width="80px" :rules="rulesEdit"  :inline="false" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="字典名称" prop="name">
                    <el-input v-model="formEdit.name" placeholder="字典名称" ></el-input>
                </el-form-item>
                <el-form-item label="字典编码" prop="code">
                    <el-input :disabled="dialogType=='edit'" v-model="formEdit.code" placeholder="字典编码"></el-input>
                </el-form-item>
                
                 <el-form-item label="字典描述" prop="des">
                    <el-input  v-model="formEdit.des" placeholder="字典描述"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button  type="primary" @click="onSave">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框---end -->
        </div>
      </el-col>
      <!-- 左侧 end -->
           
      <!-- 右侧 start -->
      <el-col :span="12">
        <div class="right">
            <div style="margin-top:62px;"></div>
             <el-form>
                <el-form-item>
                    <el-button size="small" round type="primary" @click="onOpenAdd_Detail">新增</el-button>
                    <el-button size="small" round type="danger" @click="onDelete_Detail">删除</el-button>
                </el-form-item>
            </el-form>
            <!-- 表格---start -->
            <el-table :data="tableData_Detail" v-loading="listLoading_Detail"  border stripe style="width: 100%" @selection-change="handleSelectionChange_Detail">
                <el-table-column type="radio" width="60">
                    <template slot-scope="scope">
                        <el-radio v-model="selectId_Detail" :label="scope.row.id">{{null}}</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="数据名称" min-width="160" align="center" sortable>
                    <template slot-scope="scope">
                        <a href="javacript:;" style="color: #00D1B2;display:block;" @click="onSelect_Detail(scope.$index, scope.row)">{{ scope.row.name}}</a>
                    </template>
                </el-table-column>
                 <el-table-column  prop="value" label="数据值" align="center" min-width="160">
                </el-table-column>
                 <el-table-column prop="index" label="排序" align="center" width="80">
                </el-table-column>
            </el-table>
            <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo_Detail.currentPage" :page-size="pageInfo_Detail.pageSize" :total="pageInfo_Detail.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange_Detail" @current-change="handleCurrentChange_Detail">
            </el-pagination>
            <!-- 表格---end -->
            <!-- 编辑弹框---start -->
        <el-dialog class="_edit"  :title="formEditTitle_Detail" :visible.sync="dialogEdittVisible_Detail" width="510px" @close="closeDialog('formEdit_Detail')">
            <el-form label-position="right" label-width="80px" :rules="rulesEdit_Detail"  :inline="false" ref="formEdit_Detail" :model="formEdit_Detail" class="demo-form-inline">
                 <el-form-item label="数据名称" prop="name">
                    <el-input v-model="formEdit_Detail.name" placeholder="字典名称" ></el-input>
                </el-form-item>
                <el-form-item label="数据值" prop="value">
                    <el-input :disabled="dialogType_Detail=='edit'" v-model="formEdit_Detail.value" placeholder="数据值"></el-input>
                </el-form-item>
                
                 <el-form-item label="排序" prop="index">
                    <el-input  v-model="formEdit_Detail.index" placeholder="排序"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible_Detail = false">取 消</el-button>
                <el-button  type="primary" @click="onSave_Detail">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框---end -->
        </div>
      </el-col>
      <!-- 右侧 end -->
    </el-row>
  </div>
</template>
<style lang="scss">
._dictionary {
  .el-input {
        width: 220px;
  }
//   border: 1px solid red;
  .left {
    // border: 1px solid green;
    min-height: 36px;
    ._edit{
        .el-input {
            width: 320px;
        }
    }
  }
  .right {
    // border: 1px solid blue;
    min-height: 36px;
    ._edit{
        .el-input {
            width: 320px;
        }
    }
  }
}
</style>
<script>
import apis from '../../apis/apis';
export default {
    name: 'dictionary',
    data() {
        return {
            selectId:'',//表格中选中项的id
            selectId_Detail:'',//详情表格中选中项的id
            formSearch:{
                name:'',
                code:'',
            },
            formEdit:{
                id:'',
                name:'',
                code:'',
                des:'',
            },
            formEdit_Detail:{
                parentId:'',
                name:'',
                value:'',
            },
            rulesEdit:{
                name: [
                    { required: true, message: "请输入字典名称", trigger: "blur" },
                    { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
                    ],
                code: [
                    { required: true, message: "请输入字典编码", trigger: "blur" },
                    { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
                    ]
            },
            rulesEdit_Detail:{
                name: [
                    { required: true, message: "请输入名称", trigger: "blur" },
                    { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
                    ],
                value: [
                    { required: true, message: "请输入值", trigger: "blur" },
                    { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
                    ]
            }
            ,
            tableData:[
                // {
                //     id:'001',
                //     name:'存管银行',//字典名称
                //     code:'CGYH',//字典编码
                //     des:'存管银行下拉框',//字典描述
                // },
                // {
                //     id:'002',
                //     name:'商户类型',//字典名称
                //     code:'SHLX',//字典编码
                //     des:'商户类型下拉框',//字典描述
                // }
            ],
            tableData_Detail:[
            //      {
            //         id:'001',
            //         name:'农业银行',//数据名称
            //         value:'NYYH',//数据值
            //         index:'0',//排序
            //     },
            //    {
            //         id:'001',
            //         name:'交通银行',//数据名称
            //         value:'JTYH',//数据值
            //         index:'1',//排序
            //     },
            ],
            listLoading:false,
            listLoading_Detail:false,
            multipleSelection:[],
            multipleSelection_Detail:[],
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 80
            },
            pageInfo_Detail: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 80
            },
            formEditTitle:'新增',
            formEditTitle_Detail:'新增',
            dialogEdittVisible:false,
            dialogEdittVisible_Detail:false,
            dialogType:'',//弹框类型,add,edit
            dialogType_Detail:'',//弹框类型,add,edit
           
        }
    },
    mounted(){
        this.onSearch();
    },
    methods:{
        onSearch(){
            this.listLoading=true;
            let param = Object.assign({}, this.formSearch,this.pageInfo);
            apis.dictionaryApi.getList(param)
            .then((response)=>{
                this.listLoading=false;
                this.$common.isSuccess_Search(response,()=>{
                    var json=response.data;
                    this.pageInfo.pageTotal=json.count;
                    this.tableData=json.data;
                });
            })
            .catch((err)=>{
                this.listLoading=false;
                this.$message({message: '查询异常，请重试',type: "error"});
            });
        },
        onSearch_Detail(){
           
            this.listLoading_Detail=true;
            let param = Object.assign({}, {parentId:this.selectId},this.pageInfo_Detail);
            apis.dictionaryApi.getList_Detail(param)
            .then((response)=>{
                this.listLoading_Detail=false;
                this.$common.isSuccess_Search(response,()=>{
                    var json=response.data;
                    this.pageInfo_Detail.pageTotal=json.count;
                    this.tableData_Detail=json.data;
                });
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
            this.dialogType='add';
            this.formEditTitle='新增字典';
            this.dialogEdittVisible=true;
        },
         onOpenAdd_Detail(){
             if(!this.selectId){
                this.$message({message: '请选择字典项目',type: "warn"});
                return;
            }
            this.dialogType_Detail='add';
            this.formEditTitle_Detail='新增字典详情';
            this.dialogEdittVisible_Detail=true;
        },
        onOpenEdit(){
            if(!this.selectId){
                this.$message({message: '请选择项目',type: "warn"});
                return;
            }
            
            this.dialogEdittVisible=true;//显示弹框
             this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                var _selectId=this.selectId;
                var rowData= this.tableData.find(item=>{
                    return item.id==_selectId
                });
                this.formEdit= Object.assign({}, rowData);
            });
        },
        onDelete(){
             if(!this.selectId){
                this.$message({message: '请选择项目',type: "warn"});
                return;
            }
             this.$confirm('此操作将永久删除该字典配置, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.dictionaryApi.delete({id:this.selectId})
                    .then((data)=>{
                        this.$common.isSuccess(data,()=>{
                            this.onSearch();
                            this.tableData_Detail=[];
                        });
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                
            }).catch(() => {
                this.$message({type: 'info',message: '已取消删除'});
            });
        },
        onDelete_Detail(){
             if(!this.selectId_Detail){
                this.$message({message: '请选择项目',type: "warn"});
                return;
            }
             this.$confirm('此操作将永久删除该字典详情配置, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.dictionaryApi.delete_Detail({id:this.selectId_Detail})
                    .then((data)=>{
                        this.$common.isSuccess(data,()=>{
                            this.onSearch_Detail();
                        });
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                
            }).catch(() => {
                this.$message({type: 'info',message: '已取消删除'});
            });
            
        },
        //列表点击标题事件
        onSelect(index,rowData){
            this.selectId=rowData.id;
            this.onSearch_Detail();
        },
        onSave(){
            if(this.dialogType=='add'){
                this.save();
            }
            else if(this.dialogType=='edit'){
                this.update();
            }
        },
        onSave_Detail(){
             this.$refs["formEdit_Detail"].validate(valid => {
                if(valid){
                    debugger;
                    this.formEdit_Detail.parentId=this.selectId;
                    let param = Object.assign({}, this.formEdit_Detail);
                    apis.dictionaryApi.add_Detail(param)
                    .then((data)=>{
                        this.$common.isSuccess(data,()=>{
                            this.dialogEdittVisible_Detail = false
                            this.onSearch_Detail();
                        });
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }
            });
        },
        save(){
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.dictionaryApi.add(param)
                    .then((data)=>{
                        this.$common.isSuccess(data,()=>{
                            this.closeEdit();
                            this.onSearch();
                        });
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }
            });
        },
        update(){
              this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    apis.dictionaryApi.update(param)
                    .then((data)=>{
                         this.$common.isSuccess(data,()=>{
                            this.closeEdit();
                                this.onSearch();
                        });
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }
            });
        },
         /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
         /**
         * 点击选择
         */
        handleSelectionChange_Detail(val) {
            this.multipleSelection_Detail = val;
        },
         /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.onSearch();
        },
         /**
         * 分页大小切换
         */
        handleSizeChange_Detail(val) {
            this.pageInfo_Detail.pageSize = val;
            this.onSearch_Detail();
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
            this.onSearch();
        },
        /**
         * 分页切换
         */
        handleCurrentChange_Detail(val) {
            this.pageInfo_Detail.currentPage = val;
            this.onSearch_Detail();
        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            this.$refs[formName].resetFields();
        },
        /**
         * 关闭编辑弹框
         */
        closeEdit(){
            this.dialogEdittVisible=false;
        }
    }
}
</script>


