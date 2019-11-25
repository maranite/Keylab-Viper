interface IntegerValue extends Value<NumberCallback>, ObservableValue<number> {
    /**  Gets the current value.
     * @returnType {int} */
    get(): number;
    /**  Adds an observer that is notified when this value changes. This is intended to aid in backwards
     * compatibility for drivers written to the version 1 API.
     * @param callback
              The callback to notify with the new value
     * @param valueWhenUnassigned
              The value that the callback will be notified with if this value is not currently assigned to
              anything. */
    addValueObserver(callback: (value: number) => void, valueWhenUnassigned?: number): void;
}
