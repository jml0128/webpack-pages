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
