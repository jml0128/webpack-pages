/*
 * @Description: 每个页面的共用内容
 * @Author: jml
 * @Date: 2020-05-24 10:32:30
 * @LastEditors: jml
 * @LastEditTime: 2020-06-23 18:28:57
 */

import $ from 'jquery'
// 引入通用css
import '@/assets/scss/reset.scss'
import '@/assets/scss/common.scss'
import '@/assets/scss/animate.css'
// import 'animate.css'

import '@/assets/js/view.js'

// console.log(jQuery);

// 向全局注册函数 , 这种方式不建议采取，之后再优化吧
window.commonFn = (e) => {
  console.log(`This is common function , path => './src/common.js'`)
}

// 导航栏动画样式
;(function () {
  const hrDom = $('#custom-header .hr')
  const domArr = $('#custom-header nav a').toArray()
  const dom = domArr.find((item) => $(item).hasClass('active'))
  let hrLeft = $(dom).position().left
  let hrWidth = $(dom).innerWidth()
  hrDom.width(hrWidth)
  hrDom.css({ left: hrLeft, opacity: 1 }).css({ transitionDuration: '0s' })
  setTimeout(() => {
    hrDom.css({ transitionDuration: '0.3s' })
  }, 30)
  $('#custom-header nav a').mouseenter((e) => {
    const { target } = e
    console.log(target.innerText, $(target).position(), $(target).width())
    const domWidth = $(target).innerWidth()
    const offset = $(target).position()
    // const hrWidth = target.innerText.length * 18
    // console.log(domWidth, offset.left, hrWidth)
    hrLeft == 0 && (hrLeft = hrDom.position().left)
    hrWidth == 0 && (hrWidth = hrDom.width())
    hrDom.width(domWidth + 2)
    hrDom.css('left', offset.left - 1)
    $('#custom-header nav a').mouseleave((e) => {
      hrDom.width(hrWidth)
      hrDom.css('left', hrLeft)
    })
  })
})()
;(function () {
  const initHeaderHeight = $('#custom-header').innerHeight()
  const initHMainBlock = $('#custom-header>.main-block')
  $(document).scroll(function () {
    var scroH = $(document).scrollTop() //滚动高度
    var viewH = $(window).height() //可见高度
    var contentH = $(document).height() //内容高度
    // console.log(scroH)
    if (scroH > 100) {
      //距离顶部大于100px时
      $('#custom-header').height(60)
      initHMainBlock.height(65)
      initHMainBlock.css('transform', 'translateY(-5px)')
    } else {
      $('#custom-header').height(initHeaderHeight)
      initHMainBlock.css('transform', 'none')
      initHMainBlock.height(initHeaderHeight)
    }

    if (scroH > 800) {
      $('#to-top').fadeIn(200)
    } else {
      $('#to-top').fadeOut(200)
    }
    if (contentH - (scroH + viewH) <= 100) {
      //距离底部高度小于100px
    }
    if ((contentH = scroH + viewH)) {
      //滚动条滑到底部啦
    }
  })
})()

$('#to-top').click(function () {
  $('body,html').animate(
    {
      scrollTop: 0,
    },
    500
  )
  return false
})
layui.use('layer')
window.showPhoto = function (src) {
  layer.photos({
    photos: {
      title: '', //相册标题
      id: 123, //相册id
      start: 0, //初始显示的图片序号，默认0
      data: [
        {
          alt: '',
          pid: 666, //图片id
          src: src, //原图地址
          thumb: src, //缩略图地址
        },
      ],
    },
    anim: 5, //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
  })
}

