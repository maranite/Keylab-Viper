/**
 * Interface for an object that can be 'subscribed' or not. A subscribed object will notify any observers when
 * changes occur to it. When it is unsubscribed the observers will no longer be notified. A driver can use
 * this to say which objects it is interested in and which ones it is not (for example in one mode the driver
 * may not be interested in track meters) at runtime. This allows the driver to improve efficiency by only
 * getting notified about changes that are really relevant to it. By default a driver is subscribed to
 * everything.
 */
interface Subscribable {
    /** Determines if this object is currently 'subscribed'. In the subscribed state it will notify any
     * observers registered on it.
     * @returnType {boolean} */
    isSubscribed(): boolean;
    /** Sets whether the driver currently considers this object 'active' or not.
     * @param {boolean} value */
    setIsSubscribed(value: boolean): void;
    /** Subscribes the driver to this object. This is equivalent to calling {#setIsSubscribed(boolean)} with true. */
    subscribe(): void;
    /**  Unsubscribes the driver from this object. This is equivalent to calling {#setIsSubscribed(boolean)}
     * with false. */
    unsubscribe(): void;
}
