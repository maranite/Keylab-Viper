/**
 * The foundation of all interfaces that contain devices, such as tracks, device layers, drum pads or FX
 * slots.
 */
interface DeviceChain extends ObjectProxy {
    /**  Selects the device chain in Bitwig Studio, in case it is a selectable object. */
    selectInEditor(): void;
    /**  Value that reports the name of the device chain, such as the track name or the drum pad name.
     * @returnType {SettableStringValue} */
    name(): SettableStringValue;
    /**  Registers an observer that reports if the device chain is selected in Bitwig Studio editors.
     * @param callback
              a callback function that takes a single boolean parameter. */
    addIsSelectedInEditorObserver(callback: BooleanCallback): void;
    /**  Returns an object that provides bank-wise navigation of devices.
     * @param numDevices
              the number of devices should be accessible simultaneously
     * @returnType {DeviceBank} the requested device bank object*/
    createDeviceBank(numDevices: number): DeviceBank;
    /**  Starts browsing for content that can be inserted at the start of this device chain. */
    browseToInsertAtStartOfChain(): void;
    /**  Starts browsing for content that can be inserted at the end of this device chain. */
    browseToInsertAtEndOfChain(): void;
    /** InsertionPoint  that can be used to insert at the start of the device chain.     */
    startOfDeviceChainInsertionPoint(): InsertionPoint;
    /** InsertionPoint  that can be used to insert at the end of the device chain.  */
    endOfDeviceChainInsertionPoint(): InsertionPoint;
}
