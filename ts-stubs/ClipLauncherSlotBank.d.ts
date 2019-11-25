/**
 * Instances of this interface represent a scrollable fixed-size window that is connected to a section of the
 * clip launcher slots for a specific track.
 *
 */
interface ClipLauncherSlotBank extends ClipLauncherSlotOrSceneBank<ClipLauncherSlot> {
    /**  Selects the slot with the given index.
     * @param slot
              the index of the slot within the slot window. */
    select(slot: number): void;
    /**  Starts recording into the slot with the given index.
     * @param slot
              the index of the slot within the slot window. */
    record(slot: number): void;
    /**  Makes the clip content of the slot with the given index visible in the note or audio editor.
     * @param slot
              the index of the slot within the slot window. */
    showInEditor(slot: number): void;
    /**  Creates an new clip in the slot with the given index.
     * @param {int} slot
     * @param {int} lengthInBeats */
    createEmptyClip(slot: number, lengthInBeats: number): void;
    /**  Deletes the clip in the slot with the given index.
     * @param slot
              the index of the slot within the slot window. */
    deleteClip(slot: number): void;
    /**  Duplicates the clip in the slot with the given index.
     * @param slot
              the index of the slot within the slot window. */
    duplicateClip(slot: number): void;
    /**  Registers an observer that reports selection changes for the slots inside the window.
     * @param callback
              a callback function that receives two parameters: 1. the slot index (integer), and 2. a
              boolean parameter indicating if the slot at that index is selected (`true`) or not (`false`) */
    addIsSelectedObserver(callback: (slotIndex: number, isSelected: boolean) => void): void;
    /**  Registers an observer that reports which slots contain clips.
     * @param callback
              a callback function that receives two parameters: 1. the slot index (integer), and 2. a
              boolean parameter indicating if the slot at that index contains a clip (`true`) or not
              (`false`) */
    addHasContentObserver(callback: (slotIndex: number, containsClip: boolean) => void): void;
    /**  Registers an observer that reports the playback state of clips / slots. The reported states include
     * `stopped`, `playing`, `recording`, but also `queued for stop`, `queued for playback`, `queued for
     * recording`.
     * @param callback
              a callback function that receives three parameters: 1. the slot index (integer), 2. the queued
              or playback state: `0` when stopped, `1` when playing, or `2` when recording, and 3. a boolean
              parameter indicating if the second argument is referring to the queued state (`true`) or the
              actual playback state (`false`) */
    addPlaybackStateObserver(callback: PlaybackStateChangedCallback): void;
    /**  Registers an observer that reports which slots have clips that are currently playing.
     * @param callback
              a callback function that receives two parameters: 1. the slot index (integer), and 2. a
              boolean parameter indicating if the slot at that index has a clip that is currently playing
              (`true`) or not (`false`) */
    addIsPlayingObserver(callback: IndexedBooleanCallback): void;
    /**  Registers an observer that reports which slots have clips that are currently recording.
     * @param callback
              a callback function that receives two parameters: 1. the slot index (integer), and 2. a
              boolean parameter indicating if the slot at that index has a clip that is currently recording
              (`true`) or not (`false`) */
    addIsRecordingObserver(callback: IndexedBooleanCallback): void;
    /**  Add an observer if clip playback is queued on the slot.
     * @param callback
              a callback function that receives two parameters: 1. the slot index (integer), and 2. a
              boolean parameter indicating if the slot at that index has a clip that is currently queued for
              playback (`true`) or not (`false`) */
    addIsPlaybackQueuedObserver(callback: IndexedBooleanCallback): void;
    /**  Add an observer if clip recording is queued on the slot.
     * @param callback
              a callback function that receives two parameters: 1. the slot index (integer), and 2. a
              boolean parameter indicating if the slot at that index has a clip that is currently queued for
              recording (`true`) or not (`false`) */
    addIsRecordingQueuedObserver(callback: IndexedBooleanCallback): void;
    /**  Add an observer if clip playback is queued to stop on the slot.
     * @param callback
              a callback function that receives two parameters: 1. the slot index (integer), and 2. a
              boolean parameter indicating if the slot at that index has a clip that is currently queued for
              stop (`true`) or not (`false`) */
    addIsStopQueuedObserver(callback: IndexedBooleanCallback): void;
    /**  Registers an observer that reports the colors of clip in the current slot window.
     * @param callback
              a callback function that receives four parameters: 1. the slot index (integer), 2. the red
              coordinate of the RBG color value, 3. the green coordinate of the RBG color value, and 4. the
              blue coordinate of the RBG color value */
    addColorObserver(callback: (slotIndex: number, red: number, green: number, blue: number) => void): void;
    /**  Specifies if the Bitwig Studio clip launcher should indicate which slots are part of the window. By
     * default indications are disabled.
     * @param shouldIndicate
              `true` if visual indications should be enabled, `false` otherwise */
    setIndication(shouldIndicate: boolean): void;
    /**  Returns an object that can be used to observe and toggle if the slots on a connected track group show
     * either scenes launch buttons (for launching the content of the track group) or the clips of the group
     * master track.
     * @returnType {SettableBooleanValue} a boolean value object. */
    isMasterTrackContentShownOnTrackGroups(): SettableBooleanValue;
}
