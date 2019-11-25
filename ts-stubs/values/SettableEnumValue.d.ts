/**
 * Instances of this interface represent enumeration values. Enum values work similar to string values, but
 * are limited to a fixed set of value options.
 */
interface SettableEnumValue extends EnumValue {
    /**  Sets the value to the enumeration item with the given name.
     * @param name
              the name of the new enum item */
    set(value: string): void;
}
