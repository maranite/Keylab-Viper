/**
 * A bank provides access to a range of items in Bitwig Studio. Instances of a bank are configured with a
 * fixed number of items and represent an excerpt of a larger list of items. Various methods are provided for
 * scrolling to different sections of the item list. It basically acts like a window moving over the list of
 * underlying items.
 */
interface Bank<ItemType extends ObjectProxy> extends ObjectProxy, Scrollable {
    /** The fixed size of this bank. This will be initially equal to getCapacityOfBank().  */
    getSizeOfBank(): number;
    /** Sets the size of this bank
        @param size	- number of items in the bank. Must be > 0 and <= to getCapacityOfBank(). */
    setSizeOfBank(size: number): void;
    /** The maximum number of items in the bank which is defined when the bank is initially created.*/
    getCapacityOfBank(): number;
    /** Scrolls forwards by one page. */
    scrollPageForwards(): void;
    /** Scrolls backwards by one page. */
    scrollPageBackwards(): void;
    /**  Gets the item in the bank at the supplied index. The index must be >= 0 and < {#getSizeOfBank()}.
     * @param {int} index  */
    getItemAt(index: number): ItemType;
    /**  Value that reports the underlying total item count (not the number of items available in the bank window).
     * @returnType {IntegerValue} */
    itemCount(): IntegerValue;
    /**  An integer value that defines the location of the cursor that this bank is following. If there is no
     * cursor or the cursor is not within the bank then the value is -1.
     * @returnType {SettableIntegerValue} */
    cursorIndex(): SettableIntegerValue;
}
