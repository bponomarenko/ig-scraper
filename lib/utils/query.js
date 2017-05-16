import http from './http';
import state from './state';
import { createError } from './error';

function query(userId, options) {
  if(!userId) {
    return Promise.reject(createError('Not Authenticated: missing userId', 401));
  }

  const parts = ['count', 'page_info { end_cursor, has_next_page }'];

  if(options.nodes) {
    parts.push(`nodes{${options.nodes.join(',')}}`);
  }

  const count = options.cursor ? `after(${options.cursor}, ${options.count})` : `first(${options.count})`;
  const q = `ig_user(${userId}) {
    ${options.type}.${count} {
      ${parts.join(',')}
    }
  }`;

  return http.post('/query/', { q, ref: options.ref });
}

export default query;
