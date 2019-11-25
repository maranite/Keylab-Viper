interface StringValue extends Value<StringCallback>, ObservableValue<string> {
    /**  Gets the current value.
     * @returnType {string} */
    get(): string;
    /**  Gets the current value and tries to intelligently limit it to the supplied length in the best way
     * possible.
     * @param {int} maxLength
     * @returnType {string} */
    getLimited(maxLength: number): string;
}
