import Axios from "axios";

/**
 * 上传文件api
 */
export default {
    /**
     * 上传文件
     */
    updateFile: function ({ file }) {
        let formData = new FormData();
        formData.append("upload", file);
        return Axios.post('/api/img-api/uploadFile', formData);
    },
    getList({
        name,
        type,
        currentPage,
        pageSize }){
        var param={
            name:name,
            type:type,
            currentPage:currentPage,
            pageSize:pageSize
        };
        return Axios.post('/api/file-api/queryList', param);
    },
    delete:function({id}){
        var param={
            id:id
        };
        return Axios.post('/api/file-api/delete', param);
    },
    add:function({name,type,des,url}){
        var param={
            name: name,
            type:type,
            des:des,
            url:url,
       };
       return Axios.post('/api/file-api/add', param);
   },
   deleteBatch:function({ids}){
    var param={
        ids:ids
    };
    return Axios.post('/api/file-api/deleteBatch', param);
},
}
