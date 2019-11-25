/**
 * A channel bank provides access to a range of channels in Bitwig Studio, such as tracks or device layers.
 * Instances of channel bank are typically configured with support for a fixed number of channels and
 * represent an excerpt of a larger list of channels. Various methods are provided for scrolling to different
 * sections of the channel list. It basically acts like a window moving over the list of channels.
 */
interface ChannelBank<ChannelType extends Channel> extends ObjectProxy, Bank<ChannelType> {
    /**  Value that reports the underlying total channel count (not the number of channels available in the bank window).
     * @returnType {IntegerValue} */
    channelCount(): IntegerValue;
    /**  Sets the step size used for scrolling the channel bank.
     * @param stepSize
              the step size used for scrolling. Default is `1`. */
    setChannelScrollStepSize(stepSize: number): void;
  
    /**  Value that reports if the channel bank can be scrolled further down. */
    canScrollChannelsUp(): BooleanValue;

    /**  Value that reports if the channel bank can be scrolled further down. */
    canScrollChannelsDown(): BooleanValue;
}
