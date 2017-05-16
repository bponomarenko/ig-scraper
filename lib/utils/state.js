const state = new Map();

function set(key, value) {
  if (value) {
    state.set(key, value);
  } else if (state.has(key)) {
    state.delete(key);
  }
}

function get(key, defaultValue) {
  return state.has(key) ? state.get(key) : defaultValue;
}

export default { set, get }
