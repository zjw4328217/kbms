const Mock = require("mockjs")
/** mockjs start */
var mockObj={
    dataList:[],
    count:7,
    //初始化
    init(){
        for (let i = 0; i < this.count; i++) {
            var data= Mock.mock({
                            id:Mock.Random.guid(),
                            name: Mock.Random.cname(),
                            loginName:Mock.Random.title(1,1),
                            "gender|1":['男','女'],
                            phone:/^1[385][1-9]\d{8}/,
                            email:Mock.Random.email(),
                            position:'高级研发',
                            organization:'商城部',
                            'state|1':['启用','停用'],
                            createTime: Mock.Random.date(),
                            updateTime:Mock.Random.date(),
                        });
            this.dataList.push(data);
        }
        //查询
        Mock.mock('/api/user-api/queryList', 'post', this.getList);
        //删除
        Mock.mock('/api/user-api/delete', 'post', this.delete);
        //添加
        Mock.mock('/api/user-api/add', 'post', this.add);
        //添加
        Mock.mock('/api/user-api/update', 'post', this.update);
         //批量删除
         Mock.mock('/api/user-api/deleteBatch', 'post', this.deleteBatch);
    },
    getList:({body})=>{
        var param=JSON.parse(body);
        var pageSize=param.pageSize;
        var currentPage=param.currentPage;
        const pageList = mockObj.dataList.filter((item, index) => {
            return index >= pageSize * (currentPage-1)  &&  index < pageSize * currentPage+1
        })
        var result={
            "status":"SUCCESS",
            "message":"执行成功",
            "data":pageList,
            "count":mockObj.dataList.length
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
     add:({body})=>{
        var param=JSON.parse(body);
        debugger;
        //后端提取的参数
        param.id=Mock.Random.guid();//设置id
        param.createTime=Mock.Random.date(),
        param.updateTime=Mock.Random.datetime(),
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
}
//初始化mock数据和接口
mockObj.init();

/** mockjs end */