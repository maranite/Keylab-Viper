interface Send extends Parameter {
    /**  Value that reports the color of the channel that this send sends to.
     * @returnType {SettableColorValue} */
    sendChannelColor(): SettableColorValue;
}
