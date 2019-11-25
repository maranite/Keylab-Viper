interface ColorValue extends Value<ColorCallback> {
    /**  Gets the red component of the current value.
     * @returnType {float} */
    red(): number;
    /**  Gets the green component of the current value.
     * @returnType {float} */
    green(): number;
    /**  Gets the blue component of the current value.
     * @returnType {float} */
    blue(): number;
    /**  Gets the alpha component of the current value.
     * @returnType {float}
     * @since API version 4 */
    alpha(): number;
}
