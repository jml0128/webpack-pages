/*
 * @Description: webpack的入口文件，用于处理多页面配置，为webpack提供每个页面的js、css
 * @Author: jml
 * @Date: 2020-05-24 10:32:30
 * @LastEditors: jml
 * @LastEditTime: 2020-10-19 22:13:57
 */

const pages = require('./config/pages.js')
const getEntry = (pages, publicPath) => {
  if (typeof pages !== 'object') {
    return {}
  }
  const obj = Object.keys(pages).reduce((pre, cur) => {
    pre[cur] = `${publicPath}${pages[cur].js}`
    return pre
  }, {})
  return obj
}

const getPage = (pages, publicPath) => {
  if (typeof pages !== 'object') {
    return []
  }
  const obj = Object.keys(pages).reduce((pre, cur) => {
    const page = pages[cur]
    pre.push({
      title: page.title,
      template: `${publicPath}${page.html}`,
      filename: `${cur}.html`,
      chunks: (pages[cur].otherJs || []).concat(['vender', cur]),
      minify: false,
    })
    return pre
  }, [])
  return obj
}

module.exports = {
  entry: getEntry(pages, './src'),
  pages: getPage(pages, './src'),
}
