//// <reference path="./ObservableValue.d.ts" />
interface DoubleValue extends Value<NumberCallback>, ObservableValue<number> {
    /**  Gets the current value.
     * @returnType {double} */
    get(): number;
}
