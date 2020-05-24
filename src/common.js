import '@/assets/scss/reset.scss'
import '@/assets/scss/common.scss'

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
