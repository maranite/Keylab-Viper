interface RangedValue extends Value<NumberCallback>, ObservableValue<number> {
    /**  The current value normalized between 0..1 where 0 represents the minimum value and 1 the maximum.
     * @returnType {double} */
    get(): number;
    /**  Gets the current value.
     * @returnType {double} */
    getRaw(): number;
    /**  Value that represents a formatted text representation of the value whenever the value changes.
     * @returnType {StringValue} */
    displayedValue(): StringValue;
    /**  Adds an observer which receives the normalized value of the parameter as an integer number within the range [0..range-1].
     * @param range
              the range used to scale the value when reported to the callback.
     * @param callback
              a callback function that receives a single double parameter */
    //addValueObserver(range: number, callback: NumberCallback): void;
    addValueObserver(callback: NumberCallback): void;
    /**  Add an observer which receives the internal raw of the parameter as floating point.
     * @param callback
              a callback function that receives a single numeric parameter with double precision. */
    addRawValueObserver(callback: NumberCallback): void;
}
