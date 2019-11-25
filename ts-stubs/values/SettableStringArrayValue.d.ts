interface SettableStringArrayValue extends StringArrayValue {
    /** Sets the internal value.
     * @param value. the new value. */
    set(value: string[]): void;
}
