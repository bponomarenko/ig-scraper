let state = {}

function reset() {
  state = {}
}

function set(key, value) {
  if(value) {
    state[key] = value;
  } else {
    delete state[key];
  }
}

function get(key, defaultValue) {
  return key in state ? state[key] : defaultValue
}

export default {set, get, reset}
