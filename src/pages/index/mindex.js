/*
 * @Description:
 * @Author: jml
 * @Date: 2020-06-22 19:58:24
 * @LastEditors: jml
 * @LastEditTime: 2020-06-28 16:43:04
 */

import './mindex.scss'
import 'swiper/css/swiper.css'
import Swiper from 'swiper'

var options = {
  animateThreshold: 100,
  scrollPollInterval: 20,
}
$('.aniview').AniView(options)
const bannerSwiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 'auto',
  centeredSlides: !0,
  watchSlidesProgress: !0,
  paginationClickable: !0,
})
const companySwiper = new Swiper('.company-swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})
