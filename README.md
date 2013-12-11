# Keyvent.js #
##### Keyboard events simulator. #####

[![Build Status](https://travis-ci.org/gtramontina/keyvent.js.png?branch=master)](https://travis-ci.org/gtramontina/keyvent.js)

### Examples
Simulate 'keydown' events on the 'document' element:

    keyvent.down(13); // You can use key codes...
    keyvent.down('enter'); // ... a few alias...
    keyvent.down('shift a'); // ... combination of keys...
    keyvent.down('⇧ a'); // ... and some sugar!

The same is valid for simulating 'keyup' events:

    keyvent.up(13);
    keyvent.up('enter');
    keyvent.up('shift a');
    keyvent.up('⇧ a');

If you want to simulate keyboard events on other DOM elements, you have to set a new context (please note that the 'on' function takes a raw DOM element as parameter):

    var headerDiv = document.getElementById('headerDiv');
    keyvent.on(headerDiv).down('control');

You may want to keep a copy of this context to use later:

    var headerDivKeyboard = keyvent.on(headerDiv);
    (...)
    headerDivKeyboard.up('space');


The following aliases are supported (borrowed from [https://github.com/madrobby/keymaster](https://github.com/madrobby/keymaster)):
`⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, `⌘`, `backspace`, `tab`, `clear`, `enter`, `return`, `esc`, `escape`, `space`, `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `del`, `delete`, and `f1` through `f19`.

#### Notes
* The initial intent of this lib is to support testing, but you can find a better usage for it. :-)
* If you are using AMD (e.g. require.js) this lib becomes a module. Otherwise it'll create a global `keyvent`.

### Browser Compatibility
I've ran the tests in Chrome and Firefox.
If you find any incompatibility or want to support other browsers, please do a pull request with the fix! :-)

### License
This is licensed under the feel-free-to-do-whatever-you-want-to-do license.