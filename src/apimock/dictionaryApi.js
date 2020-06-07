const Mock = require("mockjs")
/** mockjs start */
var mockObj={
    dataList:[],
    dataList_Detail:[],
    count:8,
    //初始化
    init(){
        for (let i = 0; i < this.count; i++) {
            var data= Mock.mock({
                            id: Mock.Random.guid(),
                            name: Mock.Random.cname()+'文件名',
                            code:Mock.Random.title(1,1),
                            des:Mock.Random.cname()+'字典描述',
                            createTime:Mock.Random.datetime(),
                        });
            this.dataList.push(data);
        }
        //列表查询
        Mock.mock('/api/dictionary-api/queryList', 'post', this.getList);
        //列表查询
        Mock.mock('/api/dictionary-api/queryList_Detail', 'post', this.getList_Detail);
        //添加
        Mock.mock('/api/dictionary-api/add', 'post', this.add);
        //添加详情
        Mock.mock('/api/dictionary-api/add_Detail', 'post', this.add_Detail);
        // //更新
        Mock.mock('/api/dictionary-api/update', 'post', this.update);
        //删除
        Mock.mock('/api/dictionary-api/delete', 'post', this.delete);
         //删除
         Mock.mock('/api/dictionary-api/delete_Detail', 'post', this.delete_Detail);
    },
    getList:({body})=>{
        var param=JSON.parse(body);
        var pageSize=param.pageSize;
        var currentPage=param.currentPage;
        const pageList = mockObj.dataList.filter((item, index) => {
            return index >= pageSize * (currentPage-1)  &&  index < pageSize * currentPage
        })
        var result={
            "status":"SUCCESS",
            "message":"执行成功",
            "data":pageList,
            "count":mockObj.dataList.length
        }
        return result;
    },
    getList_Detail:({body})=>{
        var param=JSON.parse(body);
        var pageSize=param.pageSize;
        var currentPage=param.currentPage;
        const pageList = mockObj.dataList_Detail.filter((item, index) => {
            return item.parentId==param.parentId&& index >= pageSize * (currentPage-1)  &&  index < pageSize * currentPage
        })
        var result={
            "status":"SUCCESS",
            "message":"执行成功",
            "data":pageList,
            "count":mockObj.dataList_Detail.length
        }
        return result;
    },
    add:({body})=>{
        var param=JSON.parse(body);
        //后端提取的参数
        param.id=Mock.Random.guid();//设置id
        param.createTime=Mock.Random.date(),
        mockObj.dataList.push(param);
        var result={
            "status":"SUCCESS",
            "message":"执行成功"
        }
        return result;
    },
    add_Detail:({body})=>{
        var param=JSON.parse(body);
        //后端提取的参数
        param.id=Mock.Random.guid();//设置id
        param.createTime=Mock.Random.date(),
        mockObj.dataList_Detail.push(param);
        var result={
            "status":"SUCCESS",
            "message":"执行成功"
        }
        return result;
    },
    update:function({body}){
        var param=JSON.parse(body);
        var index=mockObj.dataList.findIndex((item)=>{
            return item.id==param.id
        });
        if(index!=-1){
            Object.assign(mockObj.dataList[index],param);
        }
        var result={
            "status":"SUCCESS",
            "message":"执行成功"
        }
        return result;
   },
   delete:function({body}){
        var param=JSON.parse(body);
        var index=mockObj.dataList.findIndex((item)=>{
            return item.id==param.id
        });
        if(index!=-1){
            mockObj.dataList.splice(index,1);
        }
        var result={
            "status":"SUCCESS",
            "message":"执行成功"
        }
        return result;
    },
    delete_Detail:function({body}){
        var param=JSON.parse(body);
        var index=mockObj.dataList_Detail.findIndex((item)=>{
            return item.id==param.id
        });
        if(index!=-1){
            mockObj.dataList_Detail.splice(index,1);
        }
        var result={
            "status":"SUCCESS",
            "message":"执行成功"
        }
        return result;

    },
    deleteBatch:function({body}){
        var param=JSON.parse(body);
        for(var i=0;i<param.ids.length;i++){
            var id=param.ids[i];
            var index=mockObj.dataList.findIndex((item)=>{
                return item.id==id
            });
            if(index!=-1){
                mockObj.dataList.splice(index,1);
            }
        }
        var result={
            "status":"SUCCESS",
            "message":"执行成功"
        }
        return result;
    },
    updatePublicState:function({body}){

        var param=JSON.parse(body);
        var index=mockObj.dataList.findIndex((item)=>{
            return item.id==param.id
        });
        if(index!=-1){
            Object.assign(mockObj.dataList[index],param);
        }
        var result={
            "status":"SUCCESS",
            "message":"执行成功"
        }
        return result;
    },
}
//初始化mock数据和接口
mockObj.init();

/** mockjs end */