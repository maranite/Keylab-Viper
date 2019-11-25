/**
 * An abstract interface that represents the clip launcher scenes or slots of a single track.
 *
 */
interface ClipLauncherSlotOrSceneBank<T extends ClipLauncherSlotOrScene> extends Bank<T> {
    /**  Launches the scene/slot with the given index.
     * @param slot
              the index of the slot that should be launched */
    launch(slot: number): void;
    /**  Stops clip launcher playback for the associated track. */
    stop(): void;
    /**  Performs a return-to-arrangement operation on the related track, which caused playback to be taken over
     * by the arrangement sequencer. */
    returnToArrangement(): void;
    /**  Registers an observer that reports the names of the scenes and slots. The slot names reflect the names
     * of containing clips.
     * @param callback
              a callback function receiving two parameters: 1. the slot index (integer) within the
              configured window, and 2. the name of the scene/slot (string) */
    addNameObserver(callback: (slotIndex: number, name: string) => void): void;
}
