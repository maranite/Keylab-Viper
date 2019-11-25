/** Instances of this interface represent the state of a solo button. */
interface SoloValue extends SettableBooleanValue {
    /** Toggles the current solo state.
     * @param exclusive
              specifies if solo on other channels should be disabled automatically ('true') or not ('false'). */
    toggle(exclusive?: any): void;
}
