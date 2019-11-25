/**
 * A generic interface used to implement actions or events that are not associated with a value.
 */
interface Signal {
    /* * Registers an observer that gets notified when the signal gets fired.
       * @param callback
               a callback function that does not receive any argument.
      */
    addSignalObserver(callback: () => void): void;
    /**  Fires the action or event represented by the signal object. */
    fire(): void;
}
