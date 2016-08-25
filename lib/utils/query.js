import http from './http'
import state from './state'
import {createError} from './error'

function query(username, options) {
  const userId = state.get(options.username, 'id')
  if(!userId) return Promise.reject(createError('Not Authenticated: missing userId', 401))

  const parts = ['count', 'page_info { end_cursor, has_next_page }'];

  if(options.nodes) {
    parts.push(`nodes{${options.nodes.join(',')}}`)
  }

  const q = `
    ig_user(${userId}) {
      ${options.type}.first(${options.count}) {
        ${parts.join(',')}
      }
    }`

  return http.post(username, '/query/', { q, ref: options.ref })
}

export default query
