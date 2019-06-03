// jsonp 的封装，返回一个promise对象

import originJSONP from 'jsonp'

function jsonp (url, data, options) {
  url += (url.indexOf('?') > -1 ? '&' : '?') + buildUrl(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, options, (err, data) => {
      if(!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function buildUrl (data) {
  let url = ''
  for (let key in data) {
    url += `&${key}=${data[key]}`
  }
  return url.substr(1)
}

// substr 与 substring 的用法以及区别