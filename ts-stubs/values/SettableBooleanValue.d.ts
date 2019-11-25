/** Instances of this interface represent boolean values. */
interface SettableBooleanValue extends BooleanValue {
    /**Sets the internal value.
     * @param value */
    set(value: boolean): void;
    /**Toggles the current state. In case the current value is `false`, the new value will be `true` and the other way round.  */
    toggle(): void;
}
