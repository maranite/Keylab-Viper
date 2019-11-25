/** An interface representing the transport section in Bitwig Studio.  */
interface Transport extends ObjectProxy {
    /**  Starts playback in the Bitwig Studio transport. */
    play(): void;
    /**  Stops playback in the Bitwig Studio transport. */
    stop(): void;
    /**  Toggles the transport playback state between playing and stopped. */
    togglePlay(): void;
    /**  When the transport is stopped, calling this function starts transport playback, otherwise the transport
     * is first stopped and the playback is restarted from the last play-start position. */
    restart(): void;
    /**  Starts recording in the Bitwig Studio transport. */
    record(): void;
    /**  Rewinds the Bitwig Studio transport to the beginning of the arrangement. */
    rewind(): void;
    /**  Calling this function is equivalent to pressing the fast forward button in the Bitwig Studio transport. */
    fastForward(): void;
    /**  When calling this function multiple times, the timing of those calls gets evaluated and causes
     * adjustments to the project tempo. */
    tapTempo(): void;
    /**  Value that reports if the Bitwig Studio transport is playing.
     * @returnType {SettableBooleanValue} */
    isPlaying(): SettableBooleanValue;
    /**  Value that reports if the Bitwig Studio transport is recording.
     * @returnType {SettableBooleanValue} */
    isArrangerRecordEnabled(): SettableBooleanValue;
    /**  Value that reports if overdubbing is enabled in Bitwig Studio.
     * @returnType {SettableBooleanValue} */
    isArrangerOverdubEnabled(): SettableBooleanValue;
    /**  Value reports if clip launcher overdubbing is enabled in Bitwig Studio.
     * @returnType {SettableBooleanValue} */
    isClipLauncherOverdubEnabled(): SettableBooleanValue;
    /**  Value that reports the current automation write mode. Possible values are `"latch"`, `"touch"` or
     * `"write"`.
     * @returnType {SettableEnumValue} */
    automationWriteMode(): SettableEnumOf<"latch" | "touch" | "write">;
    /**  Value that reports if automation write is currently enabled for the arranger.
     * @returnType {SettableBooleanValue} */
    isArrangerAutomationWriteEnabled(): SettableBooleanValue;
    /**  Value that reports if automation write is currently enabled on the clip launcher.
     * @returnType {SettableBooleanValue} */
    isClipLauncherAutomationWriteEnabled(): SettableBooleanValue;
    /**  Value that indicates if automation override is currently on.
     * @returnType {BooleanValue} */
    isAutomationOverrideActive(): BooleanValue;
    /**  Value that indicates if the loop is currently active or not.
     * @returnType {SettableBooleanValue} */
    isArrangerLoopEnabled(): SettableBooleanValue;
    /**  Value that reports if punch-in is enabled in the Bitwig Studio transport.
     * @returnType {SettableBooleanValue} */
    isPunchInEnabled(): SettableBooleanValue;
    /**  Value that reports if punch-in is enabled in the Bitwig Studio transport.
     * @returnType {SettableBooleanValue} */
    isPunchOutEnabled(): SettableBooleanValue;
    /**  Value that reports if the metronome is enabled in Bitwig Studio.
     * @returnType {SettableBooleanValue} */
    isMetronomeEnabled(): SettableBooleanValue;
    /**  Value that reports if the metronome has tick playback enabled.
     * @returnType {SettableBooleanValue} */
    isMetronomeTickPlaybackEnabled(): SettableBooleanValue;
    /**  Value that reports the metronome volume.
     * @returnType {SettableRangedValue} */
    metronomeVolume(): SettableRangedValue;
    /**  Value that reports if the metronome is audible during pre-roll.
     * @returnType {SettableBooleanValue} */
    isMetronomeAudibleDuringPreRoll(): SettableBooleanValue;
    /**  Value that reports the current pre-roll setting. Possible values are `"none"`, `"one_bar"`,
     * `"two_bars"`, or `"four_bars"`.
     * @returnType {SettableEnumValue} */
    preRoll(): SettableEnumOf<"none" | "one_bar" | "two_bars" | "four_bars">;
    /**  Toggles the latch automation write mode in the Bitwig Studio transport. */
    toggleLatchAutomationWriteMode(): void;
    /**  Toggles the arranger automation write enabled state of the Bitwig Studio transport. */
    toggleWriteArrangerAutomation(): void;
    /**  Toggles the clip launcher automation write enabled state of the Bitwig Studio transport. */
    toggleWriteClipLauncherAutomation(): void;
    /**  Resets any automation overrides in Bitwig Studio. */
    resetAutomationOverrides(): void;
    /**  Switches playback to the arrangement sequencer on all tracks. */
    returnToArrangement(): void;
    /**  Returns an object that provides access to the project tempo.
     * @returnType {Parameter} the requested tempo value object */
    tempo(): Parameter;
    /**  Increases the project tempo value by the given amount, which is specified relative to the given range.
     * @param amount
              the new tempo value relative to the specified range. Values should be in the range
              [0..range-1].
     * @param range
              the range of the provided amount value */
    increaseTempo(amount: number, range: number): void;
    /**  Returns an object that provides access to the transport position in Bitwig Studio.
     * @returnType {SettableBeatTimeValue} a beat time object that represents the transport position */
    getPosition(): SettableBeatTimeValue;
    /**  Sets the transport playback position to the given beat time value.
     * @param beats
              the new playback position in beats */
    setPosition(beats: number): void;
    /**  Increases the transport position value by the given number of beats, which is specified relative to the given range.
     * @param beats
              the beat time value that gets added to the current transport position. Values have double
              precision and can be positive or negative.
     * @param snap
              when `true` the actual new transport position will be quantized to the beat grid, when `false`
              the position will be increased exactly by the specified beat time */
    incPosition(beats: number, snap: boolean): void;
    /**  Returns an object that provides access to the punch-in position in the Bitwig Studio transport.
     * @returnType {SettableBeatTimeValue} a beat time object that represents the punch-in position */
    getInPosition(): SettableBeatTimeValue;
    /**  Returns an object that provides access to the punch-out position in the Bitwig Studio transport.
     * @returnType {SettableBeatTimeValue} a beat time object that represents the punch-out position */
    getOutPosition(): SettableBeatTimeValue;
    /**  Returns an object that provides access to the cross-fader, used for mixing between A/B-channels as
     * specified on the Bitwig Studio tracks.
     * @returnType {Parameter} */
    crossfade(): Parameter;
    /**  Returns an object that provides access to the transport time signature.
     * @returnType {TimeSignatureValue} the time signature value object that represents the transport time signature. */
    timeSignature(): TimeSignatureValue;
    /**  Value that reports the current clip launcher post recording action. Possible values are `"off"`,
     * `"play_recorded"`, `"record_next_free_slot"`, `"stop"`, `"return_to_arrangement"`,
     * `"return_to_previous_clip"` or `"play_random"`.
     * @returnType {SettableEnumValue} */
    clipLauncherPostRecordingAction(): SettableEnumOf<"off" | "play_recorded" | "record_next_free_slot" | "stop" | "return_to_arrangement" | "return_to_previous_clip" | "play_random">;
    /**  Returns an object that provides access to the clip launcher post recording time offset.
     * @returnType {SettableBeatTimeValue} a beat time object that represents the post recording time offset */
    getClipLauncherPostRecordingTimeOffset(): SettableBeatTimeValue;
    /** Setting for the default launch quantization. Possible values are "none", "8", "4", "2", "1", "1/2", "1/4", "1/8", "1/16". */
    defaultLaunchQuantization(): SettableEnumOf<"none" | "8" | "4" | "2" | "1" | "1/2" | "1/4" | "1/8" | "1/16">;
}
