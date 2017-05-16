import url from 'url';
import needle from 'needle';

import state from './state';
import debug from './debug';
import { throwError } from './error';

const baseUrl = 'https://www.instagram.com';

function getOptions() {
  const cookies = state.get('cookies', {});
  return {
    cookies: cookies,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
      'Referer': 'https://www.instagram.com/',
      'X-CSRFToken': cookies.csrftoken || ''
    },
    follow: 1
  };
}

function checkResponse(err, res, body) {
  if(err) {
    throwError('Network error', res.statusCode, err);
  }

  if(res.statusCode !== 200) {
    throwError((body && body.message) || res.statusMessage, res.statusCode);
  }

  if(Object.keys(res.cookies || {}).length) {
    let cookies = state.get('cookies', {});
    Object.assign(cookies, res.cookies);
    state.set('cookies', cookies);
  }
}

function get(path = '') {
  const fullPath = url.resolve(baseUrl, path);

  debug(`GET ${fullPath}`);

  return new Promise((resolve, reject) => {
    needle.get(fullPath, getOptions(), (err, res, body) => {
      try{
        checkResponse(err, res, body);
      }catch(error){
        reject(error);
        return;
      }

      resolve({res, body});
    })
  })
}

function post(path = '', form) {
  const fullPath = url.resolve(baseUrl, path);

  debug(`POST ${fullPath}`);

  return new Promise((resolve, reject) => {
    needle.post(fullPath, form, getOptions(), (err, res, body) => {
      try{
        checkResponse(err, res, body);
      }catch(error){
        reject(error);
        return;
      }

      resolve({res, body});
    });
  });
}

export default {get, post}
