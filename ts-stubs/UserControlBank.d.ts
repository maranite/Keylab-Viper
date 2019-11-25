/**
 * Instances of this interface represent a bank of custom controls that can be manually learned to device
 * parameters by the user.
 */
interface UserControlBank {
    /**  Gets the user control at the given bank index.
     * @param index
              the index of the control within the bank
     * @returnType {Parameter} the requested user control object */
    getControl(index: number): Parameter;
}
