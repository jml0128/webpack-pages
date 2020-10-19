;(function () {
  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  }
  layui.use(['layer', 'element', 'jquery', 'form'], function () {
    var layer = layui.layer
    var element = layui.element
    var jq = layui.jquery
    var querycar_type = getQueryString('querycar_type') || 0
    var form = layui.form
    var content = '<b>如何找到车辆识别号</b>'
    content += '<p>· 门标签</p>'
    content += '<p>· 挡风玻璃车辆识别码板</p>'
    content += '<p>· 车辆标题文件</p>'

    var obj = {
      querycar_type: getQueryString('querycar_type'),
      city: getQueryString('city'),
      chejia: getQueryString('chejia'),
      peijian: getQueryString('peijian'),
    }
    $($('.layui-tab-title li')[getQueryString('querycar_type') || 0]).addClass(
      'layui-this'
    )
    $(
      $('.layui-tab-content>.layui-tab-item')[
        getQueryString('querycar_type') || 0
      ]
    ).addClass('layui-show')
    $(".layui-show select[name='city']").val(getQueryString('city'))
    $(".layui-show input[name='chejia']").val(getQueryString('chejia'))
    $(".layui-show input[name='peijian']").val(getQueryString('peijian'))
    form.render('select')

    window.searchObj = obj

    $("input[name='chejia']").hover(
      function () {
        layer.tips(content, ".layui-show input[name='chejia']", {
          tips: [1, '#101075'],
          time: 10000,
        })
      },
      function () {
        layer.closeAll()
      }
    )

    var content1 = '<b>请输入配件OE号</b>'

    $("input[name='peijian']").hover(
      function () {
        layer.tips(content1, ".layui-show input[name='peijian']", {
          tips: [1, '#101075'],
          time: 10000,
        })
      },
      function () {
        layer.closeAll()
      }
    )

    $(".layui-show button[name='chejia']").bind('click', function () {
      var x = $(".layui-show input[name='chejia']").val()
      if (x.replace(/ /g, '').length == 0) {
        layer.open({
          title: '提示',
          content: '请输入车架号',
        })
        return
      }
      var obj = {
        querycar_type: querycar_type,
        city: $(".layui-show select[name='city']").val(),
        chejia: $(".layui-show input[name='chejia']").val(),
      }
      var str = '?'
      for (var i in obj) {
        if ((obj[i] + '').length > 0) {
          str = str + i + '=' + obj[i] + '&'
        }
      }
      window.location.href = '/index/Productsearch' + str
    })
    $(".layui-show button[name='peijian']").bind('click', function () {
      var x = $(".layui-show input[name='peijian']").val()
      if (x.replace(/ /g, '').length == 0) {
        layer.open({
          title: '提示',
          content: '请输入配件号',
        })
        return
      }
      var obj = {
        querycar_type: querycar_type,
        city: $(".layui-show select[name='city']").val(),
        peijian: $(".layui-show input[name='peijian']").val(),
      }
      var str = '?'
      for (var i in obj) {
        if ((obj[i] + '').length > 0) {
          str = str + i + '=' + obj[i] + '&'
        }
      }
      window.location.href = '/index/Productsearch' + str
    })
    $(".layui-show button[name='chexing']").bind('click', function () {
      var obj = {
        querycar_type: querycar_type,
        city: $(".layui-show select[name='city']").val(),
      }
      var str = '?'
      for (var i in obj) {
        if ((obj[i] + '').length > 0) {
          str = str + i + '=' + obj[i] + '&'
        }
      }
      window.location.href = '/index/Productsearch' + str
    })

    element.on('tab(cartab)', function () {
      //0:乘用车,1:商用车 2:叉车
      console.log(this.getAttribute('lay-id'))
      querycar_type = this.getAttribute('lay-id')
      window.location.href =
        '/index/Productsearch?querycar_type=' +
        querycar_type +
        '&city=' +
        $('#region0 option[selected]').val()
      // queryRegion();
    })
    form.on('select(s1)', function (data) {
      var lObj = {}
      if ((data.value + '').length > 0) {
        lObj[$(data.elem).attr('name')] = data.value
      } else {
        delete lObj[$(data.elem).attr('name')]
      }
      var domId = $(data.elem).attr('class')
      if (domId == 'region') {
        if (
          /^(\/index){0,}[\/|(\.html)]{0,}$/g.test(window.location.pathname)
        ) {
          var obj = {
            querycar_type: querycar_type,
            city: $(".layui-show select[name='city']").val(),
          }
          var str = '?'
          for (var i in obj) {
            if ((obj[i] + '').length > 0) {
              str = str + i + '=' + obj[i] + '&'
            }
          }
          window.location.href = '/index/Productsearch' + str
        }
      }
      // 调用接口，刷新表单
    })

    window.queryRegion = function (callback) {
      console.log(querycar_type)
      jq.post(
        window.queryRegionUrl,
        {
          // querycar_type: [1, 0, 2][querycar_type],
          querycar_type: querycar_type,
        },
        function (data) {
          if (data.code == 1 && data.data != '') {
            var html = '<option value="">请选择国家</option>'
            var info = data.data
            for (var i = 0; i < info.length; i++) {
              if (info[i].id == getQueryString('city')) {
                html +=
                  "<option value='" +
                  info[i].id +
                  "' selected>" +
                  info[i].name +
                  '</option>'
              } else {
                if (info[i].name == '中国') {
                  html +=
                    "<option value='" +
                    info[i].id +
                    "' selected>" +
                    info[i].name +
                    '</option>'
                } else {
                  html +=
                    "<option value='" +
                    info[i].id +
                    "'>" +
                    info[i].name +
                    '</option>'
                }
              }
            }

            jq('#region' + querycar_type).html(html)
          }
          form.render('select')
          callback && callback()
        }
      )
    }
  })
})()
