/**
 * Instances of this interface represent the cursor item of track selections.
 */
interface CursorTrack extends CursorChannel, PinnableCursor, Track {
    /**  Makes the cursor track point to it's parent group track, in case it is not already pointing to the root
     * group track. */
    selectParent(): void;
    /**  Makes the cursor track point to the first child found with the track group that this cursor currently
     * points to. If this cursor is not pointing to a track group or the track group is empty then this has no
     * effect. */
    selectFirstChild(): void;
    /**  Specifies the behaviour of the functions {#selectPrevious()}, {#selectNext()},
     * {#selectFirst()} and {#selectLast()}. Calling those functions can either navigate the cursor
     * within the current nesting level, or over a flat list of either all tracks or only the expanded tracks.
     * Default is CursorNavigationMode.FLAT.
     * @param {CursorNavigationMode} mode */
    setCursorNavigationMode(mode: CursorNavigationMode): void;
    /**  @returnType {PinnableCursorDevice} */
    createCursorDevice(): PinnableCursorDevice;
    /**  @param {string} name
     * @returnType {PinnableCursorDevice} */
    createCursorDevice(name: string): PinnableCursorDevice;
    /**  @param {string} name
     * @param {int} numSends
     * @returnType {PinnableCursorDevice} */
    createCursorDevice(name: string, numSends: number): PinnableCursorDevice;
    /**  Creates a {CursorDevice} for this cursor track that by default follows a device based on the
     * supplied follow mode.
     * @param id
              An id that is used to identify this cursor.
     * @param name
              A name that is displayed to the user for this cursor.
     * @param numSends
              the number of sends that are simultaneously accessible in nested channels.
     * @param {CursorDeviceFollowMode} followMode
              Mode that defines how this cursor should follow devices.
     * @returnType {PinnableCursorDevice} */
    createCursorDevice(id: any, name: string, numSends: number, followMode: CursorDeviceFollowMode): PinnableCursorDevice;
}
