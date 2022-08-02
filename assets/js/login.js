// 点击去注册账号让 登录框隐藏，注册框显示
$('#link_reg').on('click', function () {
  $('.login-box').hide()
  $('.reg-box').show()
})
// 点击去登录让 注册框隐藏，登录框显示
$('#link_login').on('click', function () {
  $('.login-box').show()
  $('.reg-box').hide()
})

const form = layui.form
const baseUrl = 'http://www.liulongbin.top:3007'
const layer = layui.layer
form.verify({
  // 自定义一个叫 pwd 的校验规则
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  // 校验两次密码是否一致的规则
  repass: (val) => {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 然后进行一次等于的判断
    // 如果判断失败,则return一个提示消息即可
    const pwd = $('.reg-box [name=password').val()
    if (pwd !== val) return '两次密码不一致'
  },
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
})

$('#form_reg').on('submit', function (e) {
  //阻止默认提交行为
  e.preventDefault()
  //获取data
  const data = $(this).serialize()
  $.ajax({
    type: 'POST',
    url:  '/api/reguser',
    data,
    success: (res) => {
      const { status, message } = res
      if (status !== 0) return layer.msg(message)
      $('#link_login').click()
    },
  })
})

$('#form_login').on('submit', function (e) {
  //阻止默认提交行为
  e.preventDefault()
  const data = $(this).serialize()
//   console.log(data)
  $.ajax({
    type: 'POST',
    url:  '/api/login',
    data,
    success: (res) => {
      const {status, message,token} = res
      if(status !== 0) return layer.msg(message)
       // 将登录成功得到的 token 字符串，保存到 localStorage 中
       localStorage.setItem("token", token);
       // 跳转到主页
       location.href = "/index.html";
    },
  })
})
