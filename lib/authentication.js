import http from './utils/http'
import state from './utils/state'
import {throwError} from './utils/error'
import debug from './utils/debug'

function saveUserId(res, username) {
  let userId = res.cookies.ds_user_id
  if(userId) {
    state.set(username, 'id', userId)
    debug(`Saved new @${username} id: ${userId}`)
  }
  return userId
}

function authenticate(username, password) {
  return http.post(username, '/accounts/login/ajax/', { username, password })
    .then(({res, body}) => {
      if(!body.authenticated) throwError(`Authentication for user ${body.user} failed`, 401)

      saveUserId(res, username)
      debug(`Authenticated @${username}!`)
    })
}

function checkIsAuthenticated(username) {
  return http.get(username).then(({res, body}) => !!saveUserId(res, username))
}

function login(username, password) {
  debug(`Logging in ${username}...`)

  return checkIsAuthenticated(username)
    .then(isAuthenticated => isAuthenticated ? Promise.resolve() : authenticate(username, password))
}

function logout(username) {
  debug(`Logging out ${username}... (not implemented yet)`)
}

export {
  login,
  logout
}
