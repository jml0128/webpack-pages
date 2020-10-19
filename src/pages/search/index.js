/*
 * @Description:
 * @Author: jml
 * @Date: 2020-06-22 19:58:24
 * @LastEditors: jml
 * @LastEditTime: 2020-10-19 22:30:40
 */

import './index.scss'

var options = {
  animateThreshold: 100,
  scrollPollInterval: 20,
}
$('.aniview').AniView(options)

var lObj = {}
var allData = []
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
layui.use(['layer', 'element', 'jquery', 'form'], function () {
  var info = {}
  var jq = layui.jquery
  var form = layui.form
  var obj = {
    querycar_type: getQueryString('querycar_type'),
    city: getQueryString('city'),
    chejia: getQueryString('chejia'),
    peijian: getQueryString('peijian'),
  }
  setTimeout(() => {
    queryRegion(function () {
      console.log(window.searchObj)
      var chejiaNo = getQueryString('chejia')
      var peijianNo = getQueryString('peijian')
      if (chejiaNo) {
        chejiaAjax(chejiaNo, function (data) {
          zhizaoshangAjax(data.zhizaoshang)
          getAllInfo(data.zhizaoshang, data.car_data_id, function () {
            var info =
              allData.find((item) => {
                return item.id == data.car_data_id
              }) || {}
            $('#nian').html(
              `<option value="${info.id}" selected>${info.start_time}</option>`
            )
            $('#kw').html(
              `<option value="${info.id}" selected>${info.KW}/${info.HP}</option>`
            )
            form.render('select')
            productAjax(info.id)
          })

          // otherAjax("xinghao", data.zhizaoshang, data.xinghao);
          // otherAjax("cheliang", data.xinghao, data.chelian);
          // otherAjax("bianshi", data.chelian, data.bianshi);
          data.bianshi && productAjax(data.bianshi)
        })
      } else if (peijianNo) {
        $('#s-group').hide()
        peijianAjax(peijianNo)
      } else {
        zhizaoshangAjax()
      }
    })
  }, 200)
  form.on('select(s)', function (data) {
    if ((data.value + '').length > 0) {
      lObj[$(data.elem).attr('name')] = data.value
    } else {
      delete lObj[$(data.elem).attr('name')]
    }
    var domId = $(data.elem).attr('id')
    console.log(domId)
    if (domId == 'zhizaoshang') {
      // lObj.zhizaoshang && otherAjax("xinghao", lObj.zhizaoshang);
      // dealSelectData([], $("#cheliang"));
      // dealSelectData([], $("#bianshi"));
      lObj.zhizaoshang && getAllInfo(lObj.zhizaoshang)
      dealSelectData([], $('#cheliang'))
      $('#nian').html(`<option value="">选择年份</option>`)
      $('#kw').html(`<option value="">KW/PH</option>`)
      dealSelectData([], $('#product'))
      dealList([], $('#s-goods-group .right'))
    }
    if (domId == 'xinghao') {
      lObj.xinghao
        ? otherAjax('cheliang', lObj.xinghao)
        : dealSelectData([], $('#cheliang'))
      dealSelectData([], $('#bianshi'))
      dealSelectData([], $('#product'))
      dealList([], $('#s-goods-group .right'))
    }
    if (domId == 'cheliang') {
      if (lObj.cheliang) {
        var info =
          allData.find((item) => {
            return item.id == lObj.cheliang
          }) || {}
        $('#nian').html(
          `<option value="${info.id}" selected>${info.start_time}</option>`
        )
        $('#kw').html(
          `<option value="${info.id}" selected>${info.KW}/${info.HP}</option>`
        )
        form.render('select')
        productAjax(info.id)
      } else {
        $('#nian').html(`<option value="">选择年份</option>`)
        $('#kw').html(`<option value="">KW/PH</option>`)
        dealSelectData([], $('#product'))
      }
      dealList([], $('#s-goods-group .right'))
      return
      lObj.cheliang
        ? otherAjax('bianshi', lObj.cheliang)
        : dealSelectData([], $('#bianshi'))
      dealSelectData([], $('#product'))
      dealList([], $('#s-goods-group .right'))
    }
    if (domId == 'bianshi') {
      dealSelectData([], $('#product'))
      lObj.bianshi
        ? productAjax(lObj.bianshi)
        : dealSelectData([], $('#product'))
      dealList([], $('#s-goods-group .right'))
    }
    if (domId == 'product') {
      lObj.product
        ? allProductAjax(lObj.product)
        : dealList([], $('#s-goods-group .right'))
    }
    // 调用接口，刷新表单
  })

  function chejiaAjax(no, callback) {
    jq.post(
      window.vinnoGetUrl,
      {
        vinno: no,
      },
      function (data) {
        if (data.code == 1 && data.data != '') {
          var html = '<option value="">请选择国家</option>'
          var info = data.data
          if (!info.bianshi.id) {
            layer.open({
              title: '提示',
              content: '无效车架号',
            })
          } else {
            callback({
              car_data_id: info.car_data_id,
              zhizaoshang: info.zhizaoshang.id,
              xinghao: info.chelian.id,
              chelian: info.xinghao.id,
              bianshi: info.bianshi.id,
            })
          }
        }
        form.render('select')
      }
    )
  }

  function peijianAjax(no) {
    jq.post(
      window.OeGetUrl,
      {
        OE_number: no,
      },
      function (data) {
        if (data.code == 1 && data.data != '') {
          var info = data.data
          console.log(info)
          if (info.length == 0) {
            layer.open({
              title: '提示',
              content: '暂无相关配件号',
            })
          } else {
            dealList(
              (info || []).reduce(function (pre, cur) {
                pre.push(...(cur || []))
                return pre
              }, []),
              $('#s-goods-group .right')
            )
          }
        }
        form.render('select')
      }
    )
  }

  function dealSelectData(info, dom, selectId) {
    var html = dom.children()[0].outerHTML
    for (var i = 0; i < info.length; i++) {
      console.log(dom, info[i].id, selectId)
      if (selectId && info[i].id == selectId) {
        html +=
          "<option value='" +
          info[i].id +
          "' selected>" +
          (info[i].name || info[i].product_group || info[i].full_name) +
          '</option>'
      } else {
        html +=
          "<option value='" +
          info[i].id +
          "'>" +
          (info[i].name || info[i].product_group || info[i].full_name) +
          '</option>'
      }
    }
    dom.html(html)
    form.render('select')
  }

  function dealList(info, dom) {
    var html = ''
    for (var i = 0; i < info.length; i++) {
      var item = info[i]
      console.log(item)
      var cHtml = ''
      for (var x = 0; x < item.attribute.length; x++) {
        var cItem = item.attribute[x]
        cHtml += `
            <div class="t-item">
              <span class="name">${cItem.attribute_name}：</span>
              <span class="desc">${cItem.attribute_value}</span>
            </div>`
      }
      var urls = (item.img_list || []).concat(item.image)
      var imgs = urls.reduce(function (pre, cur) {
        pre += `<img layer-pid="" layer-src="${cur}" src="${cur}" alt="">`
        return pre
      }, '')
      html += `<div class="g-item">
        <div class="img" id="look-imgs-${item.id}" onClick="showPic('look-imgs-${item.id}')">${imgs}</div>
        <div class="info">
          <a class="title" href="javascript:void(0);">
            <span>${item.identifier}</span>
            <span>(${item.product_group})</span>
          </a>
          <div class="t-item-group">${cHtml}</div>
        </div>
      </div>`
    }
    dom.html(html)
    for (var i = 0; i < info.length; i++) {
      var item = info[i]
      showPic('look-imgs-' + item.id)
    }
  }

  function zhizaoshangAjax(zhizaoshangId) {
    jq.post(
      window.getZhizaoshangUrl,
      {
        // querycar_type: [1, 0, 2][getQueryString("querycar_type") || 0],
        querycar_type: getQueryString('querycar_type') || 0,
        region_id: $('#region0 option[selected]').val(),
      },
      function (data) {
        if (data.code == 1 && data.data != '') {
          dealSelectData(data.data, $('#zhizaoshang'), zhizaoshangId)
        }
      }
    )
  }
  function otherAjax(type, id, selectId) {
    jq.post(
      window.getChildrenUrl,
      {
        pid: id,
      },
      function (data) {
        if (data.code == 1 && data.data != '') {
          if (type == 'xinghao') {
            dealSelectData(data.data, $('#xinghao'), selectId)
          }
          if (type == 'cheliang') {
            dealSelectData(data.data, $('#cheliang'), selectId)
          }
          if (type == 'bianshi') {
            dealSelectData(data.data, $('#bianshi'), selectId)
          }
        }
      }
    )
  }
  function getAllInfo(id, selectId, callback) {
    jq.post(
      window.getAllInfoUrl,
      {
        zhizaoshang_id: id,
      },
      function (data) {
        if (data.code == 1 && data.data != '') {
          dealSelectData(data.data, $('#cheliang'), selectId)
          allData = data.data || []
          callback && callback()
        }
      }
    )
  }
  function productAjax(id) {
    jq.post(
      window.getProductUrl,
      {
        prodata_id: id,
      },
      function (data) {
        if (data.code == 1 && data.data != '') {
          dealSelectData(data.data, $('#product'))
        }
      }
    )
  }
  function allProductAjax(id) {
    jq.post(
      window.allProductUrl,
      {
        product_id: id,
      },
      function (data) {
        if (data.code == 1 && data.data != '') {
          console.log(data.data)
          dealList(data.data, $('#s-goods-group .right'))
        }
      }
    )
  }
})

function showPic(idName) {
  layer.photos({
    photos: '#' + idName,
    anim: 5,
  })
}
