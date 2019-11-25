/**
 * Instances of this interface represent entries in a browser filter column.
 */
interface BrowserFilterItem extends BrowserItem {
    /**  Value that reports the hit count of the filter item.
     * @returnType {IntegerValue} */
    hitCount(): IntegerValue;
}
