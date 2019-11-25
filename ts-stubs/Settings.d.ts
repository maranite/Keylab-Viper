/**
 * This interface builds the foundation for storing custom settings in Bitwig Studio documents or in the Bitwig Studio preferences.
 */
interface Settings {
    /**  Returns a signal setting object, which is shown a push button with the given label in Bitwig Studio.
     * @param label
              the name of the setting, must not be `null`
     * @param category
              the name of the category, must not be `null`
     * @param action
              the action string as displayed on the related Bitwig Studio button, must not be `null`
     * @returnType {Signal} the object that encapsulates the requested signal */
    getSignalSetting(label: string, category: string, action: string): Signal;
    /**  Returns a numeric setting that is shown a number field in Bitwig Studio.
     * @param label
              the name of the setting, must not be `null`
     * @param category
              the name of the category, may not be `null`
     * @param minValue
              the minimum value that the user is allowed to enter
     * @param maxValue
              the minimum value that the user is allowed to enter
     * @param stepResolution
              the step resolution used for the number field
     * @param unit
              the string that should be used to display the unit of the number
     * @param initialValue
              the initial numeric value of the setting
     * @returnType {SettableRangedValue} the object that encapsulates the requested numeric setting */
    getNumberSetting(label: string, category: string, minValue: number, maxValue: number, stepResolution: number, unit: string, initialValue: number): SettableRangedValue;
    /**  Returns an enumeration setting that is shown either as a chooser or as a button group in Bitwig Studio,
     * depending on the number of provided options.
     * @param label
              the name of the setting, must not be `null`
     * @param category
              the name of the category, may not be `null`
     * @param options
              the string array that defines the allowed options for the button group or chooser
     * @param initialValue
              the initial string value, must be one of the items specified with the option argument
     * @returnType {SettableEnumValue} the object that encapsulates the requested enum setting */
    getEnumSetting(label: string, category: string, options: string[], initialValue: string): SettableEnumValue;
    /**  Returns a textual setting that is shown as a text field in the Bitwig Studio user interface.
     * @param label
              the name of the setting, must not be `null`
     * @param category
              the name of the category, may not be `null`
     * @param numChars
              the maximum number of character used for the text value
     * @param initialText
              the initial text value of the setting
     * @returnType {SettableStringValue} the object that encapsulates the requested string setting */
    getStringSetting(label: string, category: string, numChars: number, initialText: string): SettableStringValue;
    getColorSetting(label: string, category: string, initialText: Color): SettableColorValue;
    /** Returns a boolean setting.
     * @param label
              the name of the setting, must not be `null`
     * @param category
              the name of the category, may not be `null`
     * @param initialValue
              the initial value of the setting   */
    getBooleanSetting(label: string, category: string, initialValue: boolean): SettableBooleanValue;
}
