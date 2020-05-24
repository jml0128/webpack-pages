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
    pre[cur] = `${publicPath}${pages[cur].js}`
    const page = pages[cur]
    pre.push({
      title: page.title,
      template: `${publicPath}${page.html}`,
      filename: `${cur}.html`,
      chunks: ['vender', cur],
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
