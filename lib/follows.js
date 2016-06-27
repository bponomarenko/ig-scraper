import query from './utils/query'
import state from './utils/state'

function get(userId, count = 10) {
  const params = {
    type: 'follows',
    userId,
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
  get,
  self: count => get(state.get('userId'), count)
}
