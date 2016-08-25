import query from './utils/query'
import http from './utils/http'
import state from './utils/state'
import debug from './utils/debug'
import {throwError} from './utils/error'

function list(username, count = 10) {
  debug(`Getting ${count} latest media of @${username}`)

  const params = {
    type: 'media',
    username,
    count,
    nodes: [
      'id',
      'likes { count }'
    ],
    ref: 'users::show'
  }
  return query(params).then(({res, body}) => body.media)
}

function like(username, mediaId) {
  debug(`Like media with id ${mediaId} for @${username}`)

  return http.post(username, `/web/likes/${mediaId}/like/`)
    .then(({res, body}) => {
      if(!body.status === 'ok') {
        throwError(`Unable to like media ${mediaId}: ${body}`)
      }
    })
}

function unlike(username, mediaId) {
  debug(`Unlike media with id ${mediaId} for @${username}`)

  return http.post(username, `/web/likes/${mediaId}/unlike/`)
    .then(({res, body}) => {
      if(!body.status === 'ok') {
        throwError(`Unable to unlike media ${mediaId}: ${body}`)
      }
    })
}

export default {
  list,
  like,
  unlike
}
