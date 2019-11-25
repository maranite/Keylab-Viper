/** Instances of this interface represent entries in a browser filter column. */
interface CursorBrowserItem extends Cursor {
    /** Returns a bank object that provides access to the siblings of the cursor item. The bank will automatically scroll so that the cursor item is always visible. */
    createSiblingsBank(numSiblings: number): BrowserItemBank;
}
