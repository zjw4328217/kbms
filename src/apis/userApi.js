import Axios from "axios";

/**
 * 提供user管理相关接口
 */
export default {
    add:function({name,loginName,gender,phone,email,position,organization,state}){
         var param={
            name:name,
            loginName:loginName,
            gender:gender,
            phone:phone,
            email:email,
            position:position,
            organization:organization,
            state:state,    
        };
        param.password='123456';//新增用户默认密码
        return Axios.post('/api/user-api/add', param);
    },
    update:function({id,name,loginName,gender,phone,email,position,organization,state,resetPwd}){
        var param={
            id:id,
            name:name,
            loginName:loginName,
            gender:gender,
            phone:phone,
            email:email,
            position:position,
            organization:organization,
            state:state,
       };
       debugger;
       if(resetPwd){
           param.password='123456';//如果选中重置密码,则重置密码为默认密码
       }
       return Axios.post('/api/user-api/update', param);
   },
   delete:function({id}){
        var param={
            id:id
        };
        return Axios.post('/api/user-api/delete', param);
    },
    deleteBatch:function({ids}){
        var param={
            ids:ids
        };
        return Axios.post('/api/user-api/deleteBatch', param);
    },
    getList({name,loginName,gender,phone,email,position,organization,state,createStartDate,createEndDate,currentPage,pageSize}){
        var param={
            name:name,
            loginName:loginName,
            gender:gender,
            phone:phone,
            email:email,
            position:position,
            organization:organization,
            state:state,
            createStartDate:createStartDate,
            createEndDate:createEndDate,
            currentPage:currentPage,
            pageSize:pageSize,
        };
        return Axios.post('/api/user-api/queryList', param);
    }
}
