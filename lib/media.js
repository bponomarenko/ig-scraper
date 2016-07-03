import query from './utils/query'
import http from './utils/http'
import state from './utils/state'
import {throwError} from './utils/error'

function get(userId, count = 10) {
  const params = {
    type: 'media',
    userId,
    count,
    nodes: [
      'id',
      'likes { count }'
    ],
    ref: 'users::show'
  }
  return query(params).then(({res, body}) => body.media)
}

function like(mediaId) {
  return http.post(`/web/likes/${mediaId}/like/`)
    .then(({res, body}) => {
      if(!body.status === 'ok')
        console.log(body)
        throwError(`Unable to like media ${mediaId}`)
    })
}

export default {
  get,
  like,
  self: count => get(state.get('userId'), count)
}
