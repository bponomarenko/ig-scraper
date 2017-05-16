import http from './utils/http';
import debug from './utils/debug';

function get(username) {
  debug(`Getting user data for @${username}`);

  return http.get(`/${username}/?__a=1`)
    .then(({res, body}) => body.user);
}

export default {
  get
}
