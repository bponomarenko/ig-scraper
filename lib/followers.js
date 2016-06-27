import query from './utils/query'
import state from './utils/state'

function get(userId, count = 10) {
  const params = {
    type: 'followed_by',
    userId,
    count,
    nodes: [
      'id',
      'full_name',
      'username'
    ],
    ref: 'relationships::follow_list'
  }
  return query(params).then(({res, body}) => body.followed_by)
}

export default {
  get,
  self: count => get(state.get('userId'), count)
}
