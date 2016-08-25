import query from './utils/query'
import state from './utils/state'
import debug from './utils/debug'

function list(username, count = 10) {
  debug(`Getting ${count} followings of @${username}`)

  const params = {
    type: 'follows',
    username,
    count,
    nodes: [
      'id',
      'full_name',
      'username'
      // 'is_verified',
      // 'is_private',
      // 'followed_by_viewer',
      // 'requested_by_viewer',
      // 'profile_pic_url',
    ],
    ref: 'relationships::follow_list'
  }
  return query(params).then(({res, body}) => body.follows)
}

export default {
  list
}
