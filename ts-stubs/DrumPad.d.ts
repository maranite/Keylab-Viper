/**
 * Instances of this interface are special kind of channel objects that represent the pads of a drum machine
 * instrument. Drum pads are typically associated to channel objects via note keys.
 */
interface DrumPad extends Channel {
    /**
     * InsertionPoint  that can be used to insert content in this drum pad.
     *
     * @returnType InsertionPoint
     * @since API version 7
     */
    insertionPoint(): InsertionPoint;
}
