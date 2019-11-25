/**  Drum pads are features of special Bitwig Studio devices (currently only the Bitwig Drum Machine instrument), and are also shown as sub-channels in the mixer panel.
 *
 * Instances of drum pad bank are configured with a fixed number of pads/channels and represent an excerpt of
 * underlying complete list of channels. Various methods are provided for scrolling to different sections of
 * the underlying list. It basically acts like a one-dimensional window moving over the drum pad channels.
 *
 * To receive an instance of drum pad bank call Device.createDrumPadBank(int numChannels).
 *
 * @see {Device#createDrumPadBank}
 * @since API version 1
 */
interface DrumPadBank extends ChannelBank<DrumPad> {
    /**  Specifies if the Drum Machine should visualize which pads are part of the window. By default indications are enabled.
     * @param shouldIndicate
              `true` if visual indications should be enabled, `false` otherwise */
    setIndication(shouldIndicate: boolean): void;
}
