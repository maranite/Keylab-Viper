/** Instances of this interface represent entries in a browser filter column. */
interface CursorBrowserFilterItem extends CursorBrowserItem, BrowserFilterItem {
    /**  Select the parent item. */
    selectParent(): void;
    /**  Select the first child item. */
    selectFirstChild(): void;
    /**  Select the last child item. */
    selectLastChild(): void;
    /**  Select the previous item. */
    moveToPrevious(): void;
    /**  Select the next item. */
    moveToNext(): void;
    /**  Select the first item. */
    moveToFirst(): void;
    /**  Select the last item. */
    moveToLast(): void;
    /**  Select the parent item. */
    moveToParent(): void;
    /**  Move the cursor to the first child item. */
    moveToFirstChild(): void;
    /**  Move the cursor to the last child item. */
    moveToLastChild(): void;
}
