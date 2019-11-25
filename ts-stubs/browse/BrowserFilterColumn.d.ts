/** Instances of this interface are used to navigate a filter column in the Bitwig Studio browser. */
interface BrowserFilterColumn extends BrowserColumn {
    /**  Returns the filter item that represents the top-level all/any/everything wildcard item.
     * @returnType {BrowserFilterItem} the requested filter item object */
    getWildcardItem(): BrowserFilterItem;
    /**  Returns the cursor filter item, which can be used to navigate over the list of entries.
     *  MW:- I messed with the return type, because the nbame suggests that a cursor is being returned!!! */
    createCursorItem(): CursorBrowserFilterItem; //BrowserFilterItem;
    /**  Returns an object that provides access to a bank of successive entries using a window configured with
     * the given size, that can be scrolled over the list of entries.
     * @param size
              the number of simultaneously accessible items
     * @returnType {BrowserFilterItemBank} the requested item bank object */
    createItemBank(size: number): any | BrowserFilterItemBank;
    /**  Value that reports the name of the filter column.
     * @returnType {StringValue}
     * @since API version2 */
    name(): StringValue;
}
