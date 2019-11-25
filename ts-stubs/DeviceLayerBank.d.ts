/**
 * Devices layers are features of special Bitwig Studio devices, more specifically the Layer Instrument and
 * Layer FX devices, and are also shown as sub-channels in the mixer panel.
 *
 * Instances of device layer bank are configured with a fixed number of channels and represent an excerpt of
 * underlying complete list of channels. Various methods are provided for scrolling to different sections of
 * the underlying list. It basically acts like a one-dimensional window moving over the device layers.
 *
 * To receive an instance of device layer bank call {Device#createLayerBank(int numChannels)}.
 *
 * @see {Device#createLayerBank}
 */
interface DeviceLayerBank extends ChannelBank<DeviceLayer> {
    /**  Returns the device layer at the given index.
     * @param indexInBank
              the device layer index within this bank, not the index within the list of all device layers as
              shown in Bitwig Studio layer devices. Must be in the range [0..sizeOfBank-1].
     * @returnType {DeviceLayer} the device layer object */
    getChannel(indexInBank: number): DeviceLayer;
}
