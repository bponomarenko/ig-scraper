import query from './utils/query'
import state from './utils/state'
import debug from './utils/debug'

function list(username, count = 10) {
  debug(`Getting ${count} followers of @${username}`)

  const params = {
    type: 'followed_by',
    username,
    count,
    nodes: [
      'id',
      'full_name',
      'username',
      'date',
      'followed_date',
      'follows_date',
      'follows_since',
      'followed_since',
      'follows'
    ],
    ref: 'relationships::follow_list'
  }
  return query(params).then(({res, body}) => body.followed_by)
}

export default {
  list
}
