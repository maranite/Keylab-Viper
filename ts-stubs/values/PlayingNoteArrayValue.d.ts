interface PlayingNoteArrayValue extends ObjectArrayValue<PlayingNote> {
    /**  @param {int} note
     * @returnType {boolean} */
    isNotePlaying(note: number): boolean;
}
