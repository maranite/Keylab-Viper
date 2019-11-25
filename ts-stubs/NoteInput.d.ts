/**
 * Instances of this interface implement note input functionality used for recording notes in Bitwig Studio
 * and for playing the instruments in tracks on hardware keyboards. In Bitwig Studio the note inputs are shown
 * in the input choosers of Bitwig Studio tracks.
 *
 */
declare class NoteInput {
    /**  Specifies if the note input should consume MIDI notes, or in other words if it should prevent forwarding
     * incoming notes to the MIDI callback registered in {MidiIn#setMidiCallback}. This setting is `true`
     * by default.
     * @param shouldConsumeEvents
              `true` if note events should be consumed, `false` of the events should be additionally sent to
              the callback registered via {MidiIn#setMidiCallback} */
    setShouldConsumeEvents(shouldConsumeEvents: boolean): void;
    /**  Specifies a translation table which defines the actual key value (0-127) of notes arriving in Bitwig
     * Studio for each note key potentially received from the hardware. This is used for note-on/off and
     * polyphonic aftertouch events. Specifying a value of `-1` for a key means that notes with the key value
     * will be filtered out.
     *
     * Typically this method is used to implement transposition or scale features in controller scripts. By
     * default an identity transform table is configured, which means that all incoming MIDI notes keep their
     * original key value when being sent into Bitwig Studio.
     * @param table
              an array which should contain 128 entries. Each entry should be a note value in the range
              [0..127] or -1 in case of filtering. */
    setKeyTranslationTable(table: number[]): void;
    /**  Specifies a translation table which defines the actual velocity value (0-127) of notes arriving in
     * Bitwig Studio for each note velocity potentially received from the hardware. This is used for note-on
     * events only.
     *
     * Typically this method is used to implement velocity curves or fixed velocity mappings in controller
     * scripts. By default an identity transform table is configured, which means that all incoming MIDI notes
     * keep their original velocity when being sent into Bitwig Studio.
     * @param table
              an array which should contain 128 entries. Each entry should be a note value in the range
              [0..127] or -1 in case of filtering. */
    setVelocityTranslationTable(table: number[]): void;
    /**  Assigns polyphonic aftertouch MIDI messages to the specified note expression. Multi-dimensional control
     * is possible by calling this method several times with different MIDI channel parameters. If a key
     * translation table is configured by calling {#setKeyTranslationTable}, that table is used for
     * polyphonic aftertouch as well.
     * @param channel
              the MIDI channel to map, range [0..15]
     * @param expression
              the note-expression to map for the given MIDI channel
     * @param pitchRange
              the pitch mapping range in semitones, values must be in the range [1..24]. This parameter is
              ignored for non-pitch expressions.
    @since API version 1 */
    assignPolyphonicAftertouchToExpression(channel: number, expression: NoteExpression, pitchRange: number): void;
    /**  Enables use of Expressive MIDI mode. (note-per-channel)
     * @param useExpressiveMidi
              enabled/disable the MPE mode for this note-input
     * @param baseChannel
              which channel (must be either 0 or 15) which is used as the base for this note-input
     * @param pitchBendRange
              initial pitch bend range used */
    setUseExpressiveMidi(useExpressiveMidi: boolean, baseChannel: number, pitchBendRange: number): void;
    /**  Sends MIDI data directly to the note input. This will bypass both the event filter and translation
     *   tables. The MIDI channel of the message will be ignored.
     * @param status
              the status byte of the MIDI message
     * @param data0
              the data0 part of the MIDI message
     * @param data1
              the data1 part of the MIDI message */
    sendRawMidiEvent(status: number, data0: number, data1: number): void;
}
