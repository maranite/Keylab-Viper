interface SettableColorValue extends ColorValue {
    /**  Sets the internal value.
     * @param {float} red
     * @param {float} green
     * @param {float} blue */
    set(red: number, green: number, blue: number, alpha?: number): void;
}
