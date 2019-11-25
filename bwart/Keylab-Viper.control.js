"use strict";
loadAPI(9);
host.defineController("Arturia", "Keylab88 Viper", "1.0", "6E55D132-1846-4C64-9F97-58041F2D9B97", "Mark White");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["KeyLab 88"], ["KeyLab 88"]);
function exit() { host.println('{{{{{{{{{{{{{{{{ exit }}}}}}}}}}}}}}}}}}}}}}'); }
function init() {
    host.println('----------- Init ----------');
    var application = host.createApplication();
    var hal = new HAL();
    var masterTrack = host.createMasterTrack(0);
    var arranger = Props(host.createArranger(), 'isClipLauncherVisible', 'isTimelineVisible');
    var userControls = host.createUserControls(10);
    var tracksAndScenes = host.createMainTrackBank(16, 0, 16);
    var mainTrackBank = host.createMainTrackBank(10, 0, 0);
    var transport = host.createTransport();
    var userTrack = host.createArrangerCursorTrack(0, 16);
    var userDevice = Props(host.createEditorCursorDevice(0), 'isPlugin', 'isWindowOpen', 'position', 'slotNames', 'hasDrumPads', 'name', 'exists', 'isExpanded', 'hasSlots', 'hasNext', 'hasPrevious', 'isNested', 'hasLayers');
    var userDeviceCursorSlot = Props(userDevice.getCursorSlot(), 'exists', 'name');
    var userDeviceLayers = Props(userDevice.createLayerBank(8), 'exists', 'itemCount', 'scrollPosition', 'canScrollForwards', 'canScrollBackwards');
    var userDeviceLayerCursor = Props(userDevice.createCursorLayer(), 'exists', 'hasNext', 'hasPrevious', 'name');
    var userDeviceSlotBank = Props(userDeviceCursorSlot.createDeviceBank(16), 'exists', 'canScrollForwards', 'canScrollBackwards', 'cursorIndex');
    var userDeviceSiblings = Props(userDevice.createSiblingsDeviceBank(1), 'canScrollBackwards', 'canScrollForwards');
    var remoteControls = userDevice.createCursorRemoteControlsPage(8);
    var userClips = userTrack.clipLauncherSlotBank();
    var popup = Propify(host.createPopupBrowser(), 'exists', 'selectedContentTypeIndex', 'contentTypeNames');
    var always = new ObservableAny(false);
    var mainMode = setupModes();
    var bankMode = ObservableMode('Bank1', 'Bank2');
    var inArrangeOrMix = new BindingBuilder(hal, whenValue(mainMode, 'Sound', 'Multi'));
    var preBrowseMode = 'Sound';
    mainMode.addValueObserver(function (v) { if (v !== 'Browse')
        preBrowseMode = v; });
    popup.exists().addValueObserver(function (exists) {
        if (exists) {
            mainMode.set('Browse');
            var actions = application.getActions();
            for (var i = actions.length - 1; i >= 0; i--) {
                if (actions[i].getName() === 'Focus Browser File List')
                    actions[i].invoke();
            }
        }
        else if (mainMode.get() === 'Browse')
            mainMode.set(preBrowseMode);
    });
    setupWhenBrowsing();
    setupPads(inArrangeOrMix);
    setupSoundAndMultiModes();
    setupTransportAndFaders();
    always.set(true);
    function setupSoundAndMultiModes() {
        var inArrangeModeBank1 = new BindingBuilder(hal, allTrue(mainMode.Sound, bankMode.Bank1));
        var inArrangeModeBank2 = new BindingBuilder(hal, allTrue(mainMode.Sound, bankMode.Bank2));
        var inMixModeBank1 = new BindingBuilder(hal, allTrue(mainMode.Multi, bankMode.Bank1));
        var inMixModeBank2 = new BindingBuilder(hal, allTrue(mainMode.Multi, bankMode.Bank2));
        var inArrangeMode = new BindingBuilder(hal, mainMode.Sound);
        var inMixMode = new BindingBuilder(hal, mainMode.Multi);
        inArrangeOrMix
            .click('sound', function (_) { return mainMode.set('Sound'); })
            .click('multi', function (_) { return mainMode.set('Multi'); })
            .click('bank1', function (_) { return bankMode.set('Bank1'); })
            .click('bank2', function (_) { return bankMode.set('Bank2'); })
            .click('paramButton', function (_) { return userDevice.browseToReplaceDevice(); })
            .click('valueButton', handleValueClick)
            .turns('param', moveCursor(userTrack))
            .turns('value', moveDevice)
            .click('button0', function (_) { return application.toggleInspector(); })
            .click('button1', function (_) { return application.toggleNoteEditor(); })
            .click('button2', function (_) { return application.toggleDevices(); })
            .click('button3', function (_) { return application.toggleMixer(); });
        inArrangeMode
            .turns('B1P4', arranger._.isIoSectionVisible())
            .turns('B1P5', arranger._.isPlaybackFollowEnabled());
        inMixMode
            .turns('B1P4', function (_) { return application.toggleFullScreen(); })
            .turns('B1P5', function (_) { return application.nextSubPanel(); });
        inArrangeModeBank1
            .turns('B1P0', function (inc) {
            if (inc > 0) {
                arranger.isTimelineVisible ? arranger.isClipLauncherVisible = false :
                    arranger.isTimelineVisible = true;
            }
            else if (inc < 0) {
                arranger.isClipLauncherVisible ? arranger.isTimelineVisible = false
                    : arranger.isClipLauncherVisible = true;
            }
        })
            .turns('B1P1', transport.getPosition())
            .turns('B1P2', transport.getInPosition())
            .turns('B1P3', transport.getOutPosition())
            .turns('B1P6', transport.isMetronomeEnabled())
            .turns('B1P7', transport.isMetronomeTickPlaybackEnabled())
            .turns('B1P8', transport.metronomeVolume())
            .turns('B1P9', function (inc) { return transport.tempo().incRaw(inc * 1.0); });
        inArrangeModeBank2
            .knobs(function (i) { return userControls.getControl(i); }, 'B2P0', 'B2P1', 'B2P2', 'B2P3', 'B2P4', 'B2P5', 'B2P6', 'B2P7', 'B2P8', 'B2P9');
        inMixModeBank1
            .knobs(function (i) { return remoteControls.getParameter(i); }, 'B1P0', 'B1P1', 'B1P2', 'B1P3', 'B1P5', 'B1P6', 'B1P7', 'B1P8')
            .turns('B1P4', moveCursor(remoteControls))
            .turns('B1P9', function (inc) { return transport.tempo().incRaw(inc * 1.0); });
        inMixModeBank2
            .turns('B2P0', mainTrackBank.getChannel(0).pan())
            .turns('B2P1', mainTrackBank.getChannel(1).pan())
            .turns('B2P2', mainTrackBank.getChannel(2).pan())
            .turns('B2P3', mainTrackBank.getChannel(3).pan())
            .turns('B2P4', mainTrackBank.getChannel(4).pan())
            .turns('B2P5', mainTrackBank.getChannel(5).pan())
            .turns('B2P6', mainTrackBank.getChannel(6).pan())
            .turns('B2P7', mainTrackBank.getChannel(7).pan())
            .turns('B2P8', mainTrackBank.getChannel(8).pan())
            .turns('B2P9', mainTrackBank.getChannel(9).pan());
    }
    function handleValueClick(_) {
        if (!userDevice.exists)
            return;
        if (userDevice.isPlugin) {
            userDevice.isWindowOpen = !userDevice.isWindowOpen;
        }
        else {
            if (userDevice.isExpanded) {
                userDevice.isExpanded = false;
                if (userDevice.isNested)
                    userDevice.selectParent();
            }
            else {
                userDevice.isExpanded = true;
            }
        }
    }
    ;
    function moveDevice(inc) {
        if (!userDevice.exists)
            userDevice.selectFirst();
        else if (inc > 0) {
            if (userDevice.isExpanded && userDeviceLayerCursor.exists && userDeviceLayerCursor.hasNext) {
                userDeviceLayerCursor.selectNext();
            }
            else if (userDevice.isExpanded && userDeviceLayerCursor.exists) {
                userDeviceLayerCursor._.selectChannel(userTrack);
            }
            else if (userDevice.isExpanded && userDeviceLayers.canScrollForwards) {
                userDeviceLayers.scrollForwards();
            }
            else if (userDevice.isExpanded && userDeviceSiblings.canScrollForwards) {
                userDeviceSiblings.scrollForwards();
            }
            else if (userDevice.hasNext) {
                userDevice.selectNext();
            }
            else if (userDevice.isNested) {
                userDevice.selectParent();
            }
        }
        else {
            if (userDeviceLayerCursor.exists && userDeviceLayerCursor.hasPrevious) {
                userDeviceLayerCursor.selectPrevious();
            }
            else if (userDevice.hasPrevious) {
                userDevice.selectPrevious();
            }
            else if (userDeviceLayerCursor.exists) {
                userDeviceLayerCursor._.selectChannel(userTrack);
            }
            else if (userDeviceSlotBank.canScrollBackwards) {
                userDeviceSlotBank.scrollBackwards();
            }
            else if (userDevice.isNested) {
                userDevice.selectInEditor;
                userDevice.selectParent();
                userDevice.selectPrevious();
            }
        }
        userDevice.selectInEditor();
    }
    ;
    function setupPads(inArrangeOrMulti) {
        var padTrack = Props(host.createCursorTrack("DrumPadCursor", 0, 0), 'isPinned', 'monitor', 'exists', 'hasNext', 'color');
        var padDevice = Props(padTrack.createCursorDevice(), 'exists', 'hasNext', 'hasDrumPads', 'isPinned');
        var padBank = Props(padDevice.createDrumPadBank(16), 'exists', 'scrollPosition', 'cursorIndex');
        var padsMode = ObservableMode('DrumPads', 'Transpose', 'PlayClip', 'SelectClip', 'Scenes', 'SelectTrack');
        var padTrackLocked = new ObservableAny(false);
        padsMode.addValueObserver(function (mode) { return host.showPopupNotification("Pads: " + mode); });
        padTrackLocked.addValueObserver(function (active) { return host.showPopupNotification(active ? "Pad Track locked" : "Pads follow user track"); });
        inArrangeOrMulti
            .flips('button6', padTrackLocked)
            .press('button7', function (isDown) { padsMode.setMode(isDown ? 'SelectTrack' : 'Scenes'); }, padsMode.Scenes)
            .press('button8', function (isDown) { padsMode.setMode(isDown ? 'SelectClip' : 'PlayClip'); }, padsMode.PlayClip)
            .press('button9', function (isDown) { padsMode.setMode(isDown ? 'Transpose' : 'DrumPads'); }, padsMode.DrumPads);
        var binder = new PadBinder(hal);
        var sceneBank = tracksAndScenes.sceneBank();
        binder.grid(padsMode.Scenes, function (pad, index, setLED) {
            var scene = Props(sceneBank.getScene(index), 'exists');
            scene.addIsSelectedInEditorObserver(setLED);
            return function (isDown) { if (isDown && scene.exists)
                scene.launch(); };
        });
        binder.grid(padsMode.SelectTrack, function (pad, index, setLED) {
            var channel = Props(tracksAndScenes.getChannel(index), 'exists');
            channel.addIsSelectedInEditorObserver(setLED);
            return function (_) {
                if (!channel.exists)
                    return;
                userTrack.selectChannel(channel._);
                channel.selectInMixer();
                channel.selectInEditor();
            };
        });
        padsMode.PlayClip.addValueObserver(function (active) { return userClips.setIndication(active); });
        binder.grid(padsMode.PlayClip, function (pad, index, setLED) {
            var clipItem = Props(userClips.getItemAt(index), 'exists', 'isPlaying', 'hasContent');
            clipItem.on.isPlaying(setLED);
            return function (isDown) {
                if (clipItem.isPlaying)
                    userClips.returnToArrangement();
                else if (clipItem.hasContent)
                    userClips.launch(index);
                else
                    userClips.select(index);
            };
        });
        var selectClipSetLEDs = binder.grid(padsMode.SelectClip, function (pad, index, setLED) { return function (isDown) {
            if (!isDown)
                return;
            userClips.select(index);
            userClips.showInEditor(index);
        }; });
        userClips.addHasContentObserver(function (slotIndex, hasClip) {
            var binding = selectClipSetLEDs[slotIndex];
            if (binding)
                binding.setLED(hasClip);
        });
        var padBaseNote = 20;
        padsMode.addValueObserver(function (mode) { return padBank.setIndication(mode === 'DrumPads' || mode === 'Transpose'); });
        var padNoteBindings = binder.midi(padsMode.DrumPads, function (pad, status, data1, data2) {
            var cmd = status & 0xF0;
            if (cmd === 0x90 && data2 > 0)
                padTrack._.startNote(pad.index + padBaseNote, data2);
            else if (cmd === 0x80 || (cmd === 0x90 && data2 === 0))
                padTrack._.stopNote(pad.index + padBaseNote, data2);
        });
        padBank.getItemAt(0).playingNotes().addValueObserver(function (notes) {
            var on = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
            for (var n = notes.length - 1; n >= 0; n--) {
                var note = notes[n].pitch() - padBaseNote;
                if (note >= 0 && note < 16)
                    on[note] = true;
            }
            for (var p = 0; p < 16; p++)
                padNoteBindings[p].setLED(on[p]);
        });
        padBank.setChannelScrollStepSize(16);
        var transposePads = binder.grid(padsMode.Transpose, function (pad, index, setLED) {
            return function (isDown) {
                if (!isDown)
                    return;
                var position = 4 + (index * 16);
                padBank.scrollPosition = position;
            };
        });
        padBank.on.scrollPosition(function (position) {
            padBaseNote = position;
            transposePads.forEach(function (pad, index) {
                return pad.setLED(position === ((index * 16) + 4));
            });
        });
        var movePadsToSelection = function () {
            if (!padTrackLocked.get())
                return;
            if (!userDevice.hasDrumPads)
                return;
            padTrack.selectChannel(userTrack);
            padDevice.selectDevice(userDevice._);
            padTrack.isPinned = true;
            padDevice.isPinned = true;
        };
        userTrack.position().addValueObserver(function (p) { return movePadsToSelection(); });
        userDevice.on.hasDrumPads(function (hasPads) { return movePadsToSelection(); });
        return padsMode;
    }
    function setupTransportAndFaders() {
        var isPlaying = transport.isPlaying();
        var handleStop = function () { return isPlaying.get() ? transport.stop() : transport.tapTempo(); };
        new BindingBuilder(hal, always)
            .click('stop', handleStop, not(isPlaying))
            .flips('play', isPlaying)
            .flips('loop', transport.isArrangerLoopEnabled())
            .click('record', function (_) { return transport.record(); }, transport.isArrangerRecordEnabled())
            .click('forward', function (_) { return transport.fastForward(); })
            .click('rewind', function (_) { return transport.rewind(); })
            .turns('volume', function (inc) { return masterTrack.volume().inc(inc, 0x7f); })
            .moves(function (i) { return mainTrackBank.getChannel(i % 9).volume(); }, 'B1F0', 'B1F1', 'B1F2', 'B1F3', 'B1F4', 'B1F5', 'B1F6', 'B1F7', 'B1F8', 'B2F0', 'B2F1', 'B2F2', 'B2F3', 'B2F4', 'B2F5', 'B2F6', 'B2F7', 'B2F8');
    }
    function setupWhenBrowsing() {
        var browserCategoryCursor = popup.categoryColumn().createCursorItem();
        var browserLocationCursor = popup.locationColumn().createCursorItem();
        var browserDeviceCursor = popup.deviceColumn().createCursorItem();
        var browserDeviceTypeCursor = popup.deviceTypeColumn().createCursorItem();
        var browserTagCursor = popup.tagColumn().createCursorItem();
        var browserFileTypeCursor = popup.fileTypeColumn().createCursorItem();
        var browserCreatorCursor = popup.creatorColumn().createCursorItem();
        var browserSmartCollectionCursor = popup.smartCollectionColumn().createCursorItem();
        var browserResultsCursor = popup.resultsColumn().createCursorItem();
        var selectedContent = popup.selectedContentTypeIndex();
        selectedContent.markInterested();
        new BindingBuilder(hal, popup.exists())
            .turns('param', moveCursor(browserCategoryCursor))
            .turns('value', moveCursor(browserResultsCursor))
            .click('paramButton', function (_) { return popup.cancel(); })
            .click('valueButton', function (_) { return popup.commit(); })
            .flips('button0', whenNumber(selectedContent, 0))
            .flips('button1', whenNumber(selectedContent, 1))
            .flips('button2', whenNumber(selectedContent, 2))
            .flips('button3', whenNumber(selectedContent, 3))
            .flips('button4', whenNumber(selectedContent, 4))
            .flips('button5', whenNumber(selectedContent, 5))
            .click('button6', function (_) { })
            .flips('button7', popup.shouldAudition())
            .turns('B1P0', moveCursor(browserDeviceTypeCursor))
            .turns('B1P1', moveCursor(browserCategoryCursor))
            .turns('B1P2', moveCursor(browserCreatorCursor))
            .turns('B1P3', moveCursor(browserTagCursor))
            .turns('B1P4', moveCursor(browserDeviceCursor))
            .turns('B1P5', moveCursor(browserSmartCollectionCursor))
            .turns('B1P6', moveCursor(browserFileTypeCursor))
            .turns('B1P7', moveCursor(browserLocationCursor))
            .turns('B1P8', function (inc) { })
            .turns('B2P0', moveCursor(browserDeviceTypeCursor))
            .turns('B2P1', moveCursor(browserCategoryCursor))
            .turns('B2P2', moveCursor(browserCreatorCursor))
            .turns('B2P3', moveCursor(browserTagCursor))
            .turns('B2P4', moveCursor(browserDeviceCursor))
            .turns('B2P5', moveCursor(browserSmartCollectionCursor))
            .turns('B2P6', moveCursor(browserFileTypeCursor))
            .turns('B2P7', moveCursor(browserLocationCursor))
            .turns('B2P8', function (inc) { });
    }
    function setupModes() {
        var mainMode = ObservableMode('Sound', 'Multi', 'Browse');
        application.panelLayout().addValueObserver(function (layout) {
            if (mainMode.get() !== 'Browse') {
                switch (layout) {
                    case 'ARRANGE':
                        mainMode.set('Sound');
                        break;
                    case 'MIX':
                        mainMode.set('Multi');
                        break;
                }
            }
        });
        mainMode.Sound.addValueObserver(function (on) { return on && application.setPanelLayout("ARRANGE"); });
        mainMode.Multi.addValueObserver(function (on) { return on && application.setPanelLayout("MIX"); });
        mainMode.addValueObserver(function (mode) {
            hal.setDisplay('Mode', mode);
        });
        return mainMode;
    }
    function setupHostActions(application) {
        var hostActions = {};
        (function () {
            var cats = application.getActionCategories();
            for (var j = cats.length - 1; j >= 0; j--) {
                var cat = {};
                hostActions[cats[j].getName()] = cat;
                var actions = cats[j].getActions();
                for (var i = 0; i < actions.length; i++)
                    cat[actions[i].getName()] = actions[i];
            }
        })();
        return hostActions;
    }
}
function moveCursor(cursor) {
    return function (inc) { return (inc > 0) ? cursor.selectNext() : cursor.selectPrevious(); };
}
var AbstractControl = (function () {
    function AbstractControl(hal, id, name) {
        this.hal = hal;
        this.id = id;
        this.name = name;
        this.unresolvedItems = 0;
        this._config = [];
        this.hal.controlById[id] = this;
    }
    Object.defineProperty(AbstractControl.prototype, "isValid", {
        get: function () { return this.unresolvedItems === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControl.prototype, "config", {
        get: function () { return this._config; },
        set: function (config) {
            this._config = config;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    AbstractControl.prototype.invalidate = function () {
        var config = this.config;
        this.unresolvedItems = config.length;
        for (var i = 0; i < this.unresolvedItems; i++)
            this.hal.ensureValue(this.id, i + 1, config[i], this.resolve);
    };
    AbstractControl.prototype.resolve = function () { --this.unresolvedItems; };
    return AbstractControl;
}());
var BindingBuilder = (function () {
    function BindingBuilder(hal, isActive) {
        this.hal = hal;
        this.isActive = isActive;
        this.controls = this.hal.controls;
    }
    BindingBuilder.prototype.indicate = function (parameter) {
        if (isIndicatable(parameter))
            this.isActive.addValueObserver(function (active) { return parameter.setIndication(active); });
        if (isMarkInterested(parameter))
            parameter.markInterested();
    };
    BindingBuilder.prototype.moves = function (parameters) {
        var _this = this;
        var indices = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            indices[_i - 1] = arguments[_i];
        }
        var activators = indices.map(function (key, index) {
            var parameter = parameters(index);
            _this.indicate(parameter);
            var onMoved;
            if (isSettableBooleanValue(parameter))
                onMoved = function (value) { return parameter.set(value > 64); };
            else if (isSettableRangedValue(parameter))
                onMoved = function (value) { return parameter.set(value, 0x7f); };
            else if (isSettableDoubleValue(parameter))
                onMoved = function (value) { return parameter.set(value * 1.0); };
            else if (isCallback(parameter))
                onMoved = parameter;
            else
                throw new Error('bad parameters on turnz');
            return function () { return _this.controls[key].onMoved = onMoved; };
        });
        this.isActive.addValueObserver(function (active) { if (active)
            activators.forEach(function (c) { return c(); }); });
        return this;
    };
    BindingBuilder.prototype.makeTurnable = function (parameter) {
        this.indicate(parameter);
        var onTurn;
        if (isSettableBooleanValue(parameter))
            onTurn = function (direction) { return parameter.set(direction > 0); };
        else if (isSettableRangedValue(parameter))
            onTurn = function (direction) { return parameter.inc(direction, 0x7f); };
        else if (isSettableDoubleValue(parameter))
            onTurn = function (direction) { return parameter.inc(direction * 1.0); };
        else if (isCallback(parameter))
            onTurn = parameter;
        else
            throw new Error('bad parameters on turnz');
        return onTurn;
    };
    BindingBuilder.prototype.knobs = function (parameters) {
        var _this = this;
        var indices = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            indices[_i - 1] = arguments[_i];
        }
        var activators = indices.map(function (key, index) {
            var parameter = parameters(index);
            var onTurn = _this.makeTurnable(parameter);
            return function () { return _this.controls[key].onTurn = onTurn; };
        });
        this.isActive.addValueObserver(function (active) { if (active)
            activators.forEach(function (c) { return c(); }); });
        return this;
    };
    BindingBuilder.prototype.turns = function (key, parameter) {
        var onTurn = this.makeTurnable(parameter);
        var control = this.controls[key];
        this.isActive.addValueObserver(function (active) { if (active)
            control.onTurn = onTurn; });
        return this;
    };
    BindingBuilder.prototype.flips = function (key, parameter) {
        this.indicate(parameter);
        var control = this.controls[key];
        var observer;
        if (isToggle(parameter))
            observer = function (isDown) { return isDown && parameter.toggle(); };
        else
            observer = function (isDown) { return isDown && parameter.set(!parameter.get()); };
        if (controlHasLed(control)) {
            var led_1 = control;
            allTrue(parameter, this.isActive).addValueObserver(function (lit) { return led_1.isLit = lit; });
        }
        this.isActive.addValueObserver(function (active) { if (active)
            control.onPress = observer; });
        return this;
    };
    BindingBuilder.prototype.press = function (key, onPress, litOn) {
        var control = this.controls[key];
        this.isActive.addValueObserver(function (active) { if (active)
            control.onPress = onPress; });
        if (litOn && controlHasLed(control))
            allTrue(litOn, this.isActive).addValueObserver(function (lit) { return control.isLit = lit; });
        return this;
    };
    BindingBuilder.prototype.click = function (key, onClick, litOn) {
        var _this = this;
        return this.press(key, function (isDown) { return isDown && onClick(_this.controls[key]); }, litOn);
    };
    return BindingBuilder;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CCControl = (function (_super) {
    __extends(CCControl, _super);
    function CCControl(hal, id, name, mode, channel, cc) {
        var _this = _super.call(this, hal, id, name) || this;
        _this.config = [(mode & 0xF0 >> 8), channel, cc, 0, 127, mode & 0x01];
        return _this;
    }
    Object.defineProperty(CCControl.prototype, "mode", {
        get: function () {
            return this._config ? ((this._config[0] << 8) & this._config[5]) : ControlMode.Off;
        },
        set: function (mode) {
            this.config = this.config.filter(function (v, i) {
                return i == 0 ? ((mode & 0xF0) >> 8) :
                    i == 5 ? (mode & 0x01) : v;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CCControl.prototype, "channel", {
        get: function () { return this.config[1]; },
        set: function (channel) {
            this.config = this.config.filter(function (v, i) { return i == 1 ? channel : v; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CCControl.prototype, "cc", {
        get: function () { return this.config[2]; },
        set: function (cc) {
            this.config = this.config.filter(function (v, i) { return i == 2 ? cc : v; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CCControl.prototype, "config", {
        set: function (config) {
            if (this._config && this._config.length > 5)
                this.hal.ccMap.remove(this.channel, this.cc);
            this._config = config;
            this.hal.ccMap.set(this.channel, this.cc, this);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    return CCControl;
}(AbstractControl));
var Clickable = (function (_super) {
    __extends(Clickable, _super);
    function Clickable(hal, id, name, channel, cc) {
        var _this = _super.call(this, hal, id, name, ControlMode.GateButton, channel, cc) || this;
        _this._isDown = false;
        _this.handleMidiCc = function (statusByte, data1, data2) {
            var isDown = _this._isDown = data2 > 0;
            if (_this.onPress)
                _this.onPress(isDown);
            if (!isDown && _this)
                _this.hal.updateDisplay();
            return _this.onPress !== undefined;
        };
        return _this;
    }
    Object.defineProperty(Clickable.prototype, "isDown", {
        get: function () { return this._isDown; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Clickable.prototype, "config", {
        get: function () { return [8, this.channel, this.cc, 0, 127, 1]; },
        enumerable: true,
        configurable: true
    });
    return Clickable;
}(CCControl));
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._lit = undefined;
        _this.handleMidiCc = function (statusByte, data1, data2) {
            var isDown = _this._isDown = data2 > 0;
            if (_this.onPress)
                _this.onPress(isDown);
            if (!isDown) {
                _this.hal.updateDisplay();
                if (_this._lit)
                    _this.hal.setLED(_this.id, true);
            }
            return _this.onPress !== undefined;
        };
        return _this;
    }
    Object.defineProperty(Button.prototype, "isLit", {
        get: function () { return this._lit; },
        set: function (lit) {
            if (this._lit === lit)
                return;
            this._lit = lit;
            this.hal.setLED(this.id, lit);
        },
        enumerable: true,
        configurable: true
    });
    return Button;
}(Clickable));
var ControlMode;
(function (ControlMode) {
    ControlMode[ControlMode["Off"] = 0] = "Off";
    ControlMode[ControlMode["Fader"] = 17] = "Fader";
    ControlMode[ControlMode["Knob"] = 16] = "Knob";
    ControlMode[ControlMode["Encoder"] = 17] = "Encoder";
    ControlMode[ControlMode["ToggleButton"] = 128] = "ToggleButton";
    ControlMode[ControlMode["GateButton"] = 129] = "GateButton";
    ControlMode[ControlMode["Duration"] = 80] = "Duration";
    ControlMode[ControlMode["Note"] = 145] = "Note";
    ControlMode[ControlMode["NoteToggle"] = 144] = "NoteToggle";
    ControlMode[ControlMode["MMC"] = 112] = "MMC";
    ControlMode[ControlMode["NRPN"] = 64] = "NRPN";
    ControlMode[ControlMode["RPN"] = 65] = "RPN";
    ControlMode[ControlMode["Preset"] = 176] = "Preset";
    ControlMode[ControlMode["ProChg"] = 177] = "ProChg";
})(ControlMode || (ControlMode = {}));
var Controls = (function () {
    function Controls(hal) {
        this.hal = hal;
        this.volume = new Encoder(this.hal, 0x30, "Volume", 0, 0x07);
        this.param = new Encoder(this.hal, 0x31, "Param", 0, 0x70);
        this.paramButton = new Clickable(this.hal, 0x32, "Param Click", 0, 0x72);
        this.value = new Encoder(this.hal, 0x33, "Value", 0, 0x71);
        this.valueButton = new Clickable(this.hal, 0x34, "Value Click", 0, 0x73);
        this.sound = new Button(this.hal, 0x1E, "Sound", 0, 0x76);
        this.multi = new Button(this.hal, 0x1F, "Multi", 0, 0x77);
        this.bank1 = new Button(this.hal, 0x1D, "Bank 1", 0, 0x2E);
        this.bank2 = new Button(this.hal, 0x1C, "Bank 2", 0, 0x2F);
        this.rewind = new TransportButton(this.hal, 0x5B, "Rewind", 0, 0x50);
        this.forward = new TransportButton(this.hal, 0x5C, "Forward", 0, 0x51);
        this.record = new TransportButton(this.hal, 0x5A, "Record", 0, 0x52);
        this.stop = new TransportButton(this.hal, 0x59, "Stop", 0, 0x53);
        this.play = new TransportButton(this.hal, 0x58, "Play", 0, 0x54);
        this.loop = new TransportButton(this.hal, 0x5D, "Loop", 0, 0x55);
        this.button0 = new RowButton(this.hal, 0x12, "Button 01", 0, 0x16);
        this.button1 = new RowButton(this.hal, 0x13, "Button 02", 0, 0x17);
        this.button2 = new RowButton(this.hal, 0x14, "Button 03", 0, 0x18);
        this.button3 = new RowButton(this.hal, 0x15, "Button 04", 0, 0x19);
        this.button4 = new RowButton(this.hal, 0x16, "Button 05", 0, 0x1A);
        this.button5 = new RowButton(this.hal, 0x17, "Button 06", 0, 0x1B);
        this.button6 = new RowButton(this.hal, 0x18, "Button 07", 0, 0x1C);
        this.button7 = new RowButton(this.hal, 0x19, "Button 08", 0, 0x1D);
        this.button8 = new RowButton(this.hal, 0x1A, "Button 09", 0, 0x1E);
        this.button9 = new RowButton(this.hal, 0x1B, "Button 10", 0, 0x1F);
        this.B1P0 = new EncoderBank1(this.hal, 0x70, "P 1-01", 0, 0x65);
        this.B1P1 = new EncoderBank1(this.hal, 0x71, "P 1-02", 0, 0x66);
        this.B1P2 = new EncoderBank1(this.hal, 0x72, "P 1-03", 0, 0x67);
        this.B1P3 = new EncoderBank1(this.hal, 0x73, "P 1-04", 0, 0x68);
        this.B1P4 = new EncoderBank1(this.hal, 0x74, "P 1-05", 0, 0x69);
        this.B1P5 = new EncoderBank1(this.hal, 0x75, "P 1-06", 0, 0x6A);
        this.B1P6 = new EncoderBank1(this.hal, 0x76, "P 1-07", 0, 0x6B);
        this.B1P7 = new EncoderBank1(this.hal, 0x77, "P 1-08", 0, 0x6C);
        this.B1P8 = new EncoderBank1(this.hal, 0x78, "P 1-09", 0, 0x6D);
        this.B1P9 = new EncoderBank1(this.hal, 0x79, "P 1-10", 0, 0x6E);
        this.B2P0 = new EncoderBank2(this.hal, 0x70, "P 2-01", 2, 0x65);
        this.B2P1 = new EncoderBank2(this.hal, 0x71, "P 2-02", 2, 0x66);
        this.B2P2 = new EncoderBank2(this.hal, 0x72, "P 2-03", 2, 0x67);
        this.B2P3 = new EncoderBank2(this.hal, 0x73, "P 2-04", 2, 0x68);
        this.B2P4 = new EncoderBank2(this.hal, 0x74, "P 2-05", 2, 0x69);
        this.B2P5 = new EncoderBank2(this.hal, 0x75, "P 2-06", 2, 0x6A);
        this.B2P6 = new EncoderBank2(this.hal, 0x76, "P 2-07", 2, 0x6B);
        this.B2P7 = new EncoderBank2(this.hal, 0x77, "P 2-08", 2, 0x6C);
        this.B2P8 = new EncoderBank2(this.hal, 0x78, "P 2-09", 2, 0x6D);
        this.B2P9 = new EncoderBank2(this.hal, 0x79, "P 2-10", 2, 0x6E);
        this.B1F0 = new FaderBank1(this.hal, 0x70, "F 1-01", 0, 0x5B);
        this.B1F1 = new FaderBank1(this.hal, 0x71, "F 1-02", 0, 0x5C);
        this.B1F2 = new FaderBank1(this.hal, 0x72, "F 1-03", 0, 0x5D);
        this.B1F3 = new FaderBank1(this.hal, 0x73, "F 1-04", 0, 0x5E);
        this.B1F4 = new FaderBank1(this.hal, 0x74, "F 1-05", 0, 0x5F);
        this.B1F5 = new FaderBank1(this.hal, 0x75, "F 1-06", 0, 0x60);
        this.B1F6 = new FaderBank1(this.hal, 0x76, "F 1-07", 0, 0x61);
        this.B1F7 = new FaderBank1(this.hal, 0x77, "F 1-08", 0, 0x62);
        this.B1F8 = new FaderBank1(this.hal, 0x78, "F 1-09", 0, 0x63);
        this.B2F0 = new FaderBank2(this.hal, 0x70, "F 2-01", 2, 0x5B);
        this.B2F1 = new FaderBank2(this.hal, 0x71, "F 2-02", 2, 0x5C);
        this.B2F2 = new FaderBank2(this.hal, 0x72, "F 2-03", 2, 0x5D);
        this.B2F3 = new FaderBank2(this.hal, 0x73, "F 2-04", 2, 0x5E);
        this.B2F4 = new FaderBank2(this.hal, 0x74, "F 2-05", 2, 0x5F);
        this.B2F5 = new FaderBank2(this.hal, 0x75, "F 2-06", 2, 0x60);
        this.B2F6 = new FaderBank2(this.hal, 0x76, "F 2-07", 2, 0x61);
        this.B2F7 = new FaderBank2(this.hal, 0x77, "F 2-08", 2, 0x62);
        this.B2F8 = new FaderBank2(this.hal, 0x78, "F 2-09", 2, 0x63);
        this.pad0 = new Pad(this.hal, 0x70, 0, 9, 0x18);
        this.pad1 = new Pad(this.hal, 0x71, 1, 9, 0x19);
        this.pad2 = new Pad(this.hal, 0x72, 2, 9, 0x1A);
        this.pad3 = new Pad(this.hal, 0x73, 3, 9, 0x1B);
        this.pad4 = new Pad(this.hal, 0x74, 4, 9, 0x1C);
        this.pad5 = new Pad(this.hal, 0x75, 5, 9, 0x1D);
        this.pad6 = new Pad(this.hal, 0x76, 6, 9, 0x1E);
        this.pad7 = new Pad(this.hal, 0x77, 7, 9, 0x1F);
        this.pad8 = new Pad(this.hal, 0x78, 8, 9, 0x20);
        this.pad9 = new Pad(this.hal, 0x79, 9, 9, 0x21);
        this.padA = new Pad(this.hal, 0x7A, 10, 9, 0x22);
        this.padB = new Pad(this.hal, 0x7B, 11, 9, 0x23);
        this.padC = new Pad(this.hal, 0x7C, 12, 9, 0x24);
        this.padD = new Pad(this.hal, 0x7D, 13, 9, 0x25);
        this.padE = new Pad(this.hal, 0x7E, 14, 9, 0x26);
        this.padF = new Pad(this.hal, 0x7F, 15, 9, 0x27);
        this.pads = [this.pad0, this.pad1, this.pad2, this.pad3, this.pad4,
            this.pad5, this.pad6, this.pad7, this.pad8, this.pad9, this.padA,
            this.padB, this.padC, this.padD, this.padE, this.padF];
        this.relativeKnobMode = new GlobalBoolParam(this.hal, 0x02, 'Relative Knob Mode');
        this.drawbarMode = new GlobalBoolParam(this.hal, 0x01, 'Drawbar Mode');
        this.splitMode = new GlobalBoolParam(this.hal, 0x07, 'Keyboard Split Mode');
        this.afterTouchChanel = new GlobalChannelParam(this.hal, 0x0B, 'AfterTouch Chanel');
        this.octaveButtonsAssign = new GlobalChannelParam(this.hal, 0x12, 'Octave Buttons Assign');
        this.part1Chanel = new GlobalIntParam(this.hal, 0x06);
        this.part2Chanel = new GlobalIntParam(this.hal, 0x05);
        this.splitPoint = new GlobalIntParam(this.hal, 0x0D);
        this.part1TransposeOctave = new GlobalIntParam(this.hal, 0x03);
        this.part2TransposeOctave = new GlobalIntParam(this.hal, 0x10);
        this.part1TransposeChromatic = new GlobalIntParam(this.hal, 0x06);
        this.part2TransposeChromatic = new GlobalIntParam(this.hal, 0x11);
    }
    return Controls;
}());
var Encoder = (function (_super) {
    __extends(Encoder, _super);
    function Encoder(hal, id, name, channel, cc) {
        var _this = _super.call(this, hal, id, name, ControlMode.Encoder, channel, cc) || this;
        _this.handleMidiCc = function (statusByte, data1, data2) {
            if (!_this.onTurn)
                return false;
            _this.onTurn(data2 - 64);
            return true;
        };
        return _this;
    }
    return Encoder;
}(CCControl));
var Fader = (function (_super) {
    __extends(Fader, _super);
    function Fader(hal, id, name, channel, cc) {
        var _this = _super.call(this, hal, id, name, ControlMode.Fader, channel, cc) || this;
        _this.handleMidiCc = function (statusByte, data1, data2) {
            if (!_this.onMoved)
                return false;
            _this.onMoved(data2);
            return true;
        };
        return _this;
    }
    return Fader;
}(CCControl));
var AbstractObservable = (function () {
    function AbstractObservable() {
        this.observers = [];
    }
    AbstractObservable.prototype.addValueObserver = function (callback) {
        this.observers.push(callback);
        var value = this.get();
        if (value)
            callback(value);
    };
    AbstractObservable.prototype.notify = function (value) {
        for (var i = 0; i < this.observers.length; i++)
            this.observers[i](value);
    };
    return AbstractObservable;
}());
var GlobalBoolParam = (function () {
    function GlobalBoolParam(hal, cmd, name) {
        if (name === void 0) { name = 'Boolean Parameter'; }
        this.hal = hal;
        this.cmd = cmd;
        this.name = name;
    }
    GlobalBoolParam.prototype.get = function (resolve) { this.hal.getValue(0x40, this.cmd, function (v) { return resolve(v > 1); }); };
    GlobalBoolParam.prototype.set = function (value) { this.hal.ensureValue(0x40, this.cmd, value ? 0x7F : 0x01); };
    return GlobalBoolParam;
}());
var GlobalChannelParam = (function () {
    function GlobalChannelParam(hal, cmd, name) {
        if (name === void 0) { name = 'Channel Parameter'; }
        this.hal = hal;
        this.cmd = cmd;
        this.name = name;
    }
    GlobalChannelParam.prototype.get = function (resolve) {
        var _this = this;
        this.hal.getValue(0x40, this.cmd, function (value) {
            var v = value;
            ;
            switch (value) {
                case 0x7E:
                    v = 'All';
                    break;
                case 0x7F:
                    v = 'Panel';
                    break;
                case 0x40:
                    v = 'Part1';
                    break;
                case 0x41:
                    v = 'Part2';
                    break;
            }
            resolve(v);
        }, function (error) { println("Error getting value for " + _this.name + ": " + error.message); });
    };
    GlobalChannelParam.prototype.set = function (value) {
        var num;
        switch (value) {
            case 'All':
                num = 0x7E;
                break;
            case 'Panel':
                num = 0x7F;
                break;
            case 'Part1':
                num = 0x40;
                break;
            case 'Part2':
                num = 0x41;
                break;
            default: num = value;
        }
        this.hal.ensureValue(0x40, this.cmd, num);
    };
    return GlobalChannelParam;
}());
var GlobalIntParam = (function () {
    function GlobalIntParam(hal, cmd, name) {
        if (name === void 0) { name = 'Signed Parameter'; }
        this.hal = hal;
        this.cmd = cmd;
        this.name = name;
    }
    GlobalIntParam.prototype.get = function (resolve) {
        var _this = this;
        this.hal.getValue(0x40, this.cmd, function (val) { return resolve(val < 0 ? 0x40 - val : val); }, function (error) { println("Error getting value for " + _this.name + ": " + error.message); });
    };
    GlobalIntParam.prototype.set = function (value) {
        if (value > 0x40)
            value = 0x40;
        if (value < -0x3F)
            value = 0x3F;
        this.hal.ensureValue(0x40, this.cmd, value < 0 ? 0x40 - value : value);
    };
    return GlobalIntParam;
}());
var TwoDim = (function () {
    function TwoDim() {
        this.values = [];
    }
    TwoDim.prototype.get = function (a, b) {
        var x = this.values[a];
        return x ? x[b] : undefined;
    };
    TwoDim.prototype.set = function (a, b, value) {
        var x = this.values[a];
        if (!x)
            x = this.values[a] = [];
        x[b] = value;
    };
    TwoDim.prototype.remove = function (a, b) {
        var x = this.values[a];
        if (!x)
            x = this.values[a] = [];
        x[b] = undefined;
    };
    return TwoDim;
}());
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var flush = function () { host.println('Flushing '); };
var HAL = (function () {
    function HAL() {
        var _this = this;
        this.ccMap = new TwoDim();
        this.noteMap = new TwoDim();
        this.controlById = {};
        this.nextClearToSendtime = 0;
        this.sysexQueue = [];
        this.pendingGets = [];
        this.sysexCadence = 55;
        this.bytesSinceFlush = 0;
        this.maxBytesPerFlush = 48;
        this.isFlushQueued = false;
        this.flush = function () {
            _this.isFlushQueued = false;
            if (_this.nextClearToSendtime > Date.now()) {
                _this.enqueueFlush();
                return;
            }
            _this.bytesSinceFlush = 0;
            _this.nextClearToSendtime = 0;
            var queue = _this.sysexQueue;
            while (queue.length > 0) {
                var item = queue[0];
                var sizeIfSent = _this.bytesSinceFlush + item.sysex.length;
                if (sizeIfSent > _this.maxBytesPerFlush)
                    break;
                queue.shift();
                _this.sendSysex(item.sysex);
                if (item.onSend)
                    item.onSend();
            }
            if (queue.length > 0 || _this.bytesSinceFlush > 0)
                _this.enqueueFlush();
            else {
                _this.processTimedOutRequests();
                host.scheduleTask(function () {
                    for (var key in _this.controlById) {
                        var control = _this.controlById[key];
                        if (!control.isValid)
                            control.invalidate();
                    }
                }, 10000);
            }
        };
        this.handleSysex = function (data) {
            _this.nextClearToSendtime = 0;
            var match = data.match(/f000206b(..)420200(..)(..)(..)f7/i);
            if (!match || match.length < 4) {
                println("Sysex Not Handled: " + data);
                return;
            }
            var cmd = parseInt(match[2], 16);
            var id = parseInt(match[3], 16);
            var val = parseInt(match[4], 16);
            for (var i = 0; i < _this.pendingGets.length; i++) {
                var r = _this.pendingGets[i];
                if (r.id === id && r.cmd === cmd) {
                    _this.pendingGets.splice(i--, 1);
                    if (r.resolve)
                        r.resolve(val);
                }
            }
            _this.processTimedOutRequests();
        };
        this.setLED = function (id, isLit) {
            var message = [0x02, 0x00, 0x10, id, isLit ? 0x7F : 0x00];
            if (_this.isFlushQueued)
                _this.enqueueSysex(message);
            else
                _this.sendSysex(message);
        };
        this.displayBytes = [0x04, 0x00, 0x60,
            0x01, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00,
            0x02, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00];
        var midiOut = host.getMidiOutPort(0);
        var midiIn = host.getMidiInPort(0);
        var midiInKeys = midiIn.createNoteInput("Keys", "80????", "90????", "A0????", "B001??", "B002??", "B004??", "B00B??", "B040??", "B042??", "B043??", "C0????", "D0????", "E0????");
        midiInKeys.setShouldConsumeEvents(true);
        this.sendSysex = function (sysex) {
            _this.nextClearToSendtime = Date.now() + _this.sysexCadence;
            midiOut.sendSysex(sysex);
            _this.bytesSinceFlush += sysex.length;
        };
        flush = this.flush;
        midiIn.setSysexCallback(this.handleSysex);
        midiIn.setMidiCallback(this.handleMidi);
        this.controls = new Controls(this);
        this.ensureValue(0x02, 0x40, 0x7F);
    }
    HAL.prototype.processTimedOutRequests = function () {
        var now = Date.now();
        var _loop_1 = function (i) {
            var r = this_1.pendingGets[i];
            if (r.timesOut < now) {
                var name = (this_1.controlById[r.id] || { name: "Unknown" }).name;
                var message = "Request timed out for " + name + " " + asHex(r.id) + ":" + asHex(r.cmd);
                if (++r.attempts < 3) {
                    this_1.enqueueSysex([0x01, 0x00, r.cmd, r.id], function () { r.timesOut = Date.now() + 100; });
                }
                else {
                    println(message + " - giving up.");
                    if (r.reject)
                        r.reject(new Error(message));
                    this_1.pendingGets.splice(i, 1);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.pendingGets.length; i++) {
            _loop_1(i);
        }
    };
    HAL.prototype.enqueueFlush = function () {
        if (this.isFlushQueued)
            return;
        this.isFlushQueued = true;
        if (this.nextClearToSendtime === 0)
            host.requestFlush();
        else
            host.scheduleTask(function () { return host.requestFlush(); }, this.nextClearToSendtime - Date.now());
    };
    HAL.prototype.enqueueSysex = function (sysex, onSend) {
        var bytes = __spreadArrays([0xF0, 0x00, 0x20, 0x6B, 0x7F, 0x42], sysex, [0xF7]);
        var sizeIfSent = this.bytesSinceFlush + bytes.length;
        if (sizeIfSent <= this.maxBytesPerFlush)
            this.sendSysex(bytes);
        else {
            this.sysexQueue.push({ sysex: bytes, onSend: onSend });
            this.enqueueFlush();
        }
    };
    HAL.prototype.setValue = function (id, cmd, value) { this.enqueueSysex([0x02, 0x00, cmd, id, value]); };
    HAL.prototype.getValue = function (id, cmd, resolve, reject) {
        var _this = this;
        this.enqueueSysex([0x01, 0x00, cmd, id], function () {
            _this.pendingGets.push({ id: id, cmd: cmd, resolve: resolve, reject: reject, attempts: 1, timesOut: Date.now() + 50 });
        });
    };
    HAL.prototype.ensureValue = function (id, cmd, value, resolve, attempt) {
        var _this = this;
        if (attempt === void 0) { attempt = 1; }
        this.getValue(id, cmd, function (val) {
            if (val === value) {
                if (resolve)
                    resolve();
                return;
            }
            if (attempt >= 3) {
                var name = (_this.controlById[id] || { name: 'Unknown / Parameter' }).name;
                var message = "Unable to set " + asHex(id) + ":" + asHex(cmd) + " to " + asHex(value) + " on " + name + " after " + attempt + " attempts.";
                throw new Error(message);
            }
            _this.setValue(id, cmd, value);
            _this.ensureValue(id, cmd, value, resolve, attempt + 1);
        });
    };
    HAL.prototype.loadMemory = function (preset) { this.enqueueSysex([0x05, preset]); };
    HAL.prototype.saveMemory = function (preset) { this.enqueueSysex([0x06, preset]); };
    HAL.prototype.setDisplay = function (line1, line2) {
        if (line2 === void 0) { line2 = ''; }
        for (var i = 0; i < 16; i++) {
            this.displayBytes[4 + i] = (i < line1.length) ? line1.charCodeAt(i) : 0x20;
            this.displayBytes[22 + i] = (i < line2.length) ? line2.charCodeAt(i) : 0x20;
        }
        this.updateDisplay();
    };
    HAL.prototype.updateDisplay = function () { this.enqueueSysex(this.displayBytes); };
    HAL.prototype.handleMidi = function (status, data1, data2) {
        var cmd = status & 0xF0;
        var ch = status & 0x0F;
        if (cmd === 0xB0) {
            var ctrl = this.ccMap.get(ch, data1);
            if (ctrl && ctrl.handleMidiCc(status, data1, data2))
                return;
            host.println("Unhandled CC: " + asHex(status) + "-" + asHex(data1) + "-" + asHex(data2));
        }
        else if (ch > 0) {
            if (status === 0x80 || status === 0x90 || status === 0xA0 || status === 0xD0) {
                var pad = this.noteMap.get(ch, data1);
                if (pad) {
                    pad.handleMidi(status, data1, data2);
                    var padMidi = this.onPadMidi;
                    if (padMidi)
                        padMidi(pad, status, data1, data2);
                    return;
                }
            }
        }
    };
    return HAL;
}());
var EncoderBank1 = (function (_super) {
    __extends(EncoderBank1, _super);
    function EncoderBank1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EncoderBank1;
}(Encoder));
;
var EncoderBank2 = (function (_super) {
    __extends(EncoderBank2, _super);
    function EncoderBank2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EncoderBank2;
}(Encoder));
;
var FaderBank1 = (function (_super) {
    __extends(FaderBank1, _super);
    function FaderBank1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FaderBank1;
}(Fader));
;
var FaderBank2 = (function (_super) {
    __extends(FaderBank2, _super);
    function FaderBank2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FaderBank2;
}(Fader));
;
var RowButton = (function (_super) {
    __extends(RowButton, _super);
    function RowButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowButton;
}(Button));
;
var TransportButton = (function (_super) {
    __extends(TransportButton, _super);
    function TransportButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransportButton;
}(Button));
;
var OmniChannel;
(function (OmniChannel) {
    OmniChannel[OmniChannel["Part1"] = 65] = "Part1";
    OmniChannel[OmniChannel["Part2"] = 64] = "Part2";
    OmniChannel[OmniChannel["All"] = 126] = "All";
    OmniChannel[OmniChannel["Panel"] = 127] = "Panel";
})(OmniChannel || (OmniChannel = {}));
function asHex(value) {
    return ((value >> 4) & 0xF).toString(16) + (value & 0xF).toString(16);
}
var Pad = (function (_super) {
    __extends(Pad, _super);
    function Pad(hal, id, index, channel, note) {
        var _this = _super.call(this, hal, id, "Pad " + (index + 1)) || this;
        _this.index = index;
        _this._lit = undefined;
        _this._isDown = false;
        _this.config = [9, channel, note, 20, 127, 1];
        return _this;
    }
    Object.defineProperty(Pad.prototype, "channel", {
        get: function () { return this.config[1]; },
        set: function (channel) {
            this.config = this.config.filter(function (v, i) { return i == 1 ? channel : v; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "note", {
        get: function () { return this.config[2]; },
        set: function (note) {
            this.config = this.config.filter(function (v, i) { return i == 2 ? note : v; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "config", {
        set: function (config) {
            if (this._config.length >= 5)
                this.hal.noteMap.remove(this.channel, this.note);
            this._config = config;
            this.hal.noteMap.set(this.channel, this.note, this);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "isLit", {
        get: function () { return this._lit; },
        set: function (lit) {
            if (this._lit === lit)
                return;
            this._lit = lit;
            this.hal.setLED(this.id, lit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pad.prototype, "isDown", {
        get: function () { return this._isDown; },
        enumerable: true,
        configurable: true
    });
    Pad.prototype.handleMidi = function (status, data1, data2) {
        var cmd = status & 0x70;
        if (cmd === 0x90)
            this._isDown = data2 > 0;
        else if (cmd === 0x80)
            this._isDown = false;
    };
    return Pad;
}(AbstractControl));
var PadBinder = (function () {
    function PadBinder(hal) {
        this.hal = hal;
    }
    PadBinder.prototype.createLedSetters = function (isActive) {
        return this.hal.controls.pads.map(function (pad, index) {
            var isLit = false;
            return {
                pad: pad,
                index: index,
                applyLED: function () { return pad.isLit = isLit; },
                setLED: function (lit) {
                    isLit = lit;
                    if (isActive.get())
                        pad.isLit = lit;
                }
            };
        });
    };
    PadBinder.prototype.grid = function (isActive, callback) {
        var _this = this;
        var ledSetters = this.createLedSetters(isActive);
        var clickActions = this.hal.controls.pads.map(function (pad, index) { return callback(pad, index, ledSetters[index].setLED); });
        function onPadMidi(pad, status, data1, data2) {
            var cmd = status & 0x70;
            if (cmd === 0x90)
                clickActions[pad.index](data2 > 0);
            else if (cmd === 0x80)
                clickActions[pad.index](false);
        }
        isActive.addValueObserver(function (active) {
            if (!active)
                return;
            ledSetters.forEach(function (v) { return v.applyLED(); });
            _this.hal.onPadMidi = onPadMidi;
        });
        return ledSetters;
    };
    PadBinder.prototype.midi = function (isActive, onPadMidi) {
        var _this = this;
        var ledSetters = this.createLedSetters(isActive);
        isActive.addValueObserver(function (active) {
            if (!active)
                return;
            ledSetters.forEach(function (v) { return v.applyLED(); });
            _this.hal.onPadMidi = onPadMidi;
        });
        return ledSetters;
    };
    return PadBinder;
}());
function isIndicatable(arg) {
    return arg.setIndication !== undefined;
}
function isSubscribable(arg) {
    return arg.subscribe !== undefined;
}
function isMarkInterested(arg) {
    return arg.markInterested !== undefined;
}
function isBitwigValue(arg) {
    return arg.markInterested !== undefined;
}
function isSettableRangedValue(arg) {
    return arg.incRaw !== undefined;
}
function isSettableDoubleValue(arg) {
    return arg.inc !== undefined;
}
function isSettableBooleanValue(arg) {
    return arg.toggle !== undefined;
}
function isSettable(arg) {
    return arg.set !== undefined;
}
function isToggle(arg) {
    return arg.toggle !== undefined;
}
function isCallback(a) {
    return typeof a === 'function';
}
function controlIsFader(control) {
    return control instanceof Fader;
}
function controlIsEncoder(control) {
    return control instanceof Encoder;
}
function controlIsCLickable(control) {
    return control instanceof Clickable;
}
function controlHasLed(control) {
    return typeof control.isLit !== 'undefined';
}
var ObservableAny = (function (_super) {
    __extends(ObservableAny, _super);
    function ObservableAny(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    ObservableAny.prototype.get = function () { return this.value; };
    ObservableAny.prototype.set = function (value) {
        if (value === this.value)
            return;
        this.value = value;
        this.notify(value);
    };
    ObservableAny.prototype.setMode = function (value) {
        if (value === this.value)
            return;
        this.notify(undefined);
        this.value = value;
        this.notify(value);
    };
    ObservableAny.prototype.when = function (value) {
        var trueValues = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            trueValues[_i - 1] = arguments[_i];
        }
        return new ObservableTruth(this, false, __spreadArrays([value], trueValues));
    };
    ObservableAny.prototype.whenNot = function (value) {
        var trueValues = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            trueValues[_i - 1] = arguments[_i];
        }
        return new ObservableTruth(this, true, __spreadArrays([value], trueValues));
    };
    return ObservableAny;
}(AbstractObservable));
function ObservableMode() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    var result = new ObservableAny(values[0]);
    values.forEach(function (value) {
        result[value] = whenValue(result, value);
    });
    return result;
}
var ProxyObservable = (function () {
    function ProxyObservable(source, isTrue) {
        this.addValueObserver = function (callback) { source.addValueObserver(function (v) { callback(isTrue(v)); }); };
        this.get = function () { return isTrue(source.get()); };
    }
    return ProxyObservable;
}());
var ObservableTruth = (function (_super) {
    __extends(ObservableTruth, _super);
    function ObservableTruth(source, invert, trueValues) {
        var _this = _super.call(this, source, function (value) {
            for (var i = 0; i < trueValues.length; i++)
                if (trueValues[i] === value)
                    return !invert;
            return invert;
        }) || this;
        _this.set = function (value) { if (value)
            source.set(trueValues[0]); };
        return _this;
    }
    return ObservableTruth;
}(ProxyObservable));
function whenValue(source) {
    var trueValues = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        trueValues[_i - 1] = arguments[_i];
    }
    if (!trueValues || trueValues.length < 1)
        throw new Error("At least one true value is requried for whenValue()");
    return new ObservableTruth(source, false, trueValues);
}
function whenNumber(source, trueValue) {
    return new ObservableTruth(source, false, [trueValue]);
}
function not(observable) {
    return new ProxyObservable(observable, function (v) { return !v; });
}
function combine() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    if (items.length === 2)
        return new (function (_super) {
            __extends(class_1, _super);
            function class_1(a, b) {
                var _this = _super.call(this) || this;
                _this.val = false;
                _this.valA = false;
                _this.valB = false;
                a.addValueObserver(function (v) { _this.valA = v; _this.checkVal(); });
                a.addValueObserver(function (v) { _this.valB = v; _this.checkVal(); });
                return _this;
            }
            class_1.prototype.checkVal = function () {
                var r = this.get();
                if (this.val === r)
                    return;
                this.notify(this.val = r);
            };
            class_1.prototype.get = function () { return this.val; };
            return class_1;
        }(AbstractObservable))(items[0], items[1]);
    return new (function (_super) {
        __extends(class_2, _super);
        function class_2(items) {
            var _this = _super.call(this) || this;
            _this.allTrue = function (v, y) { return v && y; };
            _this.truths = items.map(function (_) { return false; });
            items.forEach(function (o, i) {
                o.addValueObserver(function (v) {
                    var prev = _this.get();
                    _this.truths[i] = v;
                    var now = _this.get();
                    if (prev != now)
                        _this.notify(now);
                });
            });
            return _this;
        }
        class_2.prototype.get = function () { return this.truths.reduce(this.allTrue, true); };
        return class_2;
    }(AbstractObservable))(items);
}
var Observe = (function () {
    function Observe(observable) {
        this.observable = observable;
    }
    Observe.prototype.add = function (key, callback) {
        var property = (this.observable[key])();
        if (isMarkInterested(property))
            property.markInterested();
        if (callback)
            property.addValueObserver(callback);
        if (isSettable(property))
            Object.defineProperty(this, key, { 'get': function () { return property.get(); }, 'set': function (v) { return property.set(v); } });
        else
            Object.defineProperty(this, key, { 'get': function () { return property.get(); } });
        return this;
    };
    Observe.prototype.done = function () {
        return this;
    };
    return Observe;
}());
var TrueForAllOrAny = (function (_super) {
    __extends(TrueForAllOrAny, _super);
    function TrueForAllOrAny(sources, requireAll, fnIsTrue) {
        var _this = _super.call(this) || this;
        _this.sources = sources;
        _this.isTrue = false;
        var truthStates = new Array(sources.length);
        var fnAllTrue = function (count) { return requireAll ? count === sources.length : count > 0; };
        sources.forEach(function (source, index) {
            source.addValueObserver(function (value) {
                var elementTrue = fnIsTrue(value, index);
                if (truthStates[index] === elementTrue)
                    return;
                truthStates[index] = elementTrue;
                var nowTrue = fnAllTrue(truthStates.filter(function (s) { return s; }).length);
                if (nowTrue === _this.isTrue)
                    return;
                _this.notify(_this.isTrue = nowTrue);
            });
        });
        return _this;
    }
    TrueForAllOrAny.prototype.get = function () { return this.isTrue; };
    return TrueForAllOrAny;
}(AbstractObservable));
function allTrue() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return new TrueForAllOrAny(sources, true, function (value, index) { return value; });
}
function anyTrue() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return new TrueForAllOrAny(sources, false, function (value, index) { return value; });
}
function Propify(source) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    keys.forEach(function (key) {
        var prop = source[key]();
        if (isMarkInterested(prop))
            prop.markInterested();
        else
            throw new Error("Cannot propify " + key);
    });
    return source;
}
function Props(source) {
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var result = {
        _: source, on: {},
        __noSuchMethod__: function (method, arg1, arg2) {
            var m = result;
            var s = source;
            if (typeof arg1 === 'undefined') {
                m[method] = function () { return s[method](); };
                return m[method]();
            }
            else if (typeof arg1 !== 'undefined') {
                m[method] = function (a1) { return s[method](a1); };
                return m[method](arg1);
            }
            else if (typeof arg2 !== 'undefined') {
                m[method] = function (a1, a2) { return s[method](a1, a2); };
                return m[method](arg1, arg2);
            }
            throw (new Error("Could not invoke " + method));
        }
    };
    keys.forEach(function (key) {
        var prop = source[key]();
        if (isMarkInterested(prop))
            prop.markInterested();
        var def = { 'get': function () { return prop.get(); } };
        if (isSettable(prop))
            def.set = function (v) { return prop.set(v); };
        Object.defineProperty(result, key, def);
        Object.defineProperty(result.on, key, { 'value': function (arg) { prop.addValueObserver(arg); } });
    });
    return result;
}
