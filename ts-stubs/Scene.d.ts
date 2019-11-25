/** Instances of this interface represent scenes in Bitwig Studio. */
interface Scene extends ClipLauncherSlotOrScene {
    /**  Returns an object that provides access to the name of the scene.
     * @returnType {SettableStringValue} a string value object that represents the scene name. */
    name(): SettableStringValue;
    /**  Value that reports the number of clips in the scene.
     * @returnType {IntegerValue} */
    clipCount(): IntegerValue;
    /**  Registers an observer that reports if the scene is selected in Bitwig Studio.
     * @param callback
              a callback function that takes a single boolean parameter. */
    addIsSelectedInEditorObserver(callback: BooleanCallback): void;
    /**  Selects the scene in Bitwig Studio. */
    selectInEditor(): void;
    /**  Makes the scene visible in the Bitwig Studio user interface. */
    showInEditor(): void;
}
