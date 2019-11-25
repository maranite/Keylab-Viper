//// <reference path="./bitwig.d.ts" />
loadAPI(9);
host.defineController("Arturia", "Keylab88 Viper", "1.0", "6E55D132-1846-4C64-9F97-58041F2D9B97", "Mark White");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["KeyLab 88"], ["KeyLab 88"]);
//host.setShouldFailOnDeprecatedUse(true);
//host.defineSysexIdentityReply("F0 7E 00 06 02 00 20 6B ?? ?? 05 48 ?? ?? ?? ?? F7");

function exit() { host.println('{{{{{{{{{{{{{{{{ exit }}}}}}}}}}}}}}}}}}}}}}'); }

type ModeType = 'Sound' | 'Multi' | 'Browse';

function init() {
    host.println('----------- Init ----------');

    // Establish Bitwig API dependencies...
    const application = host.createApplication();

    const hal = new HAL();
    const masterTrack = host.createMasterTrack(0);
    const arranger = Props(host.createArranger(), 'isClipLauncherVisible', 'isTimelineVisible');
    //const mixer = host.createMixer();    
    const userControls = host.createUserControls(10);
    const tracksAndScenes = host.createMainTrackBank(16, 0, 16);
    const mainTrackBank = host.createMainTrackBank(10, 0, 0);

    const transport = host.createTransport();
    const userTrack = host.createArrangerCursorTrack(0, 16);

    const userDevice = Props(host.createEditorCursorDevice(0), 'isPlugin', 'isWindowOpen', 'position', 'slotNames', 'hasDrumPads', 'name', 'exists', 'isExpanded', 'hasSlots', 'hasNext', 'hasPrevious', 'isNested', 'hasLayers');
    const userDeviceCursorSlot = Props(userDevice.getCursorSlot(), 'exists', 'name');
    const userDeviceLayers = Props(userDevice.createLayerBank(8), 'exists', 'itemCount', 'scrollPosition', 'canScrollForwards', 'canScrollBackwards');
    const userDeviceLayerCursor = Props(userDevice.createCursorLayer(), 'exists', 'hasNext', 'hasPrevious', 'name');
    const userDeviceSlotBank = Props(userDeviceCursorSlot.createDeviceBank(16), 'exists', 'canScrollForwards', 'canScrollBackwards', 'cursorIndex');
    const userDeviceSiblings = Props(userDevice.createSiblingsDeviceBank(1), 'canScrollBackwards', 'canScrollForwards');
    //const userDeviceLayerBank = Props(userDevice.createLayerBank(1), 'exists', 'cursorIndex', 'scrollPosition');
    const remoteControls = userDevice.createCursorRemoteControlsPage(8);
    //remoteControls.setHardwareLayout(2, 4);  <-- CAUSES ERROR

    const userClips = userTrack.clipLauncherSlotBank();
    const popup = Propify(host.createPopupBrowser(), 'exists', 'selectedContentTypeIndex', 'contentTypeNames');

    const always = new ObservableAny<boolean>(false);
    const mainMode = setupModes();
    const bankMode = ObservableMode('Bank1', 'Bank2');

    const inArrangeOrMix = new BindingBuilder(hal, whenValue(mainMode, 'Sound', 'Multi'));

    let preBrowseMode: ModeType = 'Sound';
    mainMode.addValueObserver(v => { if (v !== 'Browse') preBrowseMode = v; });

    popup.exists().addValueObserver((exists: boolean) => {
        if (exists) {
            mainMode.set('Browse');
            const actions = application.getActions();
            for (let i = actions.length - 1; i >= 0; i--) {
                if (actions[i].getName() === 'Focus Browser File List')
                    actions[i].invoke();
            }
        }
        else if (mainMode.get() === 'Browse') mainMode.set(preBrowseMode);
    });

    setupWhenBrowsing();
    setupPads(inArrangeOrMix);
    setupSoundAndMultiModes();
    setupTransportAndFaders();
    always.set(true);

    function setupSoundAndMultiModes() {
        const inArrangeModeBank1 = new BindingBuilder(hal, allTrue(mainMode.Sound, bankMode.Bank1));
        const inArrangeModeBank2 = new BindingBuilder(hal, allTrue(mainMode.Sound, bankMode.Bank2));
        const inMixModeBank1 = new BindingBuilder(hal, allTrue(mainMode.Multi, bankMode.Bank1));
        const inMixModeBank2 = new BindingBuilder(hal, allTrue(mainMode.Multi, bankMode.Bank2));
        const inArrangeMode = new BindingBuilder(hal, mainMode.Sound);
        const inMixMode = new BindingBuilder(hal, mainMode.Multi);

        inArrangeOrMix
            .click('sound', _ => mainMode.set('Sound'))
            .click('multi', _ => mainMode.set('Multi'))
            .click('bank1', _ => bankMode.set('Bank1'))
            .click('bank2', _ => bankMode.set('Bank2'))
            .click('paramButton', _ => userDevice.browseToReplaceDevice())
            .click('valueButton', handleValueClick)
            .turns('param', moveCursor(userTrack))
            .turns('value', moveDevice)
            .click('button0', _ => application.toggleInspector())
            .click('button1', _ => application.toggleNoteEditor())
            .click('button2', _ => application.toggleDevices())
            .click('button3', _ => application.toggleMixer())
        //.flips('button4', arranger.isTimelineVisible())             // <-- this is onyl really applicable in arrange mode
        //.flips('button5', arranger.isClipLauncherVisible())
        
        inArrangeMode
            .turns('B1P4', arranger._.isIoSectionVisible())
            .turns('B1P5', arranger._.isPlaybackFollowEnabled())
            
        inMixMode
            .turns('B1P4', _ => application.toggleFullScreen())
            .turns('B1P5', _ => application.nextSubPanel())

        inArrangeModeBank1
            .turns('B1P0', inc => {
                if (inc > 0) {
                    arranger.isTimelineVisible ? arranger.isClipLauncherVisible = false :
                        arranger.isTimelineVisible = true;
                } else if (inc < 0) {
                    arranger.isClipLauncherVisible ? arranger.isTimelineVisible = false
                        : arranger.isClipLauncherVisible = true;
                }
            })
            .turns('B1P1', transport.getPosition())
            .turns('B1P2', transport.getInPosition())
            .turns('B1P3', transport.getOutPosition())
            //.turns('B1P4', tr)
            // .turns('B1P5', arranger._.isPlaybackFollowEnabled())
            .turns('B1P6', transport.isMetronomeEnabled())
            .turns('B1P7', transport.isMetronomeTickPlaybackEnabled())
            .turns('B1P8', transport.metronomeVolume())
            .turns('B1P9', inc => transport.tempo().incRaw(inc * 1.0));

        inArrangeModeBank2
            .knobs(i => userControls.getControl(i),
                'B2P0', 'B2P1', 'B2P2', 'B2P3', 'B2P4',
                'B2P5', 'B2P6', 'B2P7', 'B2P8', 'B2P9');

        inMixModeBank1
            .knobs(i => remoteControls.getParameter(i),
                'B1P0', 'B1P1', 'B1P2', 'B1P3',
                'B1P5', 'B1P6', 'B1P7', 'B1P8')
            .turns('B1P4', moveCursor(remoteControls))
            .turns('B1P9', inc => transport.tempo().incRaw(inc * 1.0));

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

    function handleValueClick(_: any) {
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
    };

    function moveDevice(inc: number) {
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
        } else {
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
                userDevice.selectInEditor
                userDevice.selectParent();
                userDevice.selectPrevious();
            }
        }
        userDevice.selectInEditor();
        //userDevice.deviceChain().selectInEditor();
    };

    function setupPads(inArrangeOrMulti: BindingBuilder) {
        const padTrack = Props(host.createCursorTrack("DrumPadCursor", 0, 0), 'isPinned', 'monitor', 'exists', 'hasNext', 'color');
        const padDevice = Props(padTrack.createCursorDevice(), 'exists', 'hasNext', 'hasDrumPads', 'isPinned');
        const padBank = Props(padDevice.createDrumPadBank(16), 'exists', 'scrollPosition', 'cursorIndex');

        const padsMode = ObservableMode('DrumPads', 'Transpose', 'PlayClip', 'SelectClip', 'Scenes', 'SelectTrack');
        const padTrackLocked = new ObservableAny(false);
        padsMode.addValueObserver(mode => host.showPopupNotification(`Pads: ${mode}`));
        padTrackLocked.addValueObserver(active => host.showPopupNotification(active ? `Pad Track locked` : `Pads follow user track`));

        // Buttons
        inArrangeOrMulti
            .flips('button6', padTrackLocked)
            .press('button7', isDown => { padsMode.setMode(isDown ? 'SelectTrack' : 'Scenes'); }, padsMode.Scenes)
            .press('button8', isDown => { padsMode.setMode(isDown ? 'SelectClip' : 'PlayClip'); }, padsMode.PlayClip)
            .press('button9', isDown => { padsMode.setMode(isDown ? 'Transpose' : 'DrumPads'); }, padsMode.DrumPads)

        const binder = new PadBinder(hal);

        // Pads: Scenes
        const sceneBank = tracksAndScenes.sceneBank();
        binder.grid(padsMode.Scenes,
            (pad, index, setLED) => {
                const scene = Props(sceneBank.getScene(index), 'exists');
                scene.addIsSelectedInEditorObserver(setLED);
                return isDown => { if (isDown && scene.exists) scene.launch(); };
            });

        // Pads: Select Tracks
        binder.grid(padsMode.SelectTrack,
            (pad, index, setLED) => {
                const channel = Props(tracksAndScenes.getChannel(index), 'exists');
                channel.addIsSelectedInEditorObserver(setLED);
                return _ => {
                    if (!channel.exists) return;
                    userTrack.selectChannel(channel._);
                    channel.selectInMixer();
                    channel.selectInEditor();
                };
            });

        // Pads: Play Clips        
        padsMode.PlayClip.addValueObserver(active => userClips.setIndication(active));
        binder.grid(padsMode.PlayClip,
            (pad, index, setLED) => {
                const clipItem = Props(userClips.getItemAt(index), 'exists', 'isPlaying', 'hasContent');
                clipItem.on.isPlaying(setLED);
                return isDown => {
                    if (clipItem.isPlaying)
                        userClips.returnToArrangement();
                    else if (clipItem.hasContent)
                        userClips.launch(index);
                    else
                        userClips.select(index);
                }
            });

        // Pads: Select Clips 
        const selectClipSetLEDs = binder.grid(padsMode.SelectClip,
            (pad, index, setLED) => isDown => {
                if (!isDown) return;
                userClips.select(index);
                userClips.showInEditor(index);
            });

        userClips.addHasContentObserver((slotIndex, hasClip) => {
            const binding = selectClipSetLEDs[slotIndex];
            if (binding) binding.setLED(hasClip);
        });


        // Pads: Drum Pads 
        let padBaseNote = 20;
        padsMode.addValueObserver(mode => padBank.setIndication(mode === 'DrumPads' || mode === 'Transpose'));
        const padNoteBindings = binder.midi(padsMode.DrumPads,
            (pad, status, data1, data2) => {
                //printMidi(status, data1, data2);
                let cmd = status & 0xF0;
                if (cmd === 0x90 && data2 > 0)
                    padTrack._.startNote(pad.index + padBaseNote, data2);
                else if (cmd === 0x80 || (cmd === 0x90 && data2 === 0))
                    padTrack._.stopNote(pad.index + padBaseNote, data2);
                // todo: set timbre on pressure
            }
        );

        padBank.getItemAt(0).playingNotes().addValueObserver(notes => {
            const on: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
            for (let n = notes.length - 1; n >= 0; n--) {
                const note = notes[n].pitch() - padBaseNote;
                if (note >= 0 && note < 16)
                    on[note] = true;
            }
            for (let p = 0; p < 16; p++)
                padNoteBindings[p].setLED(on[p]);
        });

        // Pads: Transpose (Drum Pads)        
        padBank.setChannelScrollStepSize(16);
        const transposePads = binder.grid(padsMode.Transpose,
            (pad, index, setLED) => {
                return isDown => {
                    if (!isDown) return;
                    //println(`padMidi transpose for ${pad.name} is ${isDown}`);
                    const position = 4 + (index * 16);      // index 2 is C1  36
                    padBank.scrollPosition = position;
                };
            });

        padBank.on.scrollPosition(position => {
            padBaseNote = position;
            //println(`Setting base note to ${padBaseNote}`);
            transposePads.forEach((pad, index) =>
                pad.setLED(position === ((index * 16) + 4)));
        });

        const movePadsToSelection = () => {
            if (!padTrackLocked.get()) return;
            if (!userDevice.hasDrumPads) return;
            padTrack.selectChannel(userTrack);
            padDevice.selectDevice(userDevice._);
            padTrack.isPinned = true;
            padDevice.isPinned = true;
        }

        userTrack.position().addValueObserver(p => movePadsToSelection());
        userDevice.on.hasDrumPads(hasPads => movePadsToSelection());
        return padsMode;
    }

    function setupTransportAndFaders() {
        const isPlaying = transport.isPlaying();
        const handleStop = () => isPlaying.get() ? transport.stop() : transport.tapTempo();
        new BindingBuilder(hal, always)
            .click('stop', handleStop, not(isPlaying))
            .flips('play', isPlaying)
            .flips('loop', transport.isArrangerLoopEnabled())
            .click('record', _ => transport.record(), transport.isArrangerRecordEnabled())
            .click('forward', _ => transport.fastForward())
            .click('rewind', _ => transport.rewind())
            .turns('volume', inc => masterTrack.volume().inc(inc, 0x7f))
            .moves(i => mainTrackBank.getChannel(i % 9).volume(),
                'B1F0', 'B1F1', 'B1F2', 'B1F3', 'B1F4', 'B1F5', 'B1F6', 'B1F7', 'B1F8',
                'B2F0', 'B2F1', 'B2F2', 'B2F3', 'B2F4', 'B2F5', 'B2F6', 'B2F7', 'B2F8')
    }

    function setupWhenBrowsing() {
        const browserCategoryCursor = popup.categoryColumn().createCursorItem();
        const browserLocationCursor = popup.locationColumn().createCursorItem();
        const browserDeviceCursor = popup.deviceColumn().createCursorItem();
        const browserDeviceTypeCursor = popup.deviceTypeColumn().createCursorItem();
        const browserTagCursor = popup.tagColumn().createCursorItem();
        const browserFileTypeCursor = popup.fileTypeColumn().createCursorItem();
        const browserCreatorCursor = popup.creatorColumn().createCursorItem();
        const browserSmartCollectionCursor = popup.smartCollectionColumn().createCursorItem();
        const browserResultsCursor = popup.resultsColumn().createCursorItem();
        const selectedContent = popup.selectedContentTypeIndex();
        selectedContent.markInterested();

        new BindingBuilder(hal, popup.exists())
            .turns('param', moveCursor(browserCategoryCursor))
            .turns('value', moveCursor(browserResultsCursor))
            .click('paramButton', _ => popup.cancel())
            .click('valueButton', _ => popup.commit())
            .flips('button0', whenNumber(selectedContent, 0))
            .flips('button1', whenNumber(selectedContent, 1))
            .flips('button2', whenNumber(selectedContent, 2))
            .flips('button3', whenNumber(selectedContent, 3))
            .flips('button4', whenNumber(selectedContent, 4))
            .flips('button5', whenNumber(selectedContent, 5))
            .click('button6', _ => { })
            .flips('button7', popup.shouldAudition())
            .turns('B1P0', moveCursor(browserDeviceTypeCursor))
            .turns('B1P1', moveCursor(browserCategoryCursor))
            .turns('B1P2', moveCursor(browserCreatorCursor))
            .turns('B1P3', moveCursor(browserTagCursor))
            .turns('B1P4', moveCursor(browserDeviceCursor))
            .turns('B1P5', moveCursor(browserSmartCollectionCursor))
            .turns('B1P6', moveCursor(browserFileTypeCursor))
            .turns('B1P7', moveCursor(browserLocationCursor))
            .turns('B1P8', inc => { })
            .turns('B2P0', moveCursor(browserDeviceTypeCursor))
            .turns('B2P1', moveCursor(browserCategoryCursor))
            .turns('B2P2', moveCursor(browserCreatorCursor))
            .turns('B2P3', moveCursor(browserTagCursor))
            .turns('B2P4', moveCursor(browserDeviceCursor))
            .turns('B2P5', moveCursor(browserSmartCollectionCursor))
            .turns('B2P6', moveCursor(browserFileTypeCursor))
            .turns('B2P7', moveCursor(browserLocationCursor))
            .turns('B2P8', inc => { })
    }

    function setupModes() {
        const mainMode = ObservableMode<ModeType>('Sound', 'Multi', 'Browse');
        application.panelLayout().addValueObserver(layout => {
            if (mainMode.get() !== 'Browse') {
                switch (layout) {
                    case 'ARRANGE': mainMode.set('Sound'); break;
                    case 'MIX': mainMode.set('Multi'); break;
                    //default: mainMode.set('Sound'); break;
                }
            }
        });
        mainMode.Sound.addValueObserver(on => on && application.setPanelLayout("ARRANGE"));
        mainMode.Multi.addValueObserver(on => on && application.setPanelLayout("MIX"));

        mainMode.addValueObserver(mode => {
            hal.setDisplay('Mode', mode);
        });
        return mainMode;
    }

    function setupHostActions(application: Application): { [name: string]: { [name: string]: Action; }; } {
        const hostActions: { [name: string]: { [name: string]: Action; }; } = {};
        (() => {
            let cats = application.getActionCategories();
            for (let j = cats.length - 1; j >= 0; j--) {
                let cat: {
                    [name: string]: Action;
                } = {};
                hostActions[cats[j].getName()] = cat;
                let actions = cats[j].getActions();
                for (let i = 0; i < actions.length; i++)
                    cat[actions[i].getName()] = actions[i];
            }
        })();
        return hostActions;
    }
}

