
import adminApi from './adminApi';
import shiroApi from './shiroApi';
import mayiApi from './mayiApi';
import kbmsApi from './kbmsApi';
import fileImportApi from './fileImportApi';
import dictionaryApi from './dictionaryApi';
import msgApi from './msgApi';
import userApi from './userApi';
/**
 * 接口汇总
 */
export default {
    /**用户,角色,组织等管理接口 */
    adminApi: adminApi,
    /**认证接口 */
    shiroApi: shiroApi,
    /**蚂蚁种树接口 */
    mayiApi:mayiApi,
    /**知识库管理接口 */
    kbmsApi:kbmsApi,
    /**文件上传接口 */
    fileImportApi:fileImportApi,
    /**字典管理接口 */
    dictionaryApi:dictionaryApi,
     /**通知管理接口 */
     msgApi:msgApi,
    /**用户管理接口 */
    userApi:userApi,

}