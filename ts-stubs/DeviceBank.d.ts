/**
 * This interface is used for navigation of device chains in Bitwig Studio. Instances are configured with a
 * fixed number of devices and provide access to a excerpt of the devices inside a device chain. Various
 * methods are provided for scrolling to different sections of the device chain. It basically acts like a
 * window moving over the devices.
 *
 * To receive an instance of DeviceBank call {Track#createDeviceBank}.
 *
 * @see {Track#createDeviceBank}
 */
interface DeviceBank extends Bank<Device> {
    /**  Returns the object that was used to instantiate this device bank. Possible device chain instances are
     * tracks, device layers, drums pads, or FX slots.
     * @returnType {DeviceChain} the requested device chain object */
    getDeviceChain(): DeviceChain;
    /**  Returns the device at the given index within the bank.
     * @param indexInBank
              the device index within this bank, not the position within the device chain. Must be in the
              range [0..sizeOfBank-1].
     * @returnType {Device} the requested device object */
    getDevice(indexInBank: number): Device;
    /**  Scrolls the device window one page up. */
    scrollPageUp(): void;
    /**  Scrolls the device window one page down. */
    scrollPageDown(): void;
    /**  Scrolls the device window one device up. */
    scrollUp(): void;
    /**  Scrolls the device window one device down. */
    scrollDown(): void;
    /**  Makes the device with the given position visible in the track bank.
     * @param position
              the position of the device within the device chain */
    scrollTo(position: number): void;
    /**  Registers an observer that reports if the device window can be scrolled further down.
     * @param callback
              a callback function that takes a single boolean parameter */
    addCanScrollDownObserver(callback: BooleanCallback): void;
    /**  Browses for content to insert a device at the given index inside this bank.
     * @param index
              the index to insert the device at. Must be >= 0 and <= {#getSizeOfBank()}. */
    browseToInsertDevice(index: number): void;
}
