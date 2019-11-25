/**
 * Instances of this interface represent tracks in Bitwig Studio.
 *
 */
interface Track extends Channel {
    /**  Value that reports the position of the track within the list of Bitwig Studio tracks.
     * @returnType {IntegerValue} */
    position(): IntegerValue;
    /**  Returns an object that can be used to access the clip launcher slots of the track.
     * @returnType {ClipLauncherSlotBank} an object that represents the clip launcher slots of the track */
    clipLauncherSlotBank(): ClipLauncherSlotBank;
    /**  Returns an object that provides access to the arm state of the track.
     * @returnType {SettableBooleanValue} a boolean value object */
    arm(): SettableBooleanValue;
    /**  Returns an object that provides access to the monitoring state of the track.
     * @returnType {SettableBooleanValue} a boolean value object */
    monitor(): SettableBooleanValue;
    /**  Returns an object that provides access to the auto-monitoring state of the track.
     * @returnType {SettableBooleanValue} a boolean value object */
    autoMonitor(): SettableBooleanValue;
    /**  Returns an object that provides access to the cross-fade mode of the track.
     * @returnType {SettableEnumValue} an enum value object that has three possible states: "A", "B", or "AB" */
    crossFadeMode(): SettableEnumOf<"A" | "B" | "AB">;
    /**  Value that reports if this track is currently stopped. When a track is stopped it is not playing content
     * from the arranger or clip launcher.
     * @returnType {BooleanValue} */
    isStopped(): BooleanValue;
    /**  Value that reports if the clip launcher slots are queued for stop.
     * @returnType {BooleanValue} */
    isQueuedForStop(): BooleanValue;
    /**  Returns the source selector for the track, which is shown in the IO section of the track in Bitwig
     * Studio and lists either note or audio sources or both depending on the track type.
     * @returnType {SourceSelector} a source selector object */
    sourceSelector(): SourceSelector;
    /**  Stops playback of the track.
     * */
    stop(): void;
    /**  Calling this method causes the arrangement sequencer to take over playback.
     * */
    returnToArrangement(): void;
    /**  Updates the name of the track.
     * @param name
              the new track name */
    setName(name: string): void;
    /**  Registers an observer that reports names for note key values on this track. The track might provide
     * special names for certain keys if it contains instruments that support that features, such as the Bitwig
     * Drum Machine.
     * @param callback
              a callback function that receives two arguments: 1. the key value in the range [0..127], and
              2. the name string */
    addPitchNamesObserver(callback: (pitch: number, name: string) => void): void;
    /**  Plays a note on the track with a default duration and the given key and velocity.
     * @param key
              the key value of the played note
     * @param velocity
              the velocity of the played note */
    playNote(key: number, velocity: number): void;
    /**  Starts playing a note on the track with the given key and velocity.
     * @param key
              the key value of the played note
     * @param velocity
              the velocity of the played note */
    startNote(key: number, velocity: number): void;
    /**  Stops playing a currently played note.
     * @param key
              the key value of the playing note
     * @param velocity
              the note-off velocity */
    stopNote(key: number, velocity: number): void;
    /**  Sends a MIDI message to the hardware device.
     * @param status
              the status byte of the MIDI message
     * @param data1
              the data1 part of the MIDI message
     * @param data2
              the data2 part of the MIDI message */
    sendMidi(status: number, data1: number, data2: number): void;
    /**  Value that reports the track type. Possible reported track types are `Group`, `Instrument`, `Audio`,
     * `Hybrid`, `Effect` or `Master`.
     * @returnType {StringValue} */
    trackType(): StringValueOf<'Group' | 'Instrument' | 'Audio' | 'Hybrid' | 'Effect' | 'Master'>;
    //StringValue;
    /**  Value that reports if the track may contain child tracks, which is the case for group tracks.
     * @returnType {BooleanValue} */
    isGroup(): BooleanValue;
    /**  Returns an object that indicates if the track may contain notes.
     * @returnType {SettableBooleanValue} a boolean value object */
    canHoldNoteData(): SettableBooleanValue;
    /**  Returns an object that indicates if the track may contain audio events.
     * @returnType {SettableBooleanValue} a boolean value object */
    canHoldAudioData(): SettableBooleanValue;
    /**  Returns an object that provides access to the cursor item of the track's device selection as shown in
     * the Bitwig Studio user interface.
     * @returnType {CursorDevice} the requested device selection cursor object */
    createCursorDevice(): CursorDevice;
    /**  Creates a named device selection cursor that is independent from the device selection in the Bitwig
     * Studio user interface, assuming the name parameter is not null. When `name` is `null` the result is
     * equal to calling {Track#createCursorDevice}.
     * @param name
              the name of the custom device selection cursor, for example "Primary", or `null` to refer to
              the device selection cursor in the arranger cursor track as shown in the Bitwig Studio user
              interface.
     * @returnType {CursorDevice} the requested device selection cursor object
    @see Track#createCursorDevice */
    createCursorDevice(name?: string): CursorDevice;
    /**  Creates a named device selection cursor that is independent from the device selection in the Bitwig
     * Studio user interface, assuming the name parameter is not null. When `name` is `null` the result is
     * equal to calling {Track#createCursorDevice}.
     * @param name
              the name of the custom device selection cursor, for example "Primary", or `null` to refer to
              the device selection cursor in the arranger cursor track as shown in the Bitwig Studio user
              interface.
     * @param numSends
              the number of sends that are simultaneously accessible in nested channels.
     * @returnType {CursorDevice} the requested device selection cursor object
    @see Track#createCursorDevice */
    createCursorDevice(name: string | null, numSends: number): CursorDevice;
    /**  Returns a track bank with the given number of child tracks, sends and scenes. The track bank will only
     * have content if the connected track is a group track.
     *
     * A track bank can be seen as a fixed-size window onto the list of tracks in the connected track group
     * including their sends and scenes, that can be scrolled in order to access different parts of the track
     * list. For example a track bank configured for 8 tracks can show track 1-8, 2-9, 3-10 and so on.
     * The track bank returned by this function provides a convenient interface for controlling which tracks
     * are currently shown on the hardware.
     *
     * Creating a track bank using this method will consider all tracks in the document, including effect
     * tracks and the master track. Use {#createMainTrackBank} or {#createEffectTrackBank} in case
     * you are only interested in tracks of a certain kind.
     * @param numTracks
              the number of child tracks spanned by the track bank
     * @param numSends
              the number of sends spanned by the track bank
     * @param numScenes
              the number of scenes spanned by the track bank
     * @param hasFlatTrackList
              specifies whether the track bank should operate on a flat list of all nested child tracks or
              only on the direct child tracks of the connected group track.
     * @returnType {TrackBank} an object for bank-wise navigation of tracks, sends and scenes */
    createTrackBank(numTracks: number, numSends: number, numScenes: number, hasFlatTrackList: boolean): TrackBank;
    /**  Returns a track bank with the given number of child tracks, sends and scenes. Only audio tracks,
     * instrument tracks and hybrid tracks are considered. The track bank will only have content if the
     * connected track is a group track. For more information about track banks and the `bank pattern` in
     * general, see the documentation for {#createTrackBank}.
     * @param numTracks
              the number of child tracks spanned by the track bank
     * @param numSends
              the number of sends spanned by the track bank
     * @param numScenes
              the number of scenes spanned by the track bank
     * @param hasFlatTrackList
              specifies whether the track bank should operate on a flat list of all nested child tracks or
              only on the direct child tracks of the connected group track.
     * @returnType {TrackBank} an object for bank-wise navigation of tracks, sends and scenes */
    createMainTrackBank(numTracks: number, numSends: number, numScenes: number, hasFlatTrackList: boolean): TrackBank;
    /**  Returns a track bank with the given number of child effect tracks and scenes. Only effect tracks are
     * considered. The track bank will only have content if the connected track is a group track. For more
     * information about track banks and the `bank pattern` in general, see the documentation for
     * {#createTrackBank}.
     * @param numTracks
              the number of child tracks spanned by the track bank
     * @param numScenes
              the number of scenes spanned by the track bank
     * @param hasFlatTrackList
              specifies whether the track bank should operate on a flat list of all nested child tracks or
              only on the direct child tracks of the connected group track.
     * @returnType {TrackBank} an object for bank-wise navigation of tracks, sends and scenes */
    createEffectTrackBank(numTracks: number, numScenes: number, hasFlatTrackList: boolean): TrackBank;
    /**  Returns an object that represents the master track of the connected track group. The returned object
     * will only have content if the connected track is a group track.
     * @param numScenes
              the number of scenes for bank-wise navigation of the master tracks clip launcher slots.
     * @returnType {MasterTrack} an object representing the master track of the connected track group. */
    createMasterTrack(numScenes: number): MasterTrack;
    /**  Returns a bank of sibling tracks with the given number of tracks, sends and scenes. For more information
     * about track banks and the `bank pattern` in general, see the documentation for {#createTrackBank}.
     * @param numTracks
              the number of child tracks spanned by the track bank
     * @param numSends
              the number of sends spanned by the track bank
     * @param numScenes
              the number of scenes spanned by the track bank
     * @param shouldIncludeEffectTracks
              specifies whether effect tracks should be included
     * @param shouldIncludeMasterTrack
              specifies whether the master should be included
     * @returnType {TrackBank} an object for bank-wise navigation of sibling tracks */
    createSiblingsTrackBank(numTracks: number, numSends: number, numScenes: number, shouldIncludeEffectTracks: boolean, shouldIncludeMasterTrack: boolean): TrackBank;
    /** InsertionPoint that can be used to insert after this track.
     * @returnType InsertionPoint  */
    afterTrackInsertionPoint(): InsertionPoint;
    /** InsertionPoint that can be used to insert after this track.
     * @returnType InsertionPoint      */
    beforeTrackInsertionPoint(): InsertionPoint;
}
