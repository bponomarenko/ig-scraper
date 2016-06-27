import http from './http'
import state from './state'
import {createError} from './error'

function query(options) {
  if(!state.get('userId')) return Promise.reject(createError('Not authenticated (missing userId)', 401))

  const parts = ['count', 'page_info { end_cursor, has_next_page }'];

  if(options.nodes) {
    parts.push(`nodes{${options.nodes.join(',')}}`)
  }

  const q = `
    ig_user(${options.userId}) {
      ${options.type}.first(${options.count}) {
        ${parts.join(',')}
      }
    }`

  // console.log(q)
  return http.post('/query/', { q, ref: options.ref })
}

export default query
