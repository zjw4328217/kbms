import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      component: resolve => require(['@/components/login.vue'], resolve),
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/',
      component: resolve => require(['@/components/Common/Home.vue'], resolve),
      meta: {
        title: '自述文件'
      },
      children:[
        {
          name:'home',
          path: '/home',
          component: resolve => require(['@/components/index.vue'], resolve),
          meta: {
            title: '系统首页'
          }
        },
        {
          name:'kbms',
          path:'/kbms',
          component: resolve => require(['@/components/kbms/kbms.vue'], resolve),
          meta:{
            title:'知识库管理'
          }
        },
        {
          name:'msg',
          path:'/msg',
          component: resolve => require(['@/components/msg/msg.vue'], resolve),
          meta:{
            title:'通知管理'
          }
        },
        {
          name:'fileimport',
          path:'/fileimport',
          component: resolve => require(['@/components/fileimport/fileimport.vue'], resolve),
          meta:{
            title:'文件导入'
          }
        },
        {
          name:'dictionary',
          path:'/dictionary',
          component: resolve => require(['@/components/dictionary/dictionary.vue'], resolve),
          meta:{
            title:'字典管理'
          }
        },
        {
          name: 'user',
          path: '/user',
          component: resolve => require(['@/components/sys/user.vue'], resolve),
          meta: { title: '用户管理' }
        }
      ]
    },
    //前台路由 start
    {
      name:'index',
      path:'/index',
      component:resolve=>require(['@/components/frontpage/frontindex.vue'],resolve),
      meta:{title:'前台首页'}
    },
     {
      name:'docinfo',
      path:'/docinfo',
      component:resolve=>require(['@/components/frontpage/docinfo.vue'],resolve),
      meta:{title:'文档详情页'}
    },
    //前台路由 end
    {
      name:'test',
      path:'/test',
      component:resolve=>require(['@/components/test.vue'],resolve),
      meta:{title:'测试页'}
    },
    {
      name:'404',
      path: '/404',
      component: resolve => require(['../components/common/404.vue'], resolve),
      meta: { title: '路由不存在' }
    },
    {
      name:'403',
      path: '/403',
      component: resolve => require(['../components/common/403.vue'], resolve),
      meta: { title: '资源不可访问' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
});
//不需要登录认证的路由
var notLimitRoutes=['/index','/docinfo','/test'];
//全局路由守卫
router.beforeEach((to, from, next) => {
  
  console.log('跳转到:', to.fullPath);
  if (notLimitRoutes.indexOf(to.path)!=-1) {
    next();
  }
  else {
    var token = sessionStorage.getItem('token');
    //如果没登录,都导向登录页
    if (!token) {
      if (to.path !== '/login') {
        next({ path: '/login' })
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  }

})

export default router
