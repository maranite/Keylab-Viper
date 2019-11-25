/**  Represents a page of remote controls in a device. */
interface RemoteControlsPage extends ParameterBank {
    /** Returns the RemoteControl parameter at the given index within the bank.
     * @param {int} indexInBank
     * @returnType {RemoteControl}
     */
    getParameter(indexInBank: number): RemoteControl;
    /**  @returnType {StringValue} */
    getName(): StringValue;
}
