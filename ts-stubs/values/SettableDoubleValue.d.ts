interface SettableDoubleValue extends DoubleValue {
    /**  Sets the internal value.
     * @param value
              the new value. */
    set(value: number): void;
    /**  Increases/decrease the internal value by the given amount.
     * @param amount
              the amount to increase */
    inc(amount: number): void;
}
