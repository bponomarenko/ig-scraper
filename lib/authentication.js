import http from './utils/http'
import state from './utils/state'

function saveUserId(res) {
  let userId = res.cookies.ds_user_id
  let oldUserId = state.get('userId')

  if(!userId || userId !== oldUserId) {
    state.reset()
    state.set('userId', userId)
  }
  return userId
}

function login(username, password) {
  return http.post('/accounts/login/ajax/', { username, password })
    .then(({res, body}) => {
      saveUserId(res)
      state.set('userName', body.user)
    })
}

function checkIsAuthenticated() {
  return http.get().then(({res, body}) => !!saveUserId(res))
}

function authenticate(username, password) {
  return checkIsAuthenticated()
    .then(isAuthenticated => isAuthenticated ? Promise.resolve() : login(username, password))
}

export {
  checkIsAuthenticated,
  authenticate
}
