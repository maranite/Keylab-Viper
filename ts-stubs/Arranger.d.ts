/** Represents various commands which can be performed on the Bitwig Studio arranger.
 * To receive an instance of the application interface call host.createArranger().
 */
interface Arranger {
    /**  Gets an object that allows to enable/disable arranger playback follow. Observers can be registered on
     * the returned object for receiving notifications when the setting switches between on and off.
     * @returnType {SettableBooleanValue} a boolean value object that represents the enabled state of arranger playback follow */
    isPlaybackFollowEnabled(): SettableBooleanValue;
    /**  Gets an object that allows to control the arranger track height. Observers can be registered on the
     * returned object for receiving notifications when the track height changes.
     * @returnType {SettableBooleanValue} a boolean value object that has the state `true` when the tracks have double row height and
            `false` when the tracks have single row height. */
    hasDoubleRowTrackHeight(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the cue markers in the arranger panel. Observers can be
     * registered on the returned object for receiving notifications when the cue marker lane switches between
     * shown and hidden.
     * @returnType {SettableBooleanValue} a boolean value object that represents the cue marker section visibility */
    areCueMarkersVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the clip launcher in the arranger panel. Observers can be
     * registered on the returned object for receiving notifications when the clip launcher switches between
     * shown and hidden.
     * @returnType {SettableBooleanValue} a boolean value object that represents the clip launcher visibility */
    isClipLauncherVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the timeline in the arranger panel. Observers can be registered
     * on the returned object for receiving notifications when the timeline switches between shown and hidden.
     * @returnType {SettableBooleanValue} a boolean value object that represents the timeline visibility */
    isTimelineVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the track input/output choosers in the arranger panel. Observers
     * can be registered on the returned object for receiving notifications when the I/O section switches
     * between shown and hidden.
     * @returnType {SettableBooleanValue} a boolean value object that represents the visibility of the track I/O section */
    isIoSectionVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the effect tracks in the arranger panel. Observers can be
     * registered on the returned object for receiving notifications when the effect track section switches
     * between shown and hidden.
     * @returnType {SettableBooleanValue} a boolean value object that represents the visibility of the effect track section */
    areEffectTracksVisible(): SettableBooleanValue;
}
