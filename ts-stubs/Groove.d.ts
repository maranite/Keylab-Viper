/** An interface representing the global groove settings of the project. */
interface Groove {
    /**  Returns the enabled state of the groove.
     * @returnType {Parameter} an object that provides access to the groove on/off setting */
    getEnabled(): Parameter;
    /**  Returns the object that represents the shuffle amount in Bitwig Studio.
     * @returnType {Parameter} an ranged value object that provides access to the shuffle amount */
    getShuffleAmount(): Parameter;
    /**  Returns the object that represents the shuffle rate in Bitwig Studio.
     * @returnType {Parameter} an ranged value object that provides access to the shuffle rate */
    getShuffleRate(): Parameter;
    /**  Returns the object that represents the accent amount in Bitwig Studio.
     * @returnType {Parameter} an ranged value object that provides access to the accent amount */
    getAccentAmount(): Parameter;
    /**  Returns the object that represents the accent rate in Bitwig Studio.
     * @returnType {Parameter} an ranged value object that provides access to the accent rate */
    getAccentRate(): Parameter;
    /**  Returns the object that represents the accent phase in Bitwig Studio.
     * @returnType {Parameter} an ranged value object that provides access to the accent phase */
    getAccentPhase(): Parameter;
}
