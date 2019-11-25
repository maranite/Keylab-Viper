/**
 * Defines an insertion point where various objects can be inserted as if the user had dragged and dropped
 * them to this insertion point (e.g with the mouse). Some things may not make sense to insert in which case
 * nothing happens.
 *
 * @since API version 7
 */
interface InsertionPoint {
    /**
     * Copies the supplied tracks to this insertion point. If it's not possible to do so then this does
     * nothing.
     *
     * @param {Track} tracks
     */
    copyTracks(...track: Track[]): void;
    /**
     * Moves the supplied tracks to this insertion point. If it's not possible to do so then this does nothing.
     *
     * @param {Track} tracks
     */
    moveTracks(...tracks: Track[]): void;
    /**
     * Copies the supplied devices to this insertion point. If it's not possible to do so then this does
     * nothing.
     *
     * @param {Device} devices
     */
    copyDevices(...devices: Device[]): void;
    /**
     * Moves the supplied devices to this insertion point. If it's not possible to do so then this does
     * nothing.
     *
     * @param {Device} devices
     */
    moveDevices(...devices: Device[]): void;
    /**
     * Copies the supplied slots or scenes to this insertion point. If it's not possible to do so then this
     * does nothing.
     *
     * @param {ClipLauncherSlotOrScene} clipLauncherSlotOrScenes
     */
    copySlotsOrScenes(...clipLauncherSlotOrScenes: ClipLauncherSlotOrScene[]): void;
    /**
     * Moves the supplied slots or scenes to this insertion point. If it's not possible to do so then this does
     * nothing.
     *
     * @param {ClipLauncherSlotOrScene} clipLauncherSlotOrScenes
     */
    moveSlotsOrScenes(...clipLauncherSlotOrScenes: ClipLauncherSlotOrScene[]): void;
    /**
     * Inserts the supplied file at this insertion point. If it's not possible to do so then this does nothing.
     *
     * @param {string} path
     */
    insertFile(path: string): void;
    /**
     * Inserts a VST2 plugin device with the supplied id at this insertion point. If the plugin is unknown or
     * it's not possible to insert a plugin here then his does nothing.
     *
     * @param id
              The VST2 plugin id to insert
     */
    insertVST2Device(id: string): void;
    /**
     * Inserts a VST3 plugin device with the supplied id at this insertion point. If the plugin is unknown or
     * it's not possible to insert a plugin here then his does nothing.
     *
     * @param id
              The VST2 plugin id to insert
     */
    insertVST3Device(id: string): void;
    /**
     * Pastes the contents of the clipboard at this insertion point.
     */
    paste(): void;
    /**
     * Starts browsing using the popup browser for something to insert at this insertion point.
     */
    browse(): void;
}
