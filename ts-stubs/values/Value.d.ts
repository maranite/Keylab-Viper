interface Value<TCallback> extends Subscribable {
    /**  Marks this value as being of interest to the driver. This can only be called once during the driver's
     * init method. A value that is of interest to the driver can be obtained using the value's get method. If
     * a value has not been marked as interested then an error will be reported if the driver attempts to get
     * the current value. Adding an observer to a value will automatically mark this value as interested. */
    markInterested(): void;
    /**  Registers an observer that reports the current value.
     * @param callback
              a callback function that receives a single parameter */
    addValueObserver(callback: TCallback): void;
}
