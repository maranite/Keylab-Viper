//// <reference path="../callbacks/CallbackOfT.d.ts" />
interface ObservableValue<T> {
    /**  Gets the current value.
        * @returnType {T} */
    get(): T;
    /**  Registers an observer that reports the current value.
     * @param callback
              a callback function that receives a single parameter */
    addValueObserver(callback: CallbackOfT<T>): void;
}


interface SettableObservableValue<T> extends ObservableValue<T> {
    set(v: T): void;
}