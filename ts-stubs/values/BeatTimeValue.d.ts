/**  Instances of this interface represent beat time values.  */
interface BeatTimeValue extends DoubleValue {
    /**  Gets the current beat time formatted according to the supplied formatter.
     * @param {BeatTimeFormatter} formatter
     * @returnType {string} */
    getFormatted(formatter: BeatTimeFormatter): string;
    /**  Gets the current beat time formatted according to the default beat time formatter.
     * @returnType {string} */
    getFormatted(): string;
}
