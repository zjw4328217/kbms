/**
 * 
 * 懒加载动态路由 
 */
function lazy(code) {

  //return  resolve => require(["@/components/" + name + ".vue"], resolve)
  return getComponetByPath('/' + code);


}
function getComponetByPath(path) {
  for (var i = 0; i < dynamicRouter.length; i++) {
    var route = dynamicRouter[i];
    if (route.path == path) {
      return route.component;
    }
  }
}
/**
 * 路由定义
 * path跟配置里的资源标示对应,同时跟url地址对应
 */
const dynamicRouter = [
  {
    name: 'index',
    path: '/index',
    component: resolve => require(['@/components/index.vue'], resolve),
    meta: {
      title: '系统首页'
    }
  },
  {
    name: 'OrganizationTree',
    path: '/organizationTree',
    component: resolve => require(['@/components/admin/OrganizationTree.vue'], resolve),
    meta: { title: '机构管理' }
  },
  {
    name: 'SysUser',
    path: '/sysUser',
    component: resolve => require(['@/components/admin/SysUser.vue'], resolve),
    meta: { title: '用户管理' }
  },
  {
    name: 'SysAcl',
    path: '/sysAcl',
    component: resolve => require(['@/components/admin/SysAcl.vue'], resolve),
    meta: { title: '角色资源管理' }
  },
  {
    name: 'SysMenu',
    path: '/sysMenu',
    component: resolve => require(['@/components/admin/SysMenu.vue'], resolve),
    meta: { title: '菜单管理' }
  },
  {
    name: 'SysResource',
    path: '/sysResource',
    component: resolve => require(['@/components/admin/SysResource.vue'], resolve),
    meta: { title: '资源管理' }
  },
  {
    name: 'SysRole',
    path: '/sysRole',
    component: resolve => require(['@/components/admin/SysRole.vue'], resolve),
    meta: { title: '角色管理' }
  },
  {
    name: 'sysRoleMap',
    path: '/sysRoleMap',
    component: resolve => require(['@/components/admin/SysRoleMap.vue'], resolve),
    meta: { title: '角色权限管理' }
  }
]
export { lazy }

