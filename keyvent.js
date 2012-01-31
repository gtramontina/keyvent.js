!(function(moduleName, definition) {
  // Whether to expose Draggable as an AMD module or to the global object.
  if (typeof define === 'function' && typeof define.amd === 'object') define(definition);
  else this[moduleName] = definition();

})('keyvent', function definition() {

  function contextOn(element) {
    var exports = {};
    exports.on = contextOn;

    exports.down = function(keys) {
      dispatch(element, 'keydown', keys);
    };

    exports.up = function(keys) {
      dispatch(element, 'keyup', keys);
    };

    return exports;
  }

  function dispatch(element, type, keys) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    keys = normalizeKeys(keys);
    for (var i = 0; i < keys.length; i++) {
      var keyCode = toKeyCode(keys[i])
      event.which = keyCode;
      MODIFIERS[keyCode] && (event[MODIFIERS[keyCode] + 'Key'] = true);
      element.dispatchEvent(event);
    };
  }

  function normalizeKeys(keys) {
    if (!keys) return [0];
    if (isString(keys)) return keys.split(' ');
    return [keys];
  }

  function isString(object) {
    return typeof object === 'string';
  }

  // Borrowed from https://github.com/madrobby/keymaster
  var ALIASES = {
    '⇧': 16, 'shift': 16,
    '⌃': 17, 'ctrl': 17, 'control': 17,
    '⌥': 18, 'alt': 18, 'option': 18,
    '⌘': 91, 'command': 91,
    'backspace': 8, 'tab': 9,
    'clear': 12, 'enter': 13,
    'return': 13, 'esc': 27,
    'escape': 27, 'space': 32,
    'left': 37, 'up': 38,
    'right': 39, 'down': 40,
    'del': 46, 'delete': 46,
    'home': 36, 'end': 35,
    'pageup': 33, 'pagedown': 34,
    ',': 188, '.': 190,
    '/': 191, '`': 192,
    '-': 189, '=': 187,
    ';': 186, '\'': 222,
    '[': 219, ']': 221,
    '\\': 220
  };
  for (key = 1; key < 20; key++) ALIASES['f' + key] = ALIASES['F' + key] = 111 + key;

  var MODIFIERS = {
    '16': 'shift',
    '17': 'ctrl',
    '18': 'alt',
    '91': 'meta'
  };

  function toKeyCode(key) {
    if (isString(key)) return ALIASES[key] || key.toUpperCase().charCodeAt(0);
    return key;
  }

  return contextOn(document);
});