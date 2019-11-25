/**
 * Instances of this interface represent entries in a browser filter column.
 */
interface BrowserItem extends ObjectProxy {
    /* Value that reports the name of the browser item.
    *
    * @returnType {StringValue}
    */
    name(): string;
    /**  Returns an object that provides access to the selected state of the browser item.
     * @returnType {SettableBooleanValue} an boolean value object */
    isSelected(): SettableBooleanValue;
}
