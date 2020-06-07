// 将所有的mock文件引入
require('../apimock/kbmsApi')
require('../apimock/shiroApi')
require('../apimock/fileImportApi')
require('../apimock/dictionaryApi')
require('../apimock/msgApi')
require('../apimock/userApi')
// 在这里可以做一些通用的配置
const Mock = require("mockjs")
// 设置所有ajax请求的超时时间，模拟网络传输耗时
// Mock.setup({
//     timeout: 0-300
// })
