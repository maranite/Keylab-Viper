/** Instances of this interface represent integer values */
interface SettableIntegerValue extends IntegerValue {
    /**  Sets the internal value.
     * @param value
              the new integer value. */
    set(value: number): void;
    /**  Increases/decrease the internal value by the given amount.
     * @param amount
              the integer amount to increase */
    inc(amount: number): void;
}
