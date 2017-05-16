import http from './utils/http';
import state from './utils/state';
import debug from './utils/debug';
import { throwError } from './utils/error';

function saveUserId(res) {
  const userId = res.cookies.ds_user_id;
  if (userId && state.get('id') !== userId) {
    debug(`Saved new user id: ${userId}`);
    state.set('id', userId);
  }
  return userId;
}

function authenticate(username, password) {
  return http.post('/accounts/login/ajax/', { username, password })
    .then(({res, body}) => {
      if(!body.authenticated) {
        throwError(`Authentication for user ${username} failed`, 401);
      }

      saveUserId(res);
      debug(`@${username} logged in!`);
    });
}

function isLoggedIn(username) {
  return http.get().then(({res, body}) => !!saveUserId(res))
}

function login(username, password) {
  debug(`Logging in ${username}...`);

  return isLoggedIn(username)
    .then(isLoggedIn => isLoggedIn ? null : authenticate(username, password));
}

function getUserId() {
  return state.get('id');
}

export {
  login,
  isLoggedIn,
  getUserId
}
