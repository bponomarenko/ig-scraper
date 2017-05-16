import query from './utils/query';
import debug from './utils/debug';

function list(userId, count = 10) {
  debug(`Getting ${count} followings of @${userId}`);

  const params = {
    type: 'follows',
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
  };

  return query(userId, params).then(({res, body}) => body.follows);
}

export default {
  list
}
