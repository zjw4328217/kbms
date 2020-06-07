import Axios from "axios";

/**
 * 字典管理api
 */
export default {
    getList({
        name,
        code,
        currentPage,
        pageSize }){
        var param={
            name:name,
            code:code,
            currentPage:currentPage,
            pageSize:pageSize
        };
        return Axios.post('/api/dictionary-api/queryList', param);
    },
    getList_Detail({
        parentId,
        currentPage,
        pageSize }){
        var param={
            parentId:parentId,
            currentPage:currentPage,
            pageSize:pageSize
        };
        return Axios.post('/api/dictionary-api/queryList_Detail', param);
    },
    delete:function({id}){
        var param={
            id:id
        };
        return Axios.post('/api/dictionary-api/delete', param);
    },
    delete_Detail:function({id}){
        var param={
            id:id
        };
        return Axios.post('/api/dictionary-api/delete_Detail', param);
    },
    add:function({name,code,des}){
        var param={
            name: name,
            code:code,
            des:des,
       };
       return Axios.post('/api/dictionary-api/add', param);
   },
   add_Detail:function({parentId,name,value,index}){
    var param={
        parentId:parentId,
        name: name,
        value:value,
        index:index,
   };
   return Axios.post('/api/dictionary-api/add_Detail', param);
},
   update:function({id,name,des}){
    var param={
        id:id,
        name: name,
        des:des,
   };
   return Axios.post('/api/dictionary-api/update', param);
}
}
