import './index.scss'
import './banner.scss'
import './page.scss'
import 'swiper/css/swiper.css'

import Swiper from 'swiper'
import $ from 'jquery'
import videojs from 'video.js'

var options = {
  animateThreshold: 100,
  scrollPollInterval: 20
}
;(function ($) {
  //custom scroll replacement to allow for interval-based 'polling'
  //rather than checking on every pixel.
  var uniqueCntr = 0
  $.fn.scrolled = function (waitTime, fn) {
    if (typeof waitTime === 'function') {
      fn = waitTime
      waitTime = 200
    }
    var tag = 'scrollTimer' + uniqueCntr++
    this.scroll(function () {
      var self = $(this)
      clearTimeout(self.data(tag))
      self.data(
        tag,
        setTimeout(function () {
          self.removeData(tag)
          fn.call(self[0])
        }, waitTime)
      )
    })
  }

  $.fn.AniView = function (options) {
    //some default settings. animateThreshold controls the trigger point
    //for animation and is subtracted from the bottom of the viewport.
    var settings = $.extend(
      {
        animateThreshold: 0,
        scrollPollInterval: 20
      },
      options
    )

    //keep the matched elements in a variable for easy reference
    var collection = this

    //cycle through each matched element and wrap it in a block/div
    //and then proceed to fade out the inner contents of each matched element
    $(collection).each(function (index, element) {
      $(element).wrap('<div class="av-container"></div>')
      $(element).css('opacity', 0)
    })

    /**
     * returns boolean representing whether element's top is coming into bottom of viewport
     *
     * @param HTMLDOMElement element the current element to check
     */
    function EnteringViewport(element) {
      var elementTop = $(element).offset().top
      var viewportBottom = $(window).scrollTop() + $(window).height()
      return elementTop < viewportBottom - settings.animateThreshold ? true : false
    }

    /**
     * cycle through each element in the collection to make sure that any
     * elements which should be animated into view, are...
     *
     * @param collection of elements to check
     */
    function RenderElementsCurrentlyInViewport(collection) {
      $(collection).each(function (index, element) {
        var elementParentContainer = $(element).parent('.av-container')
        if ($(element).is('[data-av-animation]') && !$(elementParentContainer).hasClass('av-visible') && EnteringViewport(elementParentContainer)) {
          $(element).css('opacity', 1)
          $(elementParentContainer).addClass('av-visible')
          $(element).addClass('animated ' + $(element).attr('data-av-animation'))
        }
      })
    }

    //on page load, render any elements that are currently/already in view
    RenderElementsCurrentlyInViewport(collection)

    //enable the scrolled event timer to watch for elements coming into the viewport
    //from the bottom. default polling time is 20 ms. This can be changed using
    //'scrollPollInterval' from the user visible options
    $(window).scrolled(settings.scrollPollInterval, function () {
      RenderElementsCurrentlyInViewport(collection)
    })
  }
})($)

$('.aniview').AniView(options)

// const bannerSwiper = new Swiper('.banner', {
//   // pagination: {
//   //   el: '.swiper-pagination',
//   //   clickable: true
//   // },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev'
//   },
//   loop: true,
//   on: {
//     init: function () {
//       this.slides.eq(0).addClass('ani-slide')
//     },
//     transitionStart: function () {
//       for (let i = 0; i < this.slides.length; i++) {
//         this.slides.eq(i).removeClass('ani-slide')
//       }
//     },
//     transitionEnd: function () {
//       this.slides.eq(this.activeIndex).addClass('ani-slide')
//     }
//   }
// })

const productSwiper = new Swiper('.product', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  breakpoints: {
    767: {
      slidesPerView: 'auto',
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      slidesPerGroup: 2
    },
    860: {
      slidesPerView: 3,
      spaceBetween: 20,
      slidesPerGroup: 3
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
      slidesPerGroup: 4
    }
  },
  navigation: {
    nextEl: '.p-next',
    prevEl: '.p-prev'
  },
  on: {
    init: function () {
      this.slides.eq(0).addClass('ani-slide')
    },
    transitionStart: function () {
      for (let i = 0; i < this.slides.length; i++) {
        this.slides.eq(i).removeClass('ani-slide')
      }
    },
    transitionEnd: function () {
      this.slides.eq(this.activeIndex).addClass('ani-slide')
    }
  }
})

document.getElementById('menu').onclick = () => {
  document.getElementById('mobile-menu').style.height = document.getElementById('mobile-menu').style.height != '100vh' ? '100vh' : '0'
}

const preventBack = flag => {
  if (flag) {
    document.getElementById('dialog').style.display = 'block'
    const top = document.documentElement.scrollTop || document.body.scrollTop
    document.body.style.position = 'fixed'
    document.body.style.width = '100vw'
    document.body.style.left = 0
    document.body.style.top = `${-top}px`
  } else {
    document.getElementById('dialog').style.display = 'none'
    const top = Math.abs(parseInt(document.body.style.top))
    document.body.style.position = 'static'
    document.body.style.width = 'initial'
    window.scrollTo(0, Math.abs(parseFloat(top)))
  }
}

window.productDialogSwiper = null
window.defalutEvet = event => {
  event.preventDefault()
  event.stopPropagation()
}
window.clickProductItem = index => {
  preventBack(true)
  if (!window.productDialogSwiper) {
    window.iframeSrc = ['https://www.youtube.com/embed/xs8nY4wS9vg', 'https://www.youtube.com/embed/bZVIRNwj_3A', 'https://www.youtube.com/embed/mivfyHTkiuk', 'https://www.youtube.com/embed/lAeBcdDAIs0', 'https://www.youtube.com/embed/F101ulW8Xcg', 'https://www.youtube.com/embed/-sTH9noocag']
    window.productDialogSwiper = new Swiper('.product-swiper', {
      initialSlide: index,
      navigation: {
        nextEl: '.dialog-next',
        prevEl: '.dialog-prev'
      },
      on: {
        init: function () {
          for (let i = 0; i < this.slides.length; i++) {
            // window.iframeSrc.push(this.slides[i].querySelector('iframe').getAttribute('src'))
            this.slides[i] && this.slides[i].querySelector('video') && videojs(this.slides[i].querySelector('video'))
          }
          this.slides.eq(this.activeIndex)[0] && this.slides.eq(this.activeIndex)[0].querySelector('video') && this.slides.eq(this.activeIndex)[0].querySelector('video').play()
        },
        transitionStart: function () {
          for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].querySelector('iframe') && this.slides[i].querySelector('iframe').setAttribute('src', '')
            this.slides.eq(i)[0] && this.slides.eq(i)[0].querySelector('video') && this.slides.eq(i)[0].querySelector('video').pause()
          }
        },
        transitionEnd: function () {
          this.slides[this.activeIndex].querySelector('iframe') && this.slides[this.activeIndex].querySelector('iframe').setAttribute('src', window.iframeSrc[this.activeIndex])
          this.slides.eq(this.activeIndex)[0] && this.slides.eq(this.activeIndex)[0].querySelector('video') && this.slides.eq(this.activeIndex)[0].querySelector('video').play()
        }
      }
    })
  } else {
    productDialogSwiper.update(true)
    productDialogSwiper.slideTo(index, 0, false)
    productDialogSwiper.slides[index] && productDialogSwiper.slides[index].querySelector('video') && productDialogSwiper.slides[index].querySelector('video').play()
    productDialogSwiper.slides[index] && productDialogSwiper.slides[index].querySelector('iframe') && productDialogSwiper.slides[index].querySelector('iframe').setAttribute('src', window.iframeSrc[index])
  }
}

window.closeDialog = () => {
  preventBack(false)
  if (window.productDialogSwiper) {
    const s = window.productDialogSwiper.slides
    for (let i = 0; i < s.length; i++) {
      s.eq(i)[0] && s.eq(i)[0].querySelector('video') && s.eq(i)[0].querySelector('video').pause()
      s.eq(i)[0] && s.eq(i)[0].querySelector('iframe') && s.eq(i)[0].querySelector('iframe').setAttribute('src', '')
    }
  }
}

window.preventBack = preventBack

videojs(document.querySelector('#video'))
