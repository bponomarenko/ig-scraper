import http from './utils/http'
import state from './utils/state'
import debug from './utils/debug'
import { throwError } from './utils/error'

function get(username) {
  debug(`Getting user data for @${username}`)

  return http.get(username, `/${username}/?__a=1`)
    .then(({res, body}) => body.user)
}

export default {
  get
}
