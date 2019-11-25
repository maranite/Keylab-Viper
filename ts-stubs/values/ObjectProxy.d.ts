/** Interface for an object that acts as a proxy for the actual object in Bitwig Studio (for example a track, a device etc). */
interface ObjectProxy extends Subscribable {
    /**  Returns a value object that indicates if the object being proxied exists, or if it has content.
     * @returnType {BooleanValue}  */
    exists(): BooleanValue;
    /**  Creates a {BooleanValue} that determines this proxy is considered equal to another proxy. For this
     * to be the case both proxies need to be proxying the same target object.
     * @param {ObjectProxy} other
     * @returnType {BooleanValue}
     * @since API version 3 */
    createEqualsValue(other: ObjectProxy): BooleanValue;
}
