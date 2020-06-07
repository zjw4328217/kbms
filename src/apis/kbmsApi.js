import Axios from "axios";

/**
 * 提供kbms相关接口
 */
export default {
    add:function({title,content,keywords,depositoryBank,businessType,businessScene,publicState}){
         var param={
                title: title,
                content:content,//内容
                keywords:keywords,
                depositoryBank:depositoryBank,//存管银行
                businessType:businessType,//业务类型
                businessScene:businessScene,//业务场景
                publicState:publicState,//发布状态
        };
        return Axios.post('/api/kbms-api/add', param);
    },
    update:function({id,title,content,keywords,depositoryBank,businessType,businessScene,publicState}){
        var param={
            id:id,
            title: title,
            content:content,//内容
            keywords:keywords,
            depositoryBank:depositoryBank,//存管银行
            businessType:businessType,//业务类型
            businessScene:businessScene,//业务场景
            publicState:publicState,//发布状态
       };
       return Axios.post('/api/kbms-api/update', param);
   },
   delete:function({id}){
        var param={
            id:id
        };
        return Axios.post('/api/kbms-api/delete', param);
    },
    deleteBatch:function({ids}){
        var param={
            ids:ids
        };
        return Axios.post('/api/kbms-api/deleteBatch', param);
    },
    updatePublicState:function({id,publicState}){
        var param={
            id:id,
            publicState:publicState
        };
        return Axios.post('/api/kbms-api/updatePublicState', param);
    },
    getList({title,
        keyword,
        publicState,
        depositoryBank,
        businessType,
        businessScene,
        creator,
        createStartDate,
        createEndDate,
        updateStartDate,
        updateEndDate,
        currentPage,
        pageSize }){
        var param={
                title: title,//标题
                keyword:keyword,//关键字
                publicState:publicState,//发布状态
                depositoryBank:depositoryBank,//存管银行
                businessType:businessType,//业务类型
                businessScene:businessScene,//业务场景
                creator:creator,//创建人
                createStartDate:createStartDate,//创建开始时间
                createEndDate:createEndDate,//创建结束时间
                updateStartDate:updateStartDate,//更新开始时间
                updateEndDate:updateEndDate,//更新结束时间
            currentPage:currentPage,
            pageSize:pageSize
        };
        return Axios.post('/api/kbms-api/queryList', param);
    },
    getOne({id}){
        var param={
            id:id
        };
        return Axios.post('/api/kbms-api/getOne', param);
    }
}
