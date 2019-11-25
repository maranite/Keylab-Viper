interface SettableEnumOf<T extends string> extends Value<CallbackOfT<T>>, ObservableValue<T> {
    /**  Gets the current value.
     * @returnType {T} */
    get(): T;
    /**  Sets the value to the enumeration item with the given name.
 * @param name
          the name of the new enum item */
    set(value: T): void;
}
