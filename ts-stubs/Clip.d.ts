/** An interface that provides access to the contents of a clip in Bitwig Studio.
 * The note content of the clip is exposed in terms of steps and keys, mainly targeted to x-y-grid* applications such as step sequencers. */
interface Clip extends ObjectProxy {
    /**  Scroll the note grid so that the given key becomes visible.
     * @param key
              the key that should become visible */
    scrollToKey(key: number): void;
    /**  Scrolls the note grid keys one page up. For example if the note grid is configured to show 12 keys and
     * is currently showing keys [36..47], calling this method would scroll the note grid to key range
     * [48..59]. */
    scrollKeysPageUp(): void;
    /**  Scrolls the note grid keys one page down. For example if the note grid is configured to show 12 keys and
     * is currently showing keys [36..47], calling this method would scroll the note grid to key range
     * [48..59]. */
    scrollKeysPageDown(): void;
    /**  Scrolls the note grid keys one key up. For example if the note grid is configured to show 12 keys and is
     * currently showing keys [36..47], calling this method would scroll the note grid to key range [37..48]. */
    scrollKeysStepUp(): void;
    /**  Scrolls the note grid keys one key down. For example if the note grid is configured to show 12 keys and
     * is currently showing keys [36..47], calling this method would scroll the note grid to key range
     * [35..46]. */
    scrollKeysStepDown(): void;
    /**  Scroll the note grid so that the given step becomes visible.
     * @param step
              the step that should become visible */
    scrollToStep(step: number): void;
    /**  Scrolls the note grid steps one page forward. For example if the note grid is configured to show 16
     * steps and is currently showing keys [0..15], calling this method would scroll the note grid to key range
     * [16..31]. */
    scrollStepsPageForward(): void;
    /**  Scrolls the note grid steps one page backwards. For example if the note grid is configured to show 16
     * steps and is currently showing keys [16..31], calling this method would scroll the note grid to key
     * range [0..16]. */
    scrollStepsPageBackwards(): void;
    /**  Scrolls the note grid steps one step forward. For example if the note grid is configured to show 16
     * steps and is currently showing keys [0..15], calling this method would scroll the note grid to key range
     * [1..16]. */
    scrollStepsStepForward(): void;
    /**  Scrolls the note grid steps one step backwards. For example if the note grid is configured to show 16
     * steps and is currently showing keys [1..16], calling this method would scroll the note grid to key range
     * [0..15]. */
    scrollStepsStepBackwards(): void;
    /**  Value that reports if the note grid keys can be scrolled further up.
     * @returnType {BooleanValue} */
    canScrollKeysUp(): BooleanValue;
    /**  Value that reports if the note grid keys can be scrolled further down.
     * @returnType {BooleanValue} */
    canScrollKeysDown(): BooleanValue;
    /**  Value that reports if the note grid if the note grid steps can be scrolled backwards.
     * @returnType {BooleanValue} */
    canScrollStepsBackwards(): BooleanValue;
    /**  Value that reports if the note grid if the note grid steps can be scrolled forwards.
     * @returnType {BooleanValue} */
    canScrollStepsForwards(): BooleanValue;
    /**  Toggles the existence of a note in the note grid cell specified by the given x and y arguments.
     * @param x
              the x position within the note grid, defining the step/time of the target note
     * @param y
              the y position within the note grid, defining the key of the target note
     * @param insertVelocity
              the velocity of the target note in case a new note gets inserted */
    toggleStep(x: number, y: number, insertVelocity: number): void;
    /**  Creates a note in the grid cell specified by the given x and y arguments. Existing notes are
     * overwritten.
     * @param x
              the x position within the note grid, defining the step/time of the new note
     * @param y
              the y position within the note grid, defining the key of the new note
     * @param insertVelocity
              the velocity of the new note
     * @param insertDuration
              the duration of the new note */
    setStep(x: number, y: number, insertVelocity: number, insertDuration: number): void;
    /**  Removes the note in the grid cell specified by the given x and y arguments. Calling this method does
     * nothing in case no note exists at the given x-y-coordinates.
     * @param x
              the x position within the note grid, defining the step/time of the target note
     * @param y
              the y position within the note grid, defining the key of the target note */
    clearStep(x: number, y: number): void;
    /**  Removes all notes in the grid row specified by the given y argument.
     * @param y
              the y position within the note grid, defining the key of the target note */
    clearSteps(y: number): void;
    /**  Removes all notes in the grid. */
    clearSteps(): void;
    /**  Selects the note in the grid cell specified by the given x and y arguments, in case there actually is a
     * note at the given x-y-coordinates.
     * @param x
              the x position within the note grid, defining the step/time of the target note
     * @param y
              the y position within the note grid, defining the key of the target note
     * @param clearCurrentSelection
              `true` if the existing selection should be cleared, {@false} if the note should be added to
              the current selection. */
    selectStepContents(x: number, y: number, clearCurrentSelection: boolean): void;
    /**  Sets the beat time duration that is represented by one note grid step.
     * @param lengthInBeatTime
              the length of one note grid step in beat time. */
    setStepSize(lengthInBeatTime: number): void;
    /**  Registers an observer that reports which note grid steps/keys contain notes.
     * @param callback
              A callback function that receives three parameters: 1. the x (step) coordinate within the note
              grid (integer), 2. the y (key) coordinate within the note grid (integer), and 3. an integer
              value that indicates if the step is empty (`0`) or if a note continues playing (`1`) or starts
              playing (`2`). */
    addStepDataObserver(callback: (x: number, y: number, noteState: number) => void): void;
    /**  Value that reports note grid cells as they get played by the sequencer.
     * @returnType {IntegerValue} */
    playingStep(): IntegerValue;
    /**  Updates the name of the clip.
     * @param name
              the new clip name */
    setName(name: string): void;
    /**  Returns shuffle settings of the clip.
     * @returnType {SettableBooleanValue} the value object that represents the clips shuffle setting. */
    getShuffle(): SettableBooleanValue;
    /**  Returns accent setting of the clip.
     * @returnType {SettableRangedValue} the ranged value object that represents the clips accent setting. */
    getAccent(): SettableRangedValue;
    /**  Returns the start of the clip in beat time.
     * @returnType {SettableBeatTimeValue} the beat time object that represents the clips start time. */
    getPlayStart(): SettableBeatTimeValue;
    /**  Returns the length of the clip in beat time.
     * @returnType {SettableBeatTimeValue} the beat time object that represents the duration of the clip. */
    getPlayStop(): SettableBeatTimeValue;
    /**  Returns an object that provides access to the loop enabled state of the clip.
     * @returnType {SettableBooleanValue} a boolean value object. */
    isLoopEnabled(): SettableBooleanValue;
    /**  Returns the loop start time of the clip in beat time.
     * @returnType {SettableBeatTimeValue} the beat time object that represents the clips loop start time. */
    getLoopStart(): SettableBeatTimeValue;
    /**  Returns the loop length of the clip in beat time.
     * @returnType {SettableBeatTimeValue} the beat time object that represents the clips loop length. */
    getLoopLength(): SettableBeatTimeValue;
    /**  Get the color of the clip.
     * @returnType {SettableColorValue} */
    color(): SettableColorValue;
    /**  Duplicates the clip. */
    duplicate(): void;
    /**  Duplicates the content of the clip. */
    duplicateContent(): void;
    /**  Transposes all notes in the clip by the given number of semitones.
     * @param semitones
              the amount of semitones to transpose, can be a positive or negative integer value. */
    transpose(semitones: number): void;
    /**  Quantizes the start time of all notes in the clip according to the given amount. The note lengths remain the same as before.
     * @param amount
              a factor between `0` and `1` that allows to morph between the original note start and the quantized note start. */
    quantize(amount: number): void;
    /**  Gets the track that contains the clip.
     * @returnType {Track} a track object that represents the track which contains the clip. */
    getTrack(): Track;
    /** Setting for the default launch quantization.
     * Possible values are `"default"`, `"none"`, `"8"`, `"4"`, `"2"`, `"1"`, `"1/2"`, `"1/4"`, `"1/8"`,`"1/16"`.
     */
    launchQuantization(): SettableEnumOf<"default" | "none" | "8" | "4" | "2" | "1" | "1/2" | "1/4" | "1/8">;
    /**  Setting "Q to loop" in the inspector.   */
    useLoopStartAsQuantizationReference(): SettableBooleanValue;
    /** Setting "Launch Mode" from the inspector. */
    launchMode(): SettableEnumValue;
}
