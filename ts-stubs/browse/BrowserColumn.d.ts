/**
 * Instances of this interface are used to navigate a column in the Bitwig Studio browser.
 */
interface BrowserColumn extends ObjectProxy {
    /**  Registers an observer that reports if the column exists.
     * @param callback
              a callback function that receives a single boolean parameter */
    addExistsObserver(callback: BooleanCallback): void;
    /**  Value that reports the underlying total count of column entries (not the size of the column window).
     * @returnType {IntegerValue} */
    entryCount(): IntegerValue;
    /**  Returns the cursor item, which can be used to navigate over the list of entries.
     * @returnType {BrowserItem} the requested filter item object */
    createCursorItem(): BrowserItem;
    /**  Returns an object that provides access to a bank of successive entries using a window configured with
     * the given size, that can be scrolled over the list of entries.
     * @param size
              the number of simultaneously accessible items
     * @returnType {BrowserItemBank} the requested item bank object */
    createItemBank(size: number): BrowserItemBank;
}
