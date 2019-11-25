/** Observable true/false value */
interface BooleanValue extends Value<BooleanCallback>, ObservableValue<boolean> {
    /** Gets the current value.
     * @returnType {boolean} */
    get(): boolean;
}
