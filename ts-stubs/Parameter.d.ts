/**
 * Instances of this interface represent ranged parameters that can be controlled with automation in Bitwig
 * Studio.
 */
interface Parameter extends SettableRangedValue, ObjectProxy {
    /**  Gets the current value of this parameter.
     * @returnType {SettableRangedValue} */
    value(): SettableRangedValue;
    /**  Gets the modulated value of this parameter.
     * @returnType {RangedValue} */
    modulatedValue(): RangedValue;
    /**  The name of the parameter.
     * @returnType {StringValue} */
    name(): StringValue;
    /**  Resets the value to its default.
     * */
    reset(): void;
    /**  Touch (or un-touch) the value for automation recording.
     * @param isBeingTouched
              `true` for touching, `false` for un-touching */
    touch(isBeingTouched: boolean): void;
    /**  Specifies if this value should be indicated as mapped in Bitwig Studio, which is visually shown as
     * colored dots or tinting on the parameter controls.
     * @param shouldIndicate
              `true` in case visual indications should be shown in Bitwig Studio, `false` otherwise */
    setIndication(shouldIndicate: boolean): void;
    /**  Specifies a label for the mapped hardware parameter as shown in Bitwig Studio, for example in menu items
     * for learning controls.
     * @param label
              the label to be shown in Bitwig Studio */
    setLabel(label: string): void;
    /**  Restores control of this parameter to automation playback. */
    restoreAutomationControl(): void;
}
