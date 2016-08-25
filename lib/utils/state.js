let state = {}

function set(username, key, value) {
  if(username) {
    const userState = state[username] = state[username] || {}

    if(value) {
      userState[key] = value;
    } else {
      delete userState[key];
    }
  } else {
    delete state[username]
  }
}

function get(username, key, defaultValue) {
  const userState = state[username] || {}
  return key in userState ? userState[key] : defaultValue
}

export default {set, get}
