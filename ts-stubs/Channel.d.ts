/** This interface defines access to the common attributes and operations of channels, such as tracks or nested
 * device channels. */
interface Channel extends DeviceChain {
    /**  Returns an object that represents the activated state of the channel.
     * @returnType {SettableBooleanValue} an object that provides access to the channels activated state. */
    isActivated(): SettableBooleanValue;
    /**  Gets a representation of the channels volume control.
     * @returnType {Parameter} an object that provides access to the channels volume control. */
    volume(): Parameter;
    /**  Gets a representation of the channels pan control.
     * @returnType {Parameter} an object that provides access to the channels pan control. */
    pan(): Parameter;
    /**  Gets a representation of the channels mute control.
     * @returnType {SettableBooleanValue} an object that provides access to the channels mute control. */
    mute(): SettableBooleanValue;
    /**  Gets a representation of the channels solo control.
     * @returnType {SoloValue} an object that provides access to the channels solo control. */
    getSolo(): SoloValue;
    /**  Registers an observer for the VU-meter of this track.
     * @param range
              the number of steps to which the reported values should be scaled. For example a range of 128
              would cause the callback to be called with values between 0 and 127.
     * @param channel
              0 for left channel, 1 for right channel, -1 for the sum of both
     * @param peak
              when `true` the peak value is reported, otherwise the RMS value
     * @param callback
              a callback function that takes a single numeric argument. The value is in the range
              [0..range-1]. */
    addVuMeterObserver(range: number, channel: number, peak: boolean, callback: (value: number) => void): void;
    /**  Returns an array of the playing notes.
     * @returnType {PlayingNoteArrayValue} */
    playingNotes(): PlayingNoteArrayValue;
    /**  Get the color of the channel.
     * @returnType {SettableColorValue} */
    color(): SettableColorValue;
    /**  Gets a {SendBank} that can be used to navigate the sends of this channel.
     * @returnType {SendBank} */
    sendBank(): SendBank;
    /**  Duplicates the track. */
    duplicate(): void;
    /**  Selects the device chain in the Bitwig Studio mixer, in case it is a selectable object. */
    selectInMixer(): void;
    /**  Registers an observer that reports if the device chain is selected in Bitwig Studio mixer.
     * @param callback
              a callback function that takes a single boolean parameter. */
    addIsSelectedInMixerObserver(callback: (selected: boolean) => void): void;
    /**  Tries to scroll the contents of the arrangement editor so that the channel becomes visible. */
    makeVisibleInArranger(): void;
    /**  Tries to scroll the contents of the mixer panel so that the channel becomes visible. */
    makeVisibleInMixer(): void;
}
