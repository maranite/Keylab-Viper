/** Mode that defines how a {CursorDevice} follows a device within the {CursorTrack} it is created
 * for by default. The user can still override this on a track by track basis but this defines a default
 * follow mode when the user has not done this. */
declare enum CursorDeviceFollowMode {
    /**Follows the device selection made by the user in the track.	 */
    FOLLOW_SELECTION = 0,
    /**  Selects the first device in the track if there is one.	 */
    FIRST_DEVICE = 1,
    /**  Selects the first instrument in the track if there is one. */
    FIRST_INSTRUMENT = 2,
    /** Selects the first audio effect in the track if there is one.	 */
    FIRST_AUDIO_EFFECT = 3,
    /**  Selects the first instrument or if there is no instrument the first device.	 */
    FIRST_INSTRUMENT_OR_DEVICE = 4
}
