interface TimeSignatureValue extends Value<StringCallback>, ObservableValue<string> {
    /**  Gets the current value.
     * @returnType {string} */
    get(): string;
    /**  Updates the time signature according to the given string.
     * @param name
              a textual representation of the new time signature value, formatted as `numerator/denominator[, ticks]` */
    set(name: string): void;
    /**  Returns an object that provides access to the time signature numerator.
     * @returnType {SettableIntegerValue} an integer value object that represents the time signature numerator. */
    numerator(): SettableIntegerValue;
    /**  Returns an object that provides access to the time signature denominator.
     * @returnType {SettableIntegerValue} an integer value object that represents the time signature denominator. */
    denominator(): SettableIntegerValue;
    /**  Returns an object that provides access to the time signature tick subdivisions.
     * @returnType {SettableIntegerValue} an integer value object that represents the time signature ticks. */
    ticks(): SettableIntegerValue;
}
