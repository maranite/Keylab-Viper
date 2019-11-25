interface StringValueOf<T extends string> extends Value<CallbackOfT<T>>, ObservableValue<T> {
    /**  Gets the current value.
     * @returnType {string} */
    get(): T;
    /**  Gets the current value and tries to intelligently limit it to the supplied length in the best way
     * possible.
     * @param {int} maxLength
     * @returnType {string} */
    getLimited(maxLength: number): T;
}
