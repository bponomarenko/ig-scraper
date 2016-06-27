import url from 'url'
import needle from 'needle'
import state from './state'
import { throwError } from './error'

const baseUrl = 'https://www.instagram.com'
let cookies = {}
let csrftoken

function getOptions() {
  return {
    cookies: cookies,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
      'Referer': 'https://www.instagram.com/',
      'X-CSRFToken': csrftoken || ''
    }
  }
}

function checkResponse(err, res, body) {
  if(err) throwError('Network error', res.statusCode, err)
  if(res.statusCode !== 200) throwError((body && body.message) || res.statusMessage, res.statusCode)

  if(Object.keys(res.cookies || {}).length) {
    Object.assign(cookies, res.cookies)

    if(res.cookies.csrftoken) {
      csrftoken = res.cookies.csrftoken
    }
  }
}

function get(path = '') {
  return new Promise((resolve, reject) => {
    needle.get(url.resolve(baseUrl, path), getOptions(), (err, res, body) => {
      try{
        checkResponse(err, res, body)
      }catch(error){
        reject(error)
        return;
      }

      resolve({res, body})
    })
  })
}

function post(path = '', form) {
  return new Promise((resolve, reject) => {
    needle.post(url.resolve(baseUrl, path), form, getOptions(), (err, res, body) => {
      try{
        checkResponse(err, res, body)
      }catch(error){
        reject(error)
        return;
      }

      resolve({res, body})
    })
  })
}

export default {get, post}
