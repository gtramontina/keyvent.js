describe('Keyvent.js', function() {

    describe('when sending the "keydown" event', function() {

        it('should trigger on the "document" by default', function(done) {
            addKeyDownListener(document, eventListenerStub(done));
            keyvent.down();
        });

        it('should trigger on a specific element', function(done) {
            var headerDiv = createElement();
            addKeyDownListener(headerDiv, eventListenerStub(done));
            keyvent.on(headerDiv).down();
        });

        describe('and setting the "keycode"', function() {            
            var keyDownListener;
            beforeEach(function() {
                keyDownListener = eventListenerStub();
                addKeyDownListener(document, keyDownListener);
            });

            it('when it is a code, should set it directly on the event object', function() {
                keyvent.down(13);
                expect(keyDownListener.lastEvent.which).to.be(13);
            });

            it('when it is a character, should convert into a code then set it on the event object', function() {
                expectKeyConvertsToCodeWhenKeyDown('R', 82);
                expectKeyConvertsToCodeWhenKeyDown('r', 82);
            });

            describe('when it is an alias, should convert into a code then set it on the event object', function() {
                
                it('shift', function() {
                    expectKeyConvertsToCodeWhenKeyDown('shift', 16);
                    expectKeyConvertsToCodeWhenKeyDown('⇧', 16);
                });

                it('control', function() {
                    expectKeyConvertsToCodeWhenKeyDown('ctrl', 17);
                    expectKeyConvertsToCodeWhenKeyDown('control', 17);
                    expectKeyConvertsToCodeWhenKeyDown('⌃', 17);
                });

                it('alt', function() {
                    expectKeyConvertsToCodeWhenKeyDown('alt', 18);
                    expectKeyConvertsToCodeWhenKeyDown('option', 18);
                    expectKeyConvertsToCodeWhenKeyDown('⌥', 18);
                });

                it('command', function() {
                    expectKeyConvertsToCodeWhenKeyDown('command', 91);
                    expectKeyConvertsToCodeWhenKeyDown('⌘', 91);
                });

                it('Function Keys (F1..F19)', function() {
                    expectKeyConvertsToCodeWhenKeyDown('f1', 112); expectKeyConvertsToCodeWhenKeyDown('F1', 112);
                    expectKeyConvertsToCodeWhenKeyDown('f2', 113); expectKeyConvertsToCodeWhenKeyDown('F2', 113);
                    expectKeyConvertsToCodeWhenKeyDown('f3', 114); expectKeyConvertsToCodeWhenKeyDown('F3', 114);
                    expectKeyConvertsToCodeWhenKeyDown('f4', 115); expectKeyConvertsToCodeWhenKeyDown('F4', 115);
                    expectKeyConvertsToCodeWhenKeyDown('f5', 116); expectKeyConvertsToCodeWhenKeyDown('F5', 116);
                    expectKeyConvertsToCodeWhenKeyDown('f6', 117); expectKeyConvertsToCodeWhenKeyDown('F6', 117);
                    expectKeyConvertsToCodeWhenKeyDown('f7', 118); expectKeyConvertsToCodeWhenKeyDown('F7', 118);
                    expectKeyConvertsToCodeWhenKeyDown('f8', 119); expectKeyConvertsToCodeWhenKeyDown('F8', 119);
                    expectKeyConvertsToCodeWhenKeyDown('f9', 120); expectKeyConvertsToCodeWhenKeyDown('F9', 120);
                    expectKeyConvertsToCodeWhenKeyDown('f10', 121); expectKeyConvertsToCodeWhenKeyDown('F10', 121);
                    expectKeyConvertsToCodeWhenKeyDown('f11', 122); expectKeyConvertsToCodeWhenKeyDown('F11', 122);
                    expectKeyConvertsToCodeWhenKeyDown('f12', 123); expectKeyConvertsToCodeWhenKeyDown('F12', 123);
                    expectKeyConvertsToCodeWhenKeyDown('f13', 124); expectKeyConvertsToCodeWhenKeyDown('F13', 124);
                    expectKeyConvertsToCodeWhenKeyDown('f14', 125); expectKeyConvertsToCodeWhenKeyDown('F14', 125);
                    expectKeyConvertsToCodeWhenKeyDown('f15', 126); expectKeyConvertsToCodeWhenKeyDown('F15', 126);
                    expectKeyConvertsToCodeWhenKeyDown('f16', 127); expectKeyConvertsToCodeWhenKeyDown('F16', 127);
                    expectKeyConvertsToCodeWhenKeyDown('f17', 128); expectKeyConvertsToCodeWhenKeyDown('F17', 128);
                    expectKeyConvertsToCodeWhenKeyDown('f18', 129); expectKeyConvertsToCodeWhenKeyDown('F18', 129);
                    expectKeyConvertsToCodeWhenKeyDown('f19', 130); expectKeyConvertsToCodeWhenKeyDown('F19', 130);
                });

                it('other keys', function() {
                    expectKeyConvertsToCodeWhenKeyDown('backspace', 8);
                    expectKeyConvertsToCodeWhenKeyDown('tab', 9);
                    expectKeyConvertsToCodeWhenKeyDown('clear', 12);
                    expectKeyConvertsToCodeWhenKeyDown('enter', 13);
                    expectKeyConvertsToCodeWhenKeyDown('return', 13);
                    expectKeyConvertsToCodeWhenKeyDown('esc', 27);
                    expectKeyConvertsToCodeWhenKeyDown('escape', 27);
                    expectKeyConvertsToCodeWhenKeyDown('space', 32);
                    expectKeyConvertsToCodeWhenKeyDown('left', 37);
                    expectKeyConvertsToCodeWhenKeyDown('up', 38);
                    expectKeyConvertsToCodeWhenKeyDown('right', 39);
                    expectKeyConvertsToCodeWhenKeyDown('down', 40);
                    expectKeyConvertsToCodeWhenKeyDown('del', 46);
                    expectKeyConvertsToCodeWhenKeyDown('delete', 46);
                    expectKeyConvertsToCodeWhenKeyDown('home', 36);
                    expectKeyConvertsToCodeWhenKeyDown('end', 35);
                    expectKeyConvertsToCodeWhenKeyDown('pageup', 33);
                    expectKeyConvertsToCodeWhenKeyDown('pagedown', 34);
                    expectKeyConvertsToCodeWhenKeyDown(',', 188);
                    expectKeyConvertsToCodeWhenKeyDown('.', 190);
                    expectKeyConvertsToCodeWhenKeyDown('/', 191);
                    expectKeyConvertsToCodeWhenKeyDown('`', 192);
                    expectKeyConvertsToCodeWhenKeyDown('-', 189);
                    expectKeyConvertsToCodeWhenKeyDown('=', 187);
                    expectKeyConvertsToCodeWhenKeyDown(';', 186);
                    expectKeyConvertsToCodeWhenKeyDown('\'', 222);
                    expectKeyConvertsToCodeWhenKeyDown('[', 219);
                    expectKeyConvertsToCodeWhenKeyDown(']', 221);
                    expectKeyConvertsToCodeWhenKeyDown('\\', 220);
                });
            });

            describe('when it is a modifier, should set the modifier property', function() {
                it('shift', function() {
                    keyvent.down('⇧');
                    expect(keyDownListener.lastEvent.shiftKey).to.be(true);
                });

                it('control', function() {
                    keyvent.down('⌃');
                    expect(keyDownListener.lastEvent.ctrlKey).to.be(true);
                });

                it('alt', function() {
                    keyvent.down('⌥');
                    expect(keyDownListener.lastEvent.altKey).to.be(true); 
                });

                it('command', function() {
                    keyvent.down('⌘');
                    expect(keyDownListener.lastEvent.metaKey).to.be(true);
                });
            });

            describe('in combination', function() {
                it('should trigger in sequence', function(done) {
                    addKeyDownListener(document, sequenceCheckListener([65, 66, 67], done));
                    keyvent.down('a b c');
                });

                it('should keed modifier keys pressed', function(done) {
                    var keyListener = sequenceCheckListener([65, 16, 17, 18, 91, 70], function(error) {
                        if (error) return done(error);
                        expect(keyListener.lastEvent.which).to.be(70);
                        expect(keyListener.lastEvent.shiftKey).to.be(true);
                        expect(keyListener.lastEvent.ctrlKey).to.be(true);
                        expect(keyListener.lastEvent.altKey).to.be(true);
                        expect(keyListener.lastEvent.metaKey).to.be(true);
                        done();
                    });
                    addKeyDownListener(document, keyListener); 
                    
                    keyvent.down('a ⇧ ⌃ ⌥ ⌘ f');
                });
            });

            function expectKeyConvertsToCodeWhenKeyDown(key, expectedCode) {
                expectKeyConvertsToCodeWhenEvent('down', keyDownListener, key, expectedCode);
            }
        });
    });

        describe('when sending the "keyup" event', function() {

        it('should trigger on the "document" by default', function(done) {
            addKeyUpListener(document, eventListenerStub(done));
            keyvent.up();
        });

        it('should trigger on a specific element', function(done) {
            var headerDiv = createElement();
            addKeyUpListener(headerDiv, eventListenerStub(done));
            keyvent.on(headerDiv).up();
        });

        describe('and setting the "keycode"', function() {            
            var keyUpListener;
            beforeEach(function() {
                keyUpListener = eventListenerStub();
                addKeyUpListener(document, keyUpListener);
            });

            it('when it is a code, should set it directly on the event object', function() {
                keyvent.up(13);
                expect(keyUpListener.lastEvent.which).to.be(13);
            });

            it('when it is a character, should convert into a code then set it on the event object', function() {
                expectKeyConvertsToCodeWhenKeyUp('R', 82);
                expectKeyConvertsToCodeWhenKeyUp('r', 82);
            });

            describe('when it is an alias, should convert into a code then set it on the event object', function() {
                
                it('shift', function() {
                    expectKeyConvertsToCodeWhenKeyUp('shift', 16);
                    expectKeyConvertsToCodeWhenKeyUp('⇧', 16);
                });

                it('control', function() {
                    expectKeyConvertsToCodeWhenKeyUp('ctrl', 17);
                    expectKeyConvertsToCodeWhenKeyUp('control', 17);
                    expectKeyConvertsToCodeWhenKeyUp('⌃', 17);
                });

                it('alt', function() {
                    expectKeyConvertsToCodeWhenKeyUp('alt', 18);
                    expectKeyConvertsToCodeWhenKeyUp('option', 18);
                    expectKeyConvertsToCodeWhenKeyUp('⌥', 18);
                });

                it('command', function() {
                    expectKeyConvertsToCodeWhenKeyUp('command', 91);
                    expectKeyConvertsToCodeWhenKeyUp('⌘', 91);
                });

                it('Function Keys (F1..F19)', function() {
                    expectKeyConvertsToCodeWhenKeyUp('f1', 112); expectKeyConvertsToCodeWhenKeyUp('F1', 112);
                    expectKeyConvertsToCodeWhenKeyUp('f2', 113); expectKeyConvertsToCodeWhenKeyUp('F2', 113);
                    expectKeyConvertsToCodeWhenKeyUp('f3', 114); expectKeyConvertsToCodeWhenKeyUp('F3', 114);
                    expectKeyConvertsToCodeWhenKeyUp('f4', 115); expectKeyConvertsToCodeWhenKeyUp('F4', 115);
                    expectKeyConvertsToCodeWhenKeyUp('f5', 116); expectKeyConvertsToCodeWhenKeyUp('F5', 116);
                    expectKeyConvertsToCodeWhenKeyUp('f6', 117); expectKeyConvertsToCodeWhenKeyUp('F6', 117);
                    expectKeyConvertsToCodeWhenKeyUp('f7', 118); expectKeyConvertsToCodeWhenKeyUp('F7', 118);
                    expectKeyConvertsToCodeWhenKeyUp('f8', 119); expectKeyConvertsToCodeWhenKeyUp('F8', 119);
                    expectKeyConvertsToCodeWhenKeyUp('f9', 120); expectKeyConvertsToCodeWhenKeyUp('F9', 120);
                    expectKeyConvertsToCodeWhenKeyUp('f10', 121); expectKeyConvertsToCodeWhenKeyUp('F10', 121);
                    expectKeyConvertsToCodeWhenKeyUp('f11', 122); expectKeyConvertsToCodeWhenKeyUp('F11', 122);
                    expectKeyConvertsToCodeWhenKeyUp('f12', 123); expectKeyConvertsToCodeWhenKeyUp('F12', 123);
                    expectKeyConvertsToCodeWhenKeyUp('f13', 124); expectKeyConvertsToCodeWhenKeyUp('F13', 124);
                    expectKeyConvertsToCodeWhenKeyUp('f14', 125); expectKeyConvertsToCodeWhenKeyUp('F14', 125);
                    expectKeyConvertsToCodeWhenKeyUp('f15', 126); expectKeyConvertsToCodeWhenKeyUp('F15', 126);
                    expectKeyConvertsToCodeWhenKeyUp('f16', 127); expectKeyConvertsToCodeWhenKeyUp('F16', 127);
                    expectKeyConvertsToCodeWhenKeyUp('f17', 128); expectKeyConvertsToCodeWhenKeyUp('F17', 128);
                    expectKeyConvertsToCodeWhenKeyUp('f18', 129); expectKeyConvertsToCodeWhenKeyUp('F18', 129);
                    expectKeyConvertsToCodeWhenKeyUp('f19', 130); expectKeyConvertsToCodeWhenKeyUp('F19', 130);
                });

                it('other keys', function() {
                    expectKeyConvertsToCodeWhenKeyUp('backspace', 8);
                    expectKeyConvertsToCodeWhenKeyUp('tab', 9);
                    expectKeyConvertsToCodeWhenKeyUp('clear', 12);
                    expectKeyConvertsToCodeWhenKeyUp('enter', 13);
                    expectKeyConvertsToCodeWhenKeyUp('return', 13);
                    expectKeyConvertsToCodeWhenKeyUp('esc', 27);
                    expectKeyConvertsToCodeWhenKeyUp('escape', 27);
                    expectKeyConvertsToCodeWhenKeyUp('space', 32);
                    expectKeyConvertsToCodeWhenKeyUp('left', 37);
                    expectKeyConvertsToCodeWhenKeyUp('up', 38);
                    expectKeyConvertsToCodeWhenKeyUp('right', 39);
                    expectKeyConvertsToCodeWhenKeyUp('down', 40);
                    expectKeyConvertsToCodeWhenKeyUp('del', 46);
                    expectKeyConvertsToCodeWhenKeyUp('delete', 46);
                    expectKeyConvertsToCodeWhenKeyUp('home', 36);
                    expectKeyConvertsToCodeWhenKeyUp('end', 35);
                    expectKeyConvertsToCodeWhenKeyUp('pageup', 33);
                    expectKeyConvertsToCodeWhenKeyUp('pagedown', 34);
                    expectKeyConvertsToCodeWhenKeyUp(',', 188);
                    expectKeyConvertsToCodeWhenKeyUp('.', 190);
                    expectKeyConvertsToCodeWhenKeyUp('/', 191);
                    expectKeyConvertsToCodeWhenKeyUp('`', 192);
                    expectKeyConvertsToCodeWhenKeyUp('-', 189);
                    expectKeyConvertsToCodeWhenKeyUp('=', 187);
                    expectKeyConvertsToCodeWhenKeyUp(';', 186);
                    expectKeyConvertsToCodeWhenKeyUp('\'', 222);
                    expectKeyConvertsToCodeWhenKeyUp('[', 219);
                    expectKeyConvertsToCodeWhenKeyUp(']', 221);
                    expectKeyConvertsToCodeWhenKeyUp('\\', 220);
                });
            });

            describe('when it is a modifier, should set the modifier property', function() {
                it('shift', function() {
                    keyvent.up('⇧');
                    expect(keyUpListener.lastEvent.shiftKey).to.be(true);
                });

                it('control', function() {
                    keyvent.up('⌃');
                    expect(keyUpListener.lastEvent.ctrlKey).to.be(true);
                });

                it('alt', function() {
                    keyvent.up('⌥');
                    expect(keyUpListener.lastEvent.altKey).to.be(true); 
                });

                it('command', function() {
                    keyvent.up('⌘');
                    expect(keyUpListener.lastEvent.metaKey).to.be(true);
                });
            });

            describe('in combination', function() {
                it('should trigger in sequence', function(done) {
                    addKeyUpListener(document, sequenceCheckListener([65, 66, 67], done));
                    keyvent.up('a b c');
                });

                it('should keed modifier keys pressed', function(done) {
                    var keyListener = sequenceCheckListener([65, 16, 17, 18, 91, 70], function(error) {
                        if (error) return done(error);
                        expect(keyListener.lastEvent.which).to.be(70);
                        expect(keyListener.lastEvent.shiftKey).to.be(true);
                        expect(keyListener.lastEvent.ctrlKey).to.be(true);
                        expect(keyListener.lastEvent.altKey).to.be(true);
                        expect(keyListener.lastEvent.metaKey).to.be(true);
                        done();
                    });
                    addKeyUpListener(document, keyListener); 
                    
                    keyvent.up('a ⇧ ⌃ ⌥ ⌘ f');
                });
            });

            function expectKeyConvertsToCodeWhenKeyUp(key, expectedCode) {
                expectKeyConvertsToCodeWhenEvent('up', keyUpListener, key, expectedCode);
            }
        });
    });

    describe('with different contexts', function() {
        var headerDiv;
        var footerDiv;
        beforeEach(function() {
            headerDiv = createElement();
            footerDiv = createElement();
        });

        it('should distinguish between different contexts', function() {
            expect(keyvent.on(headerDiv)).not.to.equal(keyvent.on(footerDiv));
        });

        it('should trigger the "keydown" event on the specific elements only', function() {
            var headerKeyListener = eventListenerStub();
            var footerKeyListener = eventListenerStub();
            headerDiv.addEventListener('keydown', headerKeyListener);
            footerDiv.addEventListener('keydown', footerKeyListener);

            keyvent.on(footerDiv).down();
            expect(headerKeyListener.called).to.be(false);
            expect(footerKeyListener.called).to.be(true);

            headerKeyListener.reset();
            footerKeyListener.reset();
            
            keyvent.on(headerDiv).down();
            expect(footerKeyListener.called).to.be(false);
            expect(headerKeyListener.called).to.be(true);
        });       
    });

    after(function() {
        removeSandBox();
    });

    /* ---[ Support Functions ]--------------------- */

    function addKeyDownListener(element, listener) {
        element.addEventListener('keydown', listener);
    }

    function addKeyUpListener(element, listener) {
        element.addEventListener('keyup', listener);
    }

    function eventListenerStub(doneCallback) {
        var listener = function(event) {
            listener.element = this;
            listener.lastEvent = event;
            listener.eventType = event.type;
            listener.called = true;
            this.removeEventListener(event.type, listener);
            doneCallback && doneCallback();
        };
        listener.reset = function() {
            listener.called = false;
            listener.lastEvent = null;
            if (listener.element) { // Re-add the listener
                var setListener = listener.eventType === 'keydown'? addKeyDownListener : addKeyUpListener;
                setListener(listener.element, this);
            }
            listener.element = null;
            listener.eventType = null;
        };
        listener.reset();
        return listener;
    }

    function sequenceCheckListener(sequence, doneCallback) {
        var cursor = 0;
        var eventType;
        var removed = false;
        var listener = function(event) {
            if (removed) return;
            listener.lastEvent = event;
            eventType = event.type;
            var actualKey = event.which;
            var expectedKey = sequence[cursor++];
            if (actualKey !== expectedKey) {
                done(new Error('Expected keycode '+expectedKey+' but got '+actualKey+'.'));
                return;
            }
            (cursor === sequence.length) && done();
        };
        function done(error) {
            removed = true;
            this.removeEventListener(eventType, listener);
            doneCallback && doneCallback(error);
        }
        return listener;
    }

    function expectKeyConvertsToCodeWhenEvent(event, listener, key, expectedCode) {
        listener.reset();
        keyvent[event](key);
        expect(listener.lastEvent.which).to.be(expectedCode);
    }

    function createElement() {
        var sandbox = $('#sandbox').get(0) || $('<div id="sandbox">').appendTo($('body'));
        return $('<div>').appendTo(sandbox).get(0);
    }

    function removeSandBox() {
        $('#sandbox').remove();
    }
});