import query from './utils/query';
import http from './utils/http';
import state from './utils/state';
import debug from './utils/debug';
import { throwError } from './utils/error';

function list(userId, count = 10) {
  debug(`Getting ${count} latest media of @${userId}`);

  const params = {
    type: 'media',
    count,
    nodes: [
      'id',
      'likes { count }'
    ],
    ref: 'users::show'
  };
  return query(userId, params).then(({res, body}) => body.media);
}

function like(mediaId) {
  debug(`Like media with id ${mediaId}`);

  return http.post(`/web/likes/${mediaId}/like/`)
    .then(({res, body}) => {
      if(!body.status === 'ok') {
        throwError(`Unable to like media ${mediaId}: ${body}`);
      }
    });
}

function unlike(mediaId) {
  debug(`Unlike media with id ${mediaId}`);

  return http.post(`/web/likes/${mediaId}/unlike/`)
    .then(({res, body}) => {
      if(!body.status === 'ok') {
        throwError(`Unable to unlike media ${mediaId}: ${body}`)
      }
    });
}

export default {
  list,
  like,
  unlike
}
