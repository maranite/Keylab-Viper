/**
 * A generic interface that provides the foundation for working with selections.
 *
 * Implementations of this interface can either represent custom selection cursors that are created by
 * controller scripts, or represent the cursor of user selections as shown in Bitwig Studio editors, such as
 * the Arranger track selection cursor, the note editor event selection cursor and so on.
 */
interface Cursor {
    /**  Select the previous item. */
    selectPrevious(): void;
    /**  Select the next item. */
    selectNext(): void;
    /**  Select the first item. */
    selectFirst(): void;
    /**  Select the last item. */
    selectLast(): void;
    /**  Boolean value that reports whether there is an item after the current cursor position.
     * @returnType {BooleanValue} */
    hasNext(): BooleanValue;
    /**  Boolean value that reports whether there is an item before the current cursor position.
     * @returnType {BooleanValue} */
    hasPrevious(): BooleanValue;
}
