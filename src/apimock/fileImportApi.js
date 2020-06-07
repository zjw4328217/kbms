const Mock = require("mockjs")
/** mockjs start */
var mockObj={
    dataList:[],
    count:8,
    //初始化
    init(){
        for (let i = 0; i < this.count; i++) {
            var data= Mock.mock({
                            id: Mock.Random.guid(),
                            name: Mock.Random.cname()+'文件名',
                            type:["公司文件","第三方文件"],
                            des:Mock.Random.cname()+'文件描述',
                            createTime:Mock.Random.datetime(),
                            url:'api/uploadFile/2019-01-19/1547827488253-知识库需求V1.0.txt',
                        });
            this.dataList.push(data);
        }
        //列表查询
        Mock.mock('/api/file-api/queryList', 'post', this.getList);
        //添加
        Mock.mock('/api/file-api/add', 'post', this.add);
        // //更新
        // Mock.mock('/api/msg-api/update', 'post', this.update);
        //删除
        Mock.mock('/api/file-api/delete', 'post', this.delete);
        // //批量删除
        Mock.mock('/api/file-api/deleteBatch', 'post', this.deleteBatch);
        // //更新发布状态
        // Mock.mock('/api/msg-api/updatePublicState', 'post', this.updatePublicState);
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
    update:function({body}){
        
        var param=JSON.parse(body);
        // const pageList = mockObj.dataList.filter((item, index) => {
        //     return item.id==param.id
        // })
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