/** Defines a formatter for a beat time that can convert a beat time to a string for display to the user. */
interface BeatTimeFormatter {
    /**  Formats the supplied beat time as a string in the supplied time signature.
     * @param {double} beatTime
     * @param {boolean} isAbsolute
     * @param {int} timeSignatureNumerator
     * @param {int} timeSignatureDenominator
     * @param {int} timeSignatureTicks
     * @returnType {string} */
    formatBeatTime(beatTime: number, isAbsolute: boolean, timeSignatureNumerator: number, timeSignatureDenominator: number, timeSignatureTicks: string): string;
}
