import Axios from "axios";
/**
 * 提供msg相关接口
 */
export default{
    add:function({title,content,depositoryBank,publicState}){
        var param={
               title: title,
               content:content,//内容               
               depositoryBank:depositoryBank,//存管银行
               publicState:publicState,//发布状态
       };
       return Axios.post('/api/msg-api/add', param);
   },
   update:function({id,title,content,depositoryBank,publicState}){
    var param={
        id,id,
        title: title,
        content:content,//内容
        depositoryBank:depositoryBank,//存管银行
        publicState:publicState,//发布状态
        };
   return Axios.post('/api/msg-api/update', param);
   },
   delete:function({id}){
    var param={
        id:id
        };
    return Axios.post('/api/msg-api/delete', param);
    },
    deleteBatch:function({ids}){
        var param={
            ids:ids
        };
        return Axios.post('/api/msg-api/deleteBatch', param);
    },
   updatePublicState:function({id,publicState}){
    var param={
        
        id:id,
        publicState:publicState
        }
    return Axios.post('/api/msg-api/updatePublicState', param);
    },
 
    getList({title,
        publicState,
        depositoryBank,
        createStartDate,
        createEndDate,
        updateStartDate,
        updateEndDate,
        currentPage,
        pageSize }){
            var param={
                title: title,//标题
                publicState:publicState,//发布状态
                depositoryBank:depositoryBank,//存管银行
                createStartDate:createStartDate,//创建开始时间
                createEndDate:createEndDate,//创建结束时间
                updateStartDate:updateStartDate,//更新开始时间
                updateEndDate:updateEndDate,//更新结束时间
            currentPage:currentPage,
            pageSize:pageSize
        };
        return Axios.post('/api/msg-api/queryList', param);
        }
}