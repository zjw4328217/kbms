const Mock = require("mockjs")
Mock.mock('/api/shiro-api/login', 'post', function(){
    var result=
    {
        "status":"SUCCESS",
        "message":"登陆成功",
        "dataList":[
    
        ],
        "data":{
            "userInfo":{
                "userId":1,
                "userName":"admin",
                "userNo":"1",
                "loginName":"admin",
                "orgId":null,
                "orgName":null,
                "salt":null,
                "password":null,
                "email":"",
                "loginTime":"2019-01-06 21:26:59",
                "orgParentId":null,
                "orgParentName":null,
                "positionName":null,
                "token":"D75C2A59B9F0BC87D66F0F68D81CF3F1"
            },
            "sysRoleVoList":[
                {
                    "roleName":"白银岗"
                }
            ]
        }
    }
    return result;
    
});