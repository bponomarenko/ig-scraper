import query from './utils/query';
import debug from './utils/debug';

function list(userId, count = 10, cursor = '') {
  debug(`Getting ${count} followers of user with id ${userId}`);

  const params = {
    type: 'followed_by',
    count,
    cursor,
    nodes: [
      'id',
      'full_name',
      'username'
    ],
    ref: 'relationships::follow_list'
  };

  return query(userId, params).then(({res, body}) => body.followed_by);
}

export default {
  list
}
