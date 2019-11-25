/**  This interface represents a device in Bitwig Studio, both internal devices and plugins. */
interface Device extends ObjectProxy {
    /**  Returns a representation of the device chain that contains this device. Possible device chain instances
     * are tracks, device layers, drums pads, or FX slots.
     * @returnType {DeviceChain} the requested device chain object */
    deviceChain(): DeviceChain;
    /**  Value that reports the position of the device within the parent device chain.
     * @returnType {IntegerValue} */
    position(): IntegerValue;
    /**  Returns an object that provides access to the open state of plugin windows.
     * @returnType {SettableBooleanValue} a boolean value object that represents the open state of the editor window, in case the device
            features a custom editor window (such as plugins). */
    isWindowOpen(): SettableBooleanValue;
    /**  Returns an object that provides access to the expanded state of the device.
     * @returnType {SettableBooleanValue} a boolean value object that represents the expanded state of the device. */
    isExpanded(): SettableBooleanValue;
    /**  Returns an object that provides access to the visibility of the device remote controls section.
     * @returnType {SettableBooleanValue} a boolean value object that represents the remote controls section visibility. */
    isRemoteControlsSectionVisible(): SettableBooleanValue;
    /**  Creates a cursor for the selected remote controls page in the device with the supplied number of
     * parameters. This section will follow the current page selection made by the user in the application.
     * @param parameterCount
              The number of parameters the remote controls should contain
     * @returnType {CursorRemoteControlsPage} */
    createCursorRemoteControlsPage(parameterCount: number): CursorRemoteControlsPage;
    /**  Creates a cursor for a remote controls page in the device with the supplied number of parameters. This
     * section will be independent from the current page selected by the user in Bitwig Studio's user
     * interface. The supplied filter is an expression that can be used to match pages this section is
     * interested in. The expression is matched by looking at the tags added to the pages. If the expression is
     * empty then no filtering will occur.
     * @param name
              A name to associate with this section. This will be used to remember manual mappings made by
              the user within this section.
     * @param parameterCount
              The number of parameters the remote controls should contain
     * @param filterExpression
              An expression used to match pages that the user can navigate through. For now this can only be
              the name of a single tag the pages should contain (e.g "drawbars", "dyn", "env", "eq",
              "filter", "fx", "lfo", "mixer", "osc", "overview", "perf").
     * @returnType {CursorRemoteControlsPage} */
    createCursorRemoteControlsPage(name: string, parameterCount: number, filterExpression: string): CursorRemoteControlsPage;
    /**  Selects the device in Bitwig Studio. */
    selectInEditor(): void;
    /**  Value that reports if the device is a plugin.
     * @returnType {BooleanValue} */
    isPlugin(): BooleanValue;
    /**  Switches to the previous parameter page. */
    previousParameterPage(): void;
    /**  Switches to the next parameter page. */
    nextParameterPage(): void;
    /**  Registers an observer that reports if there is a previous parameter page.
     * @param callback
              a callback function that receives a single boolean parameter */
    addPreviousParameterPageEnabledObserver(callback: BooleanCallback): void;
    /**  Registers an observer that reports if there is a next parameter page.
     * @param callback
              a callback function that receives a single boolean parameter */
    addNextParameterPageEnabledObserver(callback: BooleanCallback): void;
    /**  Switches to the parameter page at the given page index.
     * @param page
              the index of the desired parameter page */
    setParameterPage(page: number): void;
    /**  Value that reports the name of the device.
     * @returnType {StringValue} */
    name(): StringValue;
    /**  Value that reports the last loaded preset name.
     * @returnType {StringValue} */
    presetName(): StringValue;
    /**  Value that reports the current preset category name.
     * @returnType {StringValue} */
    presetCategory(): StringValue;
    /**  Value that reports the current preset creator name.
     * @returnType {StringValue} */
    presetCreator(): StringValue;
    /**  Registers an observer that reports the currently selected parameter page.
     * @param valueWhenUnassigned
              the default page index that gets reported when the device is not associated with a device
              instance in Bitwig Studio yet.
     * @param callback
              a callback function that receives a single page index parameter (integer) */
    addSelectedPageObserver(valueWhenUnassigned: number, callback: (value: number) => void): void;
    /**  Registers an observer that reports the name of the active modulation source.
     * @param len
              the maximum length of the name. Longer names will get truncated.
     * @param textWhenUnassigned
              the default name that gets reported when the device is not associated with a Bitwig Studio
              device yet.
     * @param callback
              a callback function that receives a single name parameter (string) */
    addActiveModulationSourceObserver(len: number, textWhenUnassigned: string, callback: (value: string) => void): void;
    
    addHasSelectedDeviceObserver(callback: CallOf<boolean>): void;

    /**  Registers an observer that reports the names of the devices parameter pages.
     * @param callback
              a callback function that receives a single string array parameter containing the names of the
              parameter pages */
    addPageNamesObserver(callback: (value: string) => void): void;
    /**  Value that reports if the device is enabled.
     * @returnType {SettableBooleanValue} */
    isEnabled(): SettableBooleanValue;
    /**  Indicates if the device has nested device chains in FX slots. Use {#addSlotsObserver(Callable)
     * addSlotsObserver(Callable)} to get a list of available slot names, and navigate to devices in those
     * slots using the {CursorDevice} interface.
     * @returnType {BooleanValue} a value object that indicates if the device has nested device chains in FX slots. */
    hasSlots(): BooleanValue;
    /**  Value of the list of available FX slots in this device.
     * @returnType {StringArrayValue} */
    slotNames(): StringArrayValue;
    /**  Returns an object that represents the selected device slot as shown in the user interface, and that
     * provides access to the contents of slot's device chain.
     * @returnType {DeviceSlot} the requested slot cursor object */
    getCursorSlot(): DeviceSlot;
    /**  Indicates if the device is contained by another device.
     * @returnType {BooleanValue} a value object that indicates if the device is nested */
    isNested(): BooleanValue;
    /**  Indicates if the device supports nested layers.
     * @returnType {BooleanValue} a value object that indicates if the device supports nested layers. */
    hasLayers(): BooleanValue;
    /**  Indicates if the device has individual device chains for each note value.
     * @returnType {BooleanValue} a value object that indicates if the device has individual device chains for each note value. */
    hasDrumPads(): BooleanValue;
    /**  Create a bank for navigating the nested layers of the device using a fixed-size window.
     * @param numChannels
              the number of channels that the device layer bank should be configured with
     * @returnType {DeviceLayerBank} a device layer bank object configured with the desired number of channels */
    createLayerBank(numChannels: number): DeviceLayerBank;
    /**  Create a bank for navigating the nested layers of the device using a fixed-size window.
     * @param numPads
              the number of channels that the drum pad bank should be configured with
     * @returnType {DrumPadBank} a drum pad bank object configured with the desired number of pads */
    createDrumPadBank(numPads: number): DrumPadBank;
    /** Creates a ChainSelector object which will give you control over the current device if it is an Instrument Selector or an Effect Selector.
        To check if the device is currently a ChainSelector, use ChainSelector.exists().
        If you want to have access to all the chains, use createLayerBank(int). */
    createChainSelector(): ChainSelector;
    /**  Returns a device layer instance that can be used to navigate the layers or drum pads of the device, in
     * case it has any.
     * @returnType {CursorDeviceLayer} a cursor device layer instance */
    createCursorLayer(): CursorDeviceLayer;
    /**  Adds an observer on a list of all parameters for the device.
     *
     * The callback always updates with an array containing all the IDs for the device.
     * @param callback
              function with the signature (String[]) */
    addDirectParameterIdObserver(callback: (value: string[]) => void): void;
    /**  Adds an observer for the parameter names (initial and changes) of all parameters for the device.
     * @param maxChars
              maximum length of the string sent to the observer.
     * @param callback
              function with the signature (String ID, String name) */
    addDirectParameterNameObserver(maxChars: number, callback: (id: string, name: string) => void): void;
    /**  Returns an observer that reports changes of parameter display values, i.e. parameter values formatted as
     * a string to be read by the user, for example "-6.02 dB". The returned observer object can be used to
     * configure which parameters should be observed. By default no parameters are observed. It should be
     * avoided to observe all parameters at the same time for performance reasons.
     * @param maxChars
              maximum length of the string sent to the observer.
     * @param callback
              function with the signature (String ID, String valueDisplay)
     * @returnType {DirectParameterValueDisplayObserver} an observer object that
               can be used to enable or disable actual observing for certain parameters. */
    addDirectParameterValueDisplayObserver(maxChars: number, callback: (id: string, name: string) => void): DirectParameterValueDisplayObserver;
    /**  Adds an observer for the parameter display value (initial and changes) of all parameters for the device.
     * @param callback
              a callback function with the signature (String ID, float normalizedValue). If the value is not
              accessible 'Number.NaN' (not-a-number) is reported, can be checked with 'isNaN(value)'. */
    addDirectParameterNormalizedValueObserver(callback: (id: string, normalizedValue: number) => void): void;
    /**  Sets the parameter with the specified `id` to the given `value` according to the given `resolution`.
     * @param id
              the parameter identifier string
     * @param value
              the new value normalized to the range [0..resolution-1]
     * @param resolution
              the resolution of the new value */
    setDirectParameterValueNormalized(id: string, value: number, resolution: number): void;
    /**  Increases the parameter with the specified `id` by the given `increment` according to the given
     * `resolution`. To decrease the parameter value pass in a negative increment.
     * @param id
              the parameter identifier string
     * @param increment
              the amount that the parameter value should be increased by, normalized to the range
              [0..resolution-1]
     * @param resolution
              the resolution of the new value */
    incDirectParameterValueNormalized(id: string, increment: number, resolution: number): void;
    /**  Value that reports the file name of the currently loaded sample, in case the device is a sample
     * container device.
     * @returnType {StringValue} */
    sampleName(): StringValue;
    /**  Returns an object that provides bank-wise navigation of sibling devices of the same device chain
     * (including the device instance used to create the siblings bank).
     * @param numDevices
              the number of devices that are simultaneously accessible
     * @returnType {DeviceBank} the requested device bank object */
    createSiblingsDeviceBank(numDevices: number): DeviceBank;
    /**  Starts browsing for content that can be inserted before this device in Bitwig Studio's popup browser. */
    browseToInsertBeforeDevice(): void;
    /**  Starts browsing for content that can be inserted before this device in Bitwig Studio's popup browser. */
    browseToInsertAfterDevice(): void;
    /**  Starts browsing for content that can replace this device in Bitwig Studio's popup browser. */
    browseToReplaceDevice(): void;
    /** InsertionPoint that can be used for inserting after this device. */
    afterDeviceInsertionPoint(): InsertionPoint;
    /** InsertionPoint that can be used for inserting before this device. */
    beforeDeviceInsertionPoint(): InsertionPoint;
    /** InsertionPoint that can be used for replacing this device. */
    replaceDeviceInsertionPoint(): InsertionPoint;
}
