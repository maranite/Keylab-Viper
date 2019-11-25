/**
 * An interface used to access various commands that can be performed on the Bitwig Studio mixer panel.
 *
 * To get an instance of the mixer interface call {ControllerHost#createMixer}.
 *
 */
interface Mixer {
    /**  Gets an object that allows to show/hide the meter section of the mixer panel. Observers can be
     * registered on the returned object for receiving notifications when the meter section switches between
     * shown and hidden state.
     * @returnType {SettableBooleanValue} a boolean value object that represents the meter section visibility */
    isMeterSectionVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the io section of the mixer panel. Observers can be registered
     * on the returned object for receiving notifications when the io section switches between shown and hidden
     * state.
     * @returnType {SettableBooleanValue} a boolean value object that represents the io section visibility */
    isIoSectionVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the sends section of the mixer panel. Observers can be
     * registered on the returned object for receiving notifications when the sends section switches between
     * shown and hidden state.
     * @returnType {SettableBooleanValue} a boolean value object that represents the sends section visibility */
    isSendSectionVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the clip launcher section of the mixer panel. Observers can be
     * registered on the returned object for receiving notifications when the clip launcher section switches
     * between shown and hidden state.
     * @returnType {SettableBooleanValue} a boolean value object that represents the clip launcher section visibility */
    isClipLauncherSectionVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the devices section of the mixer panel. Observers can be
     * registered on the returned object for receiving notifications when the devices section switches between
     * shown and hidden state.
     * @returnType {SettableBooleanValue} a boolean value object that represents the devices section visibility */
    isDeviceSectionVisible(): SettableBooleanValue;
    /**  Gets an object that allows to show/hide the cross-fade section of the mixer panel. Observers can be
     * registered on the returned object for receiving notifications when the cross-fade section switches
     * between shown and hidden state.
     * @returnType {SettableBooleanValue} a boolean value object that represents the cross-fade section visibility */
    isCrossFadeSectionVisible(): SettableBooleanValue;
}
