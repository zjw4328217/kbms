<template>
  <div class="container _msg">
    <div v-show="isTableShow">
      <!-- 查询区----start -->
      <el-form
        label-position="right"
        label-width="80px"
        :inline="true"
        ref="formSearch"
        :model="formSearch"
        class="demo-form-inline"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="formSearch.title" placeholder="模糊匹配"></el-input>
        </el-form-item>
        <el-form-item label="发布状态" prop="publicState">
          <el-select v-model="formSearch.publicState" placeholder="发布状态">
            <el-option label="全部" value="0"></el-option>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="未发布" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="存管银行" prop="depositoryBank">
          <el-select v-model="formSearch.depositoryBank" placeholder="存管银行">
            <el-option label="全部" value="0"></el-option>
            <el-option label="百信银行" value="1"></el-option>
            <el-option label="厦门银行" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="formSearch.createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-date-picker
            v-model="formSearch.updateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label=" " style="margin-left:0px;">
                    <el-button type="primary" @click="onSearch">查询</el-button>
                    <el-button type="warning" @click="onReset">重置</el-button>
                </el-form-item>
      </el-form>
      <!-- 查询区----end -->
      <!-- 操作区----start -->
      <el-row class="mgb15">
        <el-button size="small" round type="primary" @click="handleAdd">新增</el-button>
        <el-button size="small" round type="danger" @click="deleteMany">批量删除</el-button>
      </el-row>
      <!-- 操作区----end -->
      <!-- 表格---start -->
      <el-table
        :data="tableData"
        v-loading="listLoading"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="title" label="标题" width="150" align="center" sortable>
          <template slot-scope="scope">
            <a
              href="javacript:;"
              style="color: #00D1B2"
              @click="handleDetail(scope.$index, scope.row)"
            >{{ scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" align="center" width="150">
          <template slot-scope="scope">
            <p class="line-limit-length">{{scope.row.content|convertContent}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="publicState" label="发布状态" align="center" width="80"></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期"
          align="center"
          :formatter="this.$common.timestampToTime"
          width="160"
          sortable
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新日期"
          align="center"
          :formatter="this.$common.timestampToTime"
          width="160"
          sortable
        ></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="260">
          <template slot-scope="scope">
            <span v-if="scope.row.publicState=='未发布'||scope.row.publicState==''">
              <el-button
                size="mini"
                plain
                type="primary"
                @click="updatePublicState(scope.$index, scope.row,'已发布')"
              >{{scope.row.publicState|convertPublic}}</el-button>
            </span>
            <span v-else>
              <el-button
                size="mini"
                plain
                type="warning"
                @click="updatePublicState(scope.$index, scope.row,'未发布')"
              >{{scope.row.publicState|convertPublic}}</el-button>
            </span>

            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,sizes,prev, pager, next,jumper"
        :current-page="pageInfo.currentPage"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.pageTotal"
        :page-sizes="[5, 10, 20, 50]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <!-- 表格---end -->
    </div>
    <div class="_edit" v-show="isEditShow">
      <!-- 编辑弹框---start -->
      <el-form
        :label-position="labelPosition"
        :label-width="labelWidth"
        :rules="rulesEdit"
        :disabled="formEditDisabled"
        :inline="false"
        ref="formEdit"
        :model="formEdit"
        class="demo-form-inline"
      >
        <el-form-item label-width="0" prop="title">
          <el-input class="docTitle" v-model="formEdit.title" maxlength="50" placeholder="输入文档标题"></el-input>
        </el-form-item>
        <el-form-item class="_editor" label-width="0">
          <!-- 留言编辑器---start -->
          <div class="document-editor">
            <!-- 工具栏容器 start -->
            <div v-show="!formEditDisabled" class="document-editor__toolbar"></div>
            <!-- 工具栏容器 end -->
            <!-- 编辑器容器 start -->
            <div class="document-editor__editable-container">
              <div class="document-editor__editable">
                <p>CSDN同款富文本编辑器，支持将截图直接粘贴进来</p>
              </div>
            </div>
            <!-- 编辑器容器 end -->
          </div>
        </el-form-item>
        <el-form-item label="存管银行" prop="depositoryBank">
          <el-select v-model="formEdit.depositoryBank" placeholder="存管银行">
            <el-option label="农业银行" value="农业银行"></el-option>
            <el-option label="交通银行" value="交通银行"></el-option>
            <el-option label="北京银行" value="北京银行"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEdit">取 消</el-button>
        <el-button v-if="!formEditDisabled" type="primary" @click="handleSave">{{editBtnText}}</el-button>
        <el-button v-if="dialogType=='add'||(dialogType=='edit'&&formEdit.publicState=='未发布')" type="primary" @click="handlePublic">发布</el-button>
      </div>
      <!-- 编辑弹框-end -->
    </div>
  </div>
</template>

<style lang="scss">
// 设置输入框的宽度
._msg {
  .el-input {
    width: 220px;
  }
  ._edit{
        .docTitle{
            width:439px;
        }
    ._editor{
            width:100%;
            .el-form-item__content{
                width:100%;
                .document-editor{
                    border:1px solid #c4c4c4;
                    .document-editor__toolbar{
                        border:0;
                        border-bottom:1px solid #c4c4c4;
                        .ck-toolbar{
                            border:0;
                        }
                    }
                    .document-editor__editable{
                        min-height: 400px;
                        border:0;
                    }
                }
                
            }
            
        }
  }
  }
</style>


<script>
import apis from '../../apis/apis';
export default {
  name: "msg",
  data() {
    return {
      listLoading: false, //
      pageInfo: {
        //分页
        currentPage: 1,
        pageSize: 5,
        pageTotal: 80
      },
      formSearch: {
        title: "", //标题
        keyword: "",
        createStartDate: null, //创建开始时间
        createEndDate: null, //创建结束时间
        updateStartDate: null, //更新开始时间
        updateEndDate: null, //更新结束时间
        createTime: null,
        updateTime: null
      },
      formEdit: { //表单新增,编辑,查看
                title: '',
                content:'',//内容
                depositoryBank:'',//存管银行
                publicState:'未发布',//发布状态
                // createTime:null,
                // updateTime:null,
            },
       rulesEdit:  {
                title: [
                    { required: true, message: "请输入文档标题", trigger: "blur" },
                    { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
                ],
                // depositoryBank: [{ required: true, message: "请选择存管银行", trigger: "change" }],
            },
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogType:'',//弹框类型：add,edit,show
      tableData: [          //表单列表
        {
          id: "1",
          title: "",
          depositoryBank: "", //存管银行
          content: "",
          createTime: null,
          updateTime: null,
          publicState: ""
        }
      ],
      labelPosition: 'right', //lable对齐方式
      labelWidth: '80px', //lable宽度
      isTableShow:true,//表格显示
      isEditShow:false,//编辑区显示
      editBtnText:'保存',//编辑按钮文本
      EditorObj: null,//编辑器实例
      
    };
  },
  mounted(){
    this.onSearch();
    this.initCKEditor()
  },
      /**
           * 查询列表
           */
  methods: {
      onSearch(){
        this.listLoading=true;

        if(this.formSearch.createTime ){
            this.formSearch.createStartDate=this.formSearch.createTime[0];
            this.formSearch.createEndDate=this.formSearch.createTime[1];
        }
        let param = Object.assign({}, this.formSearch,this.pageInfo);
        apis.msgApi.getList(param)
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
      /**
         * 点击保存按钮
         */
        handleSave(){
            if(this.dialogType=='add'){
                this.save();
            }
            else if(this.dialogType=='edit'){
                this.update();
            }
            else{
                this.$message({message: '操作异常',type: "error"});
            }
        },
        /**
         * 保存
         */
        save() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                    let param = Object.assign({}, this.formEdit);
                    param.content=this.EditorObj.getData();
                    apis.msgApi.add(param)
                    .then((data)=>{
                        if(data&&data.data){
                            var json=data.data;
                          //  console.log(JSON.stringify(json) );
                             if(json&&json.status=='SUCCESS'){
                                this.$message({message: '执行成功',type: "success"});
                                this.closeEdit();
                                this.onSearch();
                                return;
                            }
                        }
                       this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }                            
            });
        },
        /**
         * 更新
         */
        update() {
            this.$refs["formEdit"].validate(valid => {
                if(valid){
                   debugger;
                    let param = Object.assign({}, this.formEdit);
                    param.content=this.EditorObj.getData();
                    apis.msgApi.update(param)
                    .then((data)=>{
                      debugger;
                        if(data&&data.data){
                            var json=data.data;
                             if(json&&json.status=='SUCCESS'){
                                this.$message({message: '执行成功',type: "success"});
                                this.closeEdit();
                                this.onSearch();
                                return;
                            }
                        }
                       this.$message({message: '执行失败，请重试',type: "error"});
                    })
                    .catch((err)=>{
                        this.$message({message: '执行失败，请重试',type: "error"});
                    });
                }
                
                
            });
        },
         /**
         * 删除
         */
        handleDelete(index, rowData) {
            var id=rowData.id;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                    apis.msgApi.delete({id:id})
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
        /**
         * 批量删除
         */
        deleteMany() {
          debugger;
            var ids= this.multipleSelection.map(item => item.id);
            if(ids.length==0){
                 this.$message({message: '请选择要删除的项',type: "warn"});
                return;
            }
    
            this.$confirm('此操作将批量永久删除文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        apis.msgApi.deleteBatch({ids:ids})
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
            handlePublic(){
            debugger;
            this.formEdit.publicState='已发布';
            if(this.dialogType=='add'){
                this.save();
            }
            else if(this.dialogType=='edit'){
                this.update();
            }
            else{
                this.$message({message: '操作异常',type: "error"});
            }
        },
          //更新发布状态
        updatePublicState(index, rowData,publicState){
            debugger;
            var id=rowData.id;
            var msg=publicState=='已发布'?'发布成功':'取消发布成功';
            apis.msgApi.updatePublicState({id:id,publicState:publicState})
                        .then((data)=>{
                          debugger;
                            this.$common.isSuccess(data,()=>{
                                this.$message({type: 'success',message: msg});
                                this.onSearch();
                            });
                        })
                        .catch((err)=>{
                            this.$message({message: '执行失败，请重试',type: "error"});
                        });
        },
        /**
         * 打开新增页
         */
      handleAdd() {
        //debugger;
         this.openEdit();
            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增';
                this.editBtnText='保存';
                this.formEditDisabled=false;
                this.EditorObj.isReadOnly=false;
                this.EditorObj.setData('CSDN同款富文本编辑器，支持将截图直接粘贴进来');
            });
      },
      handleEdit(index, rowData) {
            this.openEdit();
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑';
                this.editBtnText='保存修改';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
                this.EditorObj.setData(this.formEdit.content==null?'':this.formEdit.content);
                this.EditorObj.isReadOnly=false;
            });
            
        },
         
      /** 
         * 打开编辑页
         */
        openEdit(){
            this.isTableShow=false;
            this.isEditShow = true;
            // this.$nextTick(()=>{
            //     this.initCKEditor()
            // });
        },
        //初始化容器
        initCKEditor() {
            DecoupledEditor.create(document.querySelector('.document-editor__editable'), {
                ckfinder: {
                    // Upload the images to the server using the CKFinder QuickUpload command.
                    uploadUrl: '/api/img-api/upload'
                }
            })
            .then(editor => {
                    const toolbarContainer = document.querySelector('.document-editor__toolbar');
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);//添加工具栏
                    this.EditorObj = editor;
                    console.log('初始化富编辑器');
            })
            .catch(err => {
                    console.error(err);
                    console.log('初始化富编辑器失败');
            });
        },
        // * 关闭编辑页
        //  */
      closeEdit() {
         this.$refs['formEdit'].resetFields();
            this.isTableShow=true;
            this.isEditShow = false;
      },
      onPublic() {},  
        onReset(){
            this.$refs['formSearch'].resetFields();
        },
    /**
     * 点击选择
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // this.$message({
      //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
      //     type: "success"
      // });
    },
     /**
         * 打开详情页
         */
        handleDetail(index,rowData){
           // debugger;
            this.openEdit();
            this.$nextTick(()=>{
                this.dialogType='show';
                this.formEditTitle='详情';
                this.formEditDisabled=true;
                this.formEdit= Object.assign({}, rowData) ;
                this.EditorObj.setData(this.formEdit.content==null?'':this.formEdit.content);
                
                this.EditorObj.isReadOnly=true;
            });
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
  },
  filters: {
        convertPublic: function (state) {
            if(state=='未发布'){
                return '执行发布';
            }
            else if(state=='已发布')
            {
                return '取消发布';
            }
            else{
                return '执行发布';
            }
        },
        convertContent:(content)=>{
            if(content){
                return content.replace(/<[^>]*>/ig,"").replace(/\&nbsp;/g,""); 
            }
            else{
                return "";
            }
            
        },
        convertKeyWords:(keywords)=>{
            if(keywords&&keywords.length>0){
                return keywords.join(',');
            }
            else {
                return "";
            }
            
        },
    },
};
</script>

