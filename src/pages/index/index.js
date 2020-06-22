/*
 * @Description:
 * @Author: jml
 * @Date: 2020-06-22 19:58:24
 * @LastEditors: jml
 * @LastEditTime: 2020-06-22 21:30:06
 */

import './index.scss'
import 'swiper/css/swiper.css'

import Swiper from 'swiper'

const bannerSwiper = new Swiper('.banner', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
})

