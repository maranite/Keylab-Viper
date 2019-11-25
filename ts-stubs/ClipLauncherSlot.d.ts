interface ClipLauncherSlot extends ClipLauncherSlotOrScene {
    /**  Value that reports whether this slot is selected or not.
     * @returnType {BooleanValue} */
    isSelected(): BooleanValue;
    /**  Value that reports whether this slot has content or not.
     * @returnType {BooleanValue} */
    hasContent(): BooleanValue;
    /**  Value that reports whether this slot is playing or not.
     * @returnType {BooleanValue} */
    isPlaying(): BooleanValue;
    /**  Value that reports whether this slot is queued for playback or not.
     * @returnType {BooleanValue} */
    isPlaybackQueued(): BooleanValue;
    /**  Value that reports whether this slot is recording or not.
     * @returnType {BooleanValue} */
    isRecording(): BooleanValue;
    /**  Value that reports whether this slot is queued for recording or not.
     * @returnType {BooleanValue} */
    isRecordingQueued(): BooleanValue;
    /**  Value that reports whether this slot is queued for recording or not.
     * @returnType {BooleanValue} */
    isStopQueued(): BooleanValue;
    // /**  Value that reports the color of this slot.  */
    // color(): SettableColorValue;
    /**  Starts browsing for content that can be inserted in this slot in Bitwig Studio's popup browser.
     * */
    browseToInsertClip(): void;
}
