/** Instances of this interface implement the {Value} interface for string values. */
interface SettableStringValue extends StringValue {
    /**  Sets the value object to the given string.
     * @param value
              the new value string */
    set(value: string): void;
}
