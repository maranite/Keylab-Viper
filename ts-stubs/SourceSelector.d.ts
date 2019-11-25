/**
 * Instance of this class represent sources selectors in Bitwig Studio, which are shown as choosers in the
 * user interface and contain entries for either note inputs or audio inputs or both.
 *
 * The most prominent source selector in Bitwig Studio is the one shown in the track IO section, which can be
 * accessed via the API by calling {Track#getSourceSelector()}.
 */
interface SourceSelector extends ObjectProxy {
    /**  Returns an object that indicates if the source selector has note inputs enabled.
     * @returnType {SettableBooleanValue} a boolean value object */
    hasNoteInputSelected(): SettableBooleanValue;
    /**  Returns an object that indicates if the source selector has audio inputs enabled.
     * @returnType {SettableBooleanValue} a boolean value object */
    hasAudioInputSelected(): SettableBooleanValue;
}

declare abstract class HardwareDeviceMatcher {
    public getName(): string;
}
declare abstract class HardwareDevice {
    public getName(): string;
}


interface UsbDevice extends HardwareDevice {
    /** The UsbDeviceMatcher that was provided by the controller for identifying this device. Implements HardwareDevice. */
    deviceMatcher(): UsbDeviceMatcher;

    /** The UsbInterface that was claimed using the UsbInterfaceMatcher defined at the corresponding index in the UsbDeviceMatcher. */
    iface(index: number): UsbInterface;

    /** The list of UsbInterfaces that have been opened for this device. */
    ifaces(): UsbInterface[];    // List<UsbInterface>
}


declare class UsbDeviceMatcher extends HardwareDeviceMatcher {
    /** Creates a UsbDeviceMatcher that matches a USB device that matches the supplied expression and has a configuration matching the supplied UsbConfigurationMatcher.
        @param name	A human friendly name that describes the kind of devices this matcher tries to match.
        @param expression	An expression that can be used on the USB device descriptor to decide if the device matches. Variables in the expression can refer to the following fields of the device descriptor:
        For example to match a device that has vendor id 0x10 product id 0x20 the expression would be:
        "idVendor == 0x10 && idProduct == 0x20"
        @param configurationMatcher	Object that tries to match a configuration on the device that it can use.         */
    constructor(name: string, expression: string, configurationMatcher: UsbConfigurationMatcher);
    constructor(name: string, expression: string, ...interfaceMatchers: UsbInterfaceMatcher[])
    getExpression(): string;
    getConfigurationMatcher(): UsbConfigurationMatcher;
}

interface UsbInterface {
    /** The UsbInterfaceMatcher that was provided by the controller for identifying this device. */
    interfaceMatcher(): UsbInterfaceMatcher;
    /** The list of pipes that have been opened for this interface. */
    pipes(): UsbPipe[] //List<UsbPipe>;
    pipe(index: number): UsbPipe;
    pipeCount(): number;
}

declare abstract class UsbMatcher {
    constructor(expression: string, matchOccurrence: number);
    getExpression(): string;
    getMatchOccurrence(): number;
}

declare class UsbInterfaceMatcher extends UsbMatcher {
    constructor(expression: string, matchOccurrence: number, ...endpointMatchers: UsbEndpointMatcher[]);
    constructor(expression: string, ...endpointMatchers: UsbEndpointMatcher[])
    getEndpointMatchers(): UsbEndpointMatcher[];
}

declare class UsbConfigurationMatcher extends UsbMatcher {
    constructor(expression: string, matchOccurrenceIndex: number, ...interfaceMatchers: UsbInterfaceMatcher[]);
    constructor(expression: string, ...interfaceMatchers: UsbInterfaceMatcher[]);
    constructor(matchOccurrenceIndex: number, ...interfaceMatchers: UsbInterfaceMatcher[]);
    constructor(...interfaceMatchers: UsbInterfaceMatcher[]);
    getInterfaceMatchers(): UsbInterfaceMatcher[];
}

declare class UsbEndpointMatcher extends UsbMatcher {
    constructor(direction: UsbTransferDirection, transferType: UsbTransferType, expression: string, matchOccurrenceIndex: number);
    constructor(direction: UsbTransferDirection, transferType: UsbTransferType, expression: string);
    constructor(transferType: UsbTransferType, bEndpointAddress: number);
    getDirection(): UsbTransferDirection;
    getTransferType(): UsbTransferType;
}

interface Pipe {
}

interface UsbPipe extends Pipe {
    device(): UsbDevice;
    endpointMatcher(): UsbEndpointMatcher;
    endpointAddress(): Number;
    direction(): UsbTransferDirection;
    transferType(): UsbTransferType;
}

declare enum UsbTransferType { BULK, INTERRUPT/*, CONTROL*/ }
declare enum UsbTransferDirection { IN, OUT }
// public static UsbTransferDirection getForEndpointAddress(byte bEndpointAddress)
// {
//    return ((bEndpointAddress & 0x80) == 0) ? OUT : IN;
// }
