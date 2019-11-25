/** Instances of this interface represent the selected device slot as shown in the Bitwig Studio user interface. */
interface CursorDeviceSlot extends Cursor, DeviceChain {
    /**  @param {string} slot */
    selectSlot(slot: string): void;
}
