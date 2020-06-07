<template>
    <div class="_frontindex">
        <div class='wrapper' ref="wrapper">
            <div class='flexContainer'>
                <header class='head gpu' :class={headPlus:!showSearch}>
                    <el-row type="flex" justify="center">
                        <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="14">
                            <nav class='nav'>
                                <div class='left'>
                                    <a onclick="window.location.reload()">Lan MAO</a>
                                </div>
                                <div class='right'>
                                    <ul>
                                        <li @click="showSearch=!showSearch">{{showSearch?'高级':'简单'}}</li>
                                        <li>通知</li>
                                        <router-link to="/home" target="_blank">
                                            <li>后台</li>
                                        </router-link>
                                    </ul>
                                </div>
                            </nav>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :xs="22" :sm="22" :md="20" :lg="20" :xl="14">
                                <div class="search">
                                    <h1>知识库查询系统</h1>
                                    <p>丰富、完善、好用的商户对接知识库查询服务
                                        <br>
                                        <span>共收录了
                                            <strong>3323</strong> 条数据</span>
                                    </p>
                                    <transition name="switchSearch">
                                    <div v-if="showSearch" class="search-outer gpu">
                                        <div class="search-text">
                                            <el-input placeholder="请输入要搜索的内容" v-model="searchText" class="input-with-select ">
                                                <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
                                            </el-input>
                                        </div>
                                    </div>
                                    </transition>
                                </div>

                            

                        </el-col>
                    </el-row>
                </header>
                <main class='main'>
                    <el-row type="flex" justify="center">
                        <el-col :xs="24" :sm="22" :md="20" :lg="20" :xl="14">
                            <div v-if="!showSearch" class="searchPlus-outer gpu">
                                <el-form label-position="right" label-width="80px" size="small" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
                                    <el-form-item label="标题" prop="title">
                                        <el-input v-model="formSearch.title" placeholder="模糊匹配"></el-input>
                                    </el-form-item>
                                    <el-form-item label="关键字" prop="keywords">
                                        <el-input v-model="formSearch.keywords" placeholder="模糊匹配"></el-input>
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
                                            <el-option label="农业银行" value="1"></el-option>
                                            <el-option label="交通银行" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="业务类型" prop="businessType">
                                        <el-select v-model="formSearch.businessType" placeholder="业务类型">
                                            <el-option label="全部" value="0"></el-option>
                                            <el-option label="业务类型一" value="1"></el-option>
                                            <el-option label="业务类型二" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="业务场景" prop="businessScene">
                                        <el-select v-model="formSearch.businessScene" placeholder="业务场景">
                                            <el-option label="全部" value="0"></el-option>
                                            <el-option label="业务场景一" value="1"></el-option>
                                            <el-option label="业务场景二" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="创建人" prop="creator">
                                        <el-input v-model="formSearch.creator" placeholder="模糊匹配"></el-input>
                                    </el-form-item>
                                    <el-form-item label="创建时间" prop="createTime">
                                        <el-date-picker v-model="formSearch.createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="更新时间" prop="updateTime">
                                        <el-date-picker v-model="formSearch.updateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="" style="margin-left:0px;">
                                        <el-button type="primary" @click="onSearch">查询</el-button>
                                        <el-button type="warning" @click="onReset">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <el-table :data="tableData" @row-click="openDetail" :row-class-name="getRowClass" v-loading="listLoading" stripe @selection-change="handleSelectionChange">
                                <el-table-column v-if="getContentShow" prop="title" label="标题" width="260" align="center">
                                    <template slot-scope="scope">
                                        <h4 class="line-limit-length">{{scope.row.title}}</h4>
                                    </template>
                                </el-table-column>
                                <el-table-column v-else prop="title" label="标题" min-width="260" align="center">
                                    <template slot-scope="scope">
                                        <h4 class="line-limit-length">{{scope.row.title}}</h4>
                                    </template>
                                </el-table-column>

                                <el-table-column v-if="getContentShow" prop="content" label="内容" align="center" min-width="200">
                                    <template slot-scope="scope">
                                        <p class="line-limit-length">{{scope.row.content|convertContent}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column v-if="getContentShow" prop="updateTime" label="更新日期" align="center" :formatter="this.$common.timestampToTime" width="160">
                                </el-table-column>

                            </el-table>
                            <el-pagination v-show="pageInfo.pageTotal>pageInfo.pageSize" layout="total,prev, pager, next" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
                            </el-pagination>
                        </el-col>
                    </el-row>
                </main>

                <v-footer></v-footer>

            </div>
        </div>

    </div>
</template>
<style lang="scss">
._frontindex {
    .wrapper {
        // position: absolute;
        // top: 0;
        // bottom: 0;
        height:100vh;
        width: 100%;
        overflow: auto;
        .flexContainer {
            display: flex;
            flex-direction: column;
            min-height: 100vh;//页面可视区高度
            .head {
                background-color: #27ae60;
                flex: 0 0 365px;
                padding-top: 20px;
                height:380px;
                transition:all 1s;//动画
                -moz-transition:all 1s; /* Firefox 4 */
                -webkit-transition:all 1s; /* Safari and Chrome */
                -o-transition:all 1s; /* Opera */
                .nav {
                    display: flex;
                    justify-content: space-between; //两端对齐
                    .left {
                        display: flex;
                        width: 100px;
                        height: 50px;
                        align-items: center;
                        justify-content: center;
                        color: white; // background-color: red;
                        font-family: Microsoft YaHei;
                        font-size: 22px;
                        width: 100px;
                        height: 50px;
                        a {
                            color: white;
                            cursor: pointer;
                        }
                        a:hover {
                            text-shadow: 0 0 1px white;
                        }
                    }
                    .right {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end; // background-color: red;
                        width: 200px;
                        height: 50px;
                        font-size: 16px;
                        ul {
                            display: flex;
                            li {
                                text-align: center;
                                color: white;
                                cursor: pointer; // border:1px solid green;
                                list-style: none;
                                width: 50px;
                            }
                            li:hover {
                                text-shadow: 0 0 1px white;
                            }
                        }
                    }
                }
                .search {
                    //border:1px solid red;
                    //height:300px;
                    // display: flex;
                    // flex-direction: column;
                    // align-items: center;
                    h1 {
                        text-align: center;
                        margin-top: 20px;
                        color: white;
                        font-size: 46px;
                        text-shadow: -5px 5px 0 rgba(0, 0, 0, .1);
                    } //超小屏幕（手机，小于 768px）
                    @media (max-width: 768px) {
                        h1 {
                            font-size: 36px;
                        }
                    } //小屏幕（平板，大于等于 768px）
                    @media (min-width: 768px) and (max-width: 992px) {
                        h1 {
                            font-size: 38px;
                        }
                    } //中等屏幕（桌面显示器，大于等于 992px）
                    @media (min-width: 992px) and (max-width: 1200px) {
                        h1 {
                            font-size: 40px;
                        }
                    } //大屏幕（大桌面显示器，大于等于 1200px）
                    @media (min-width: 1200px) and (max-width: 1920px) {
                        h1 {
                            font-size: 44px;
                        }
                    } //1K+屏幕
                    @media (min-width: 11920px) {
                        h1 {
                            font-size: 46px;
                        }
                    }

                    p {
                        text-align: center;
                        margin-top: 12px;
                        color: #f4f4f4;
                        font-size: 21px;
                        span {
                            font-size: 14px;
                            line-height: 38px;
                        }
                    }
                    .search-outer {
                        display: flex;
                        justify-content: center;
                        margin-top: 20px;
                        .search-text {
                            width: 700px;
                            .el-input__inner {
                                height: 52px;
                                text-align: center;
                                border-radius: 0;
                            }
                        }
                    }
                    input::-ms-input-placeholder {
                        text-align: center;
                        font-size: 16px;
                        color: #999;
                    }
                    input::-webkit-input-placeholder {
                        text-align: center;
                        font-size: 16px;
                        color: #999;
                    }
                }
                .el-row{
                    margin-bottom: 0;
                }
            }
             @media (max-width: 768px) {
                .headPlus {
                    flex: 0 0 227px;
                    height:227px;
                }
            } //小屏幕（平板，大于等于 768px）
            @media (min-width: 768px) {
                .headPlus {
                    flex: 0 0 218px;
                    height:218px;
                }
            } 
            .main {
                // border: 1px solid red;
                flex: auto;
                .el-input {
                    width: 200px;
                }
                .rowClass {
                    cursor: pointer;
                }
                @media (max-width: 768px) {
                   .searchPlus-outer {
                        padding:20px 10px 10px 10px;
                    }
                } //小屏幕（平板，大于等于 768px）
                @media (min-width: 768px) {
                   .searchPlus-outer {
                        padding:20px 20px 10px 20px;
                    }
                } 
                
            }
        }
    }
    .switchSearch-enter-active,
    .switchSearch-leave-active {
        transition: opacity .2s;//动画
    }
    .switchSearch-enter,
    .switchSearch-leave-to {
        opacity: 0;
    }
    .gpu{
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;

        -webkit-perspective: 1000;
        -moz-perspective: 1000;
        -ms-perspective: 1000;
        perspective: 1000;
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
    data() {
        return {
            msg: '欢迎光临知识库管理系统',
            searchText: '',
            listLoading: false,
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 20,
                pageTotal: 180
            },
            tableData: [  //表单列表
                {
                    id:"1",
                    title: '这是一个标题',
                    content: '这是一个内容',
                    createTime: '2019-1-13 21:53:15',
                    updateTime: '2019-1-13 21:53:20',

                }
            ],
            formSearch: { //表单查询
                title: '',//标题
                keyword: '',//关键字
                publicState: '',//发布状态
                depositoryBank: '',//存管银行
                businessType: '',//业务类型
                businessScene: '',//业务场景
                creator: '',//创建人
                createStartDate: null,//创建开始时间
                createEndDate: null,//创建结束时间
                updateStartDate: null,//更新开始时间
                updateEndDate: null,//更新结束时间
                createTime: null,
                updateTime: null,
            },
            showSearch: true,//简单检索和高级检索切换,true:简单检索,false:高级检索
        }
    },
    mounted() {
        this.onSearch();
        
    },
    methods: {
        /**
         * 查询列表
         */
        onSearch() {
            this.listLoading = true;

            if (this.formSearch.createtime) {
                this.formSearch.createStartDate = this.formSearch.createtime[0];
                this.formSearch.createEndDate = this.formSearch.createtime[1];
            }
            let param = Object.assign({}, this.formSearch, this.pageInfo);
            apis.kbmsApi.getList(param)
                .then((data) => {
                    // console.log(JSON.stringify(data) );
                    this.listLoading = false;
                    if (data && data.data) {

                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            this.pageInfo.pageTotal = json.count;
                            this.tableData = json.data;
                            try{
                                if(!this.scroll){
                                    this.$nextTick(() => {
                                        this.scroll = new BScroll(this.$refs.wrapper,  {click: true});
                                    })
                                }
                                else{
                                    this.scroll.refresh()
                                }
                               
                            }
                            catch(e){
                                console.log('初始化better-scroll失败');
                            }
                        }
                        else if (json.message) {
                            this.$message({ message: json.message, type:"error" });
                        }
                    }
                })
                .catch((err) => {
                    this.listLoading = false;
                    this.$message({ message: '查询异常，请重试', type:"error" });
                });
        },
        onReset(){
            this.$refs['formSearch'].resetFields();
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
         * 行样式
         */
        getRowClass() {
            return "rowClass";
        },
        openDetail(row, event, column) {
            //this.$message({message: '选择id:'+row.id,type: "success"});
            var param = {
                docid: row.id
            };
            this.$common.OpenNewPage(this, 'docinfo', param);
        }
    },
    computed: {
        /**
         * 内容和日期是否显示
         */
        getContentShow() {
            return document.body.clientWidth > 768;
        }
    },
    filters: {
        convertContent: (content) => {
            if (content) {
                return content.replace(/<[^>]*>/ig, "").replace(/\&nbsp;/g, "");
            }
            else {
                return "";
            }

        }
    },
}
</script>


