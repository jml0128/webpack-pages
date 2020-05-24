/*
 * @Author: your name
 * @Date: 2020-05-18 10:22:41
 * @LastEditTime: 2020-05-21 22:13:55
 * @LastEditors: jml
 * @Description: In User Settings Edit
 * @FilePath: \06-zw-page\src\pages\artmobile\index.js
 */ 
import './index.scss'
import 'swiper/css/swiper.css'
import Lazyload from 'image-lazyload'

import Swiper from 'swiper'
const bannerSwiper = new Swiper('.students', {
  slidesPerView: 2,
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: false,
})

const teacherSwiper = new Swiper('.teacher', {
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  loop: false,
})

const imgs = document.getElementsByClassName('lazy')
const lazy = new Lazyload({
  obj: imgs,
  range: 200,
})

lazy.init()

window.changeNav = (index) => {
  const domArr = document.getElementsByClassName('tips-nav-item') || []
  const dom = domArr[index]
  const cDomArr = document.getElementsByClassName('tips-group') || []
  const cDom = cDomArr[index]
  if (Object.prototype.toString.call(dom) === '[object HTMLDivElement]') {
    const isActive = dom.className.split(' ').includes('active')
    if (!isActive) {
      for (const i in domArr) {
        const keyIndex = parseInt(i)
        if (!isNaN(keyIndex)) {
          domArr[i].className = 'item tips-nav-item'
          cDomArr[i].className = 'm-content tips-group'
        }
        dom.className = 'item tips-nav-item active'
        cDom.className = 'm-content tips-group show'
      }
    }
  }
}
