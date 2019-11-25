interface ClipLauncherSlotOrScene extends ObjectProxy {
    /**  Returns an object that provides access to the name of the scene.
     * @returnType {StringValue} a string value object that represents the scene name. */
    name(): StringValue;
    /**  Launches the scene. */
    launch(): void;
    /**  Value that reports the position of the scene within the list of Bitwig Studio scenes.
     * @returnType {IntegerValue} */
    sceneIndex(): IntegerValue;
    /**  Copies the current slot or scene into the dest slot or scene.
     * @param {ClipLauncherSlotOrScene} source
     * @since API version 4 */
    copyFrom(source: ClipLauncherSlotOrScene): void;
    /**  Moves the current slot or scene into the destination slot or scene.
     * @param {ClipLauncherSlotOrScene} dest
     * @since API version 4 */
    moveTo(dest: ClipLauncherSlotOrScene): void;
    /** Value that reports the color of this slot. */
    color(): SettableColorValue;
    /** An InsertionPoint that can be used to insert content in the next scene. */
    nextSceneInsertionPoint(): InsertionPoint;
    /** An InsertionPoint that can be used to insert content after this slot or scene. */
    previousSceneInsertionPoint(): InsertionPoint;
    /** An InsertionPoint that is used to replace the contents of this slot or scene. */
    replaceInsertionPoint(): InsertionPoint;
}
