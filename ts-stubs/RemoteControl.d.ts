/**
 * Represents a remote control in Bitwig Studio.
 */
interface RemoteControl extends Parameter {
    /**  @returnType {SettableStringValue} */
    name(): SettableStringValue;
}
