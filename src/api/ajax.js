import axios from 'axios'
import util from '@/utils/util.js'
// ----------------------------------------------------------------
// 开始动画
export default function ajax (url = '', params = {}, type = 'GET') {
	let promise
  return new Promise((resolve, reject) => {
    // 设置headers
    var headers={
      // 'k': '58c273b8747042d6e4ab1755d87a9181',// zhuan ji
      // 'u': '6d965efe4cb09a048967739d6fd16a29',

      // // 拜耳企业
      // 'k': '2d001adc288acf01f432a157ec482dc7',// zhuan ji
      // 'u': 'e58510f6b68148c721a76f82e6008c0f',
       'u':util.getCookie('UserID') ? util.getCookie('UserID'): util.getCookie('u'),
       'k':util.getCookie('token') ? util.getCookie('token'): util.getCookie('k'), 
       'Content-Type': 'application/json'
    }
    if (type === 'GET') {
      let paramsStr = ''
      // 拼接请求字符串
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&'
      })
      // 处理最后一个&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
      }
      // 完整路径
      url += '?' + paramsStr
      promise = axios.get(url,{headers})
    } else if (type === 'POST') {
      promise = axios.post(url, params, {headers})
    }
    // 返回请求数据
    promise.then(reqponse => {
      resolve(reqponse.data)
    }).catch(error => {
      reject(error)
      // Message({
      //   message: '数据库连接失败',
      //   type: 'error'
      // })
    })
  })
}
