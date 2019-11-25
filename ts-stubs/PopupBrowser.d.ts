/**Object that represents the popup browser in Bitwig Studio. */
interface PopupBrowser extends ObjectProxy {
    /**  The title of the popup browser.
     * @returnType {StringValue} */
    title(): StringValue;
    /** Value that reports the possible content types that can be inserted by the popup browser. These are
     *  represented by the tabs in Bitwig Studio's popup browser.
     * (e.g "Device", "Preset", "Sample" etc.)*/
    contentTypeNames(): StringArrayValue;
    /**  Value that represents the selected content type.
     * @returnType {StringValue} */
    selectedContentTypeName(): StringValue;
    /**  Value that represents the index of the selected content type within the content types supported. */
    selectedContentTypeIndex(): SettableIntegerValue;
    /**  The smart collections column of the browser. */
    smartCollectionColumn(): BrowserFilterColumn;
    /**  The location column of the browser. */
    locationColumn(): BrowserFilterColumn;
    /**  The device column of the browser.*/
    deviceColumn(): BrowserFilterColumn;
    /**  The category column of the browser.*/
    categoryColumn(): BrowserFilterColumn;
    /**  The tag column of the browser. */
    tagColumn(): BrowserFilterColumn;
    /**  The device type column of the browser.*/
    deviceTypeColumn(): BrowserFilterColumn;
    /**  The file type column of the browser.*/
    fileTypeColumn(): BrowserFilterColumn;
    /**  The creator column of the browser.*/
    creatorColumn(): BrowserFilterColumn;
    /**  Column that represents the results of the search. */
    resultsColumn(): BrowserResultsColumn;
    /**  Value that indicates if the browser is able to audition material in place while browsing.*/
    canAudition(): BooleanValue;
    /**  Value that decides if the browser is currently auditioning material in place while browsing or not. */
    shouldAudition(): SettableBooleanValue;
    /**  Selects the next file. */
    selectNextFile(): void;
    /**  Selects the previous file.  */
    selectPreviousFile(): void;
    /** Selects the first file. */
    selectFirstFile(): void;
    /** Selects the last file. */
    selectLastFile(): void;
    /**  Cancels the popup browser. */
    cancel(): void;
    /**  Commits the selected item in the popup browser. */
    commit(): void;
}
