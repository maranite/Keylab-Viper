interface EnumValue extends Value<StringCallback>, ObservableValue<string> {
    /**  Gets the current value.
     * @returnType {string} */
    get(): string;
}
