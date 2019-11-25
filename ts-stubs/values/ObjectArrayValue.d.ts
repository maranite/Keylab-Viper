interface ObjectArrayValue<T> extends Value<CallbackOfT<T[]>>, ObservableValue<T[]> {
    /**  @returnType {T[]} */
    get(): T[];
    /**  @param {int} index
     * @returnType {T} */
    get(index: number): T;
    /** returns true of the array is empty */
    isEmpty(): boolean;
}
