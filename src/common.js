/*
 * @Description: 每个页面的共用内容
 * @Author: jml
 * @Date: 2020-05-24 10:32:30
 * @LastEditors: jml
 * @LastEditTime: 2020-05-24 10:44:57
 */

// 引入通用css
import '@/assets/scss/reset.scss'
import '@/assets/scss/common.scss'

// 向全局注册函数 , 这种方式不建议采取，之后再优化吧
window.commonFn = (e) => {
  console.log(`This is common function , path => './src/common.js'`)
}
