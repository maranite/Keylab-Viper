/** Instances of this interface are used to navigate a results column in the Bitwig Studio browser. */
interface BrowserResultsColumn extends BrowserColumn {
    /** Returns the cursor result item, which can be used to navigate over the list of entries.
    *   MW: I messed with this to see whether Bitwig actually returns a cursor. Otherwise, how on earth do we scoll the results???
    * @returnType { BrowserResultsItem } the requested filter item object
    */
    //createCursorItem(): BrowserResultsItem;
    createCursorItem(): CursorBrowserResultItem;
    /**  Returns an object that provides access to a bank of successive entries using a window configured with
     * the given size, that can be scrolled over the list of entries.
     * @param size
              the number of simultaneously accessible items
     * @returnType {BrowserResultsItemBank} the requested item bank object */
    createItemBank(size: number): BrowserResultsItemBank;
}
