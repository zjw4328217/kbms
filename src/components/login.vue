<template>
    <div class="login_wrapper">
        <div class="login">
            <el-form class="form" :model="formLogin">
                <el-form-item>
                    <h2 class="title">知识库管理系统</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.password" type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登陆</el-button>
                    <span v-show="this.errorInfo.isShowError" class='error'>
                        {{this.errorInfo.text}}
                    </span>
                </el-form-item>

            </el-form>
            
        </div>
        <p class="beian">京ICP备18050367号-1</p>
      
    </div>
</template>

<style lang="scss">
$input_width:300px;

.login_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
        width: 460px;
        height: 296px;
        margin-top: -150px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        display:flex;
        justify-content: center;
        .form{
            width:300px;
            margin-top:30px;
            display: flex;
            flex-flow:nowrap column;
            text-align: center;
            .title {
                color: #505458;
            }
            .error {
                display: block;//单独占一行
                color: red;
            }
        }
    }
}
.recover{
    position:absolute;
    bottom:0px; 
    cursor:pointer; 
    color:#E6A23C;
    display: none;
}
.beian{
    position:absolute;
    bottom:20px; 
    cursor:pointer; 
    color:#505458;
}
</style>

<script>
import apis from '../apis/apis';
export default {
    name: 'login',
    data() {
        return {
            formLogin: {   //表单对象
                loginName: 'admin',
                password: '123456'
            },
            errorInfo: {
                text: '登陆失败,请重试',
                isShowError: false //显示错误提示
            }

        }
    },
    mounted() {
        document.onkeydown = (event) => {
            var router=this.$route.path;
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13&&this.$route.path=='/login') { // enter 键 
                this.login();
            }
        };
    },
    methods: {
        login() {
            //调用后端登陆接口
            apis.shiroApi.loginIn(this.formLogin)
                .then((data) => {
                    console.log('success:', data);
                    if (data && data.data) {
                        var json = data.data;
                        if (json.status == 'SUCCESS') {
                            this.$common.setSessionStorage('token', json.data.userInfo.token);
                            this.$common.setSessionStorage('username',json.data.userInfo.userName);
                            this.$common.setSessionStorage('lev',json.data.sysRoleVoList);//职位
                           
                            this.$router.replace({ path: "/home" });
                            
                            return;
                        }
                        else if (json.message) {
                            this.errorInfo.text = json.message;
                        }
                    }
                    this.errorInfo.isShowError = true;
                   
                })
                .catch((err) => {
                    console.log('error:', err);
                    this.errorInfo.isShowError = true;
                    this.errorInfo.text = '系统接口异常';
                });

        }
    }
}
</script>
