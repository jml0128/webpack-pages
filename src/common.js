/*
 * @Description: 
 * @Author: jml
 * @Date: 2020-05-24 10:49:18
 * @LastEditors: jml
 * @LastEditTime: 2020-05-30 00:46:40
 */ 
import '@/assets/scss/reset.scss'
import '@/assets/scss/common.scss'
import '@/assets/scss/hotfix.scss'

window.showNav = (e) => {
  const navDom = document.getElementById('nav')
  const status = e.getAttribute('data-v')
  const n = require('@/assets/img/n.png').default
  const c = require('@/assets/img/c.png').default
  if (status === 'n') {
    e.src = c
    e.setAttribute('data-v', 'v')
    navDom.style.display = 'flex'
  } else {
    e.src = n
    e.setAttribute('data-v', 'n')
    navDom.style.display = 'none'
  }
  console.log(status)
}
