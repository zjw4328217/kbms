const Mock = require("mockjs")
var mockObj={
    dataList:[],
    count:9,
    init(){
        for (let i = 0; i < this.count; i++) {
            var data= Mock.mock({
                            id: Mock.Random.guid(),
                            title: Mock.Random.cname()+'标题',
                            content:Mock.Random.cname()+'内容内容内容内容内容内容',
                            "publicState|1":["已发布","未发布"],
                            depositoryBank:'存管银行',
                            createTime:Mock.Random.datetime(),
                            updateTime:Mock.Random.datetime(),
                            creator:Mock.Random.cname(),
                            
                            viewCount:Mock.Random.integer( 1, 200 ),
                        });
            this.dataList.push(data);
        }
        //列表查询
        Mock.mock('/api/msg-api/queryList', 'post', this.getList);
        //添加
        Mock.mock('/api/msg-api/add', 'post', this.add);
        //更新
        Mock.mock('/api/msg-api/update', 'post', this.update);
         //删除
         Mock.mock('/api/msg-api/delete', 'post', this.delete);
          //批量删除
        Mock.mock('/api/msg-api/deleteBatch', 'post', this.deleteBatch);
        //更新发布状态
        Mock.mock('/api/msg-api/updatePublicState', 'post', this.updatePublicState);
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
        debugger;
        var param=JSON.parse(body);
        //后端提取的参数
        param.id=Mock.Random.guid();//设置id
        param.createTime=Mock.Random.date(),
        param.updateTime=Mock.Random.date(),
        param.creator=Mock.Random.cname(),
        mockObj.dataList.push(param);
        var result={
            "status":"SUCCESS",
            "message":"执行成功"
        }
        return result;
    },
    update:function({body}){
        debugger;
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
    debugger;
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
    debugger;
    var param=JSON.parse(body);
    var index=mockObj.dataList.findIndex((item)=>{
        return item.id==param.id
    });
    if(index!=-1){
        debugger;
        Object.assign(mockObj.dataList[index],param);
    }
    var result={
        "status":"SUCCESS",
        "message":"执行成功"
    }
    return result;
},
}
mockObj.init();