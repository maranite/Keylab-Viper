/** A common base interface for labeled and categorized settings.*/
interface Setting {
    /**  Returns the category name of the setting.
     * @returnType {string} a string value containing the category name */
    getCategory(): string;
    /**  Returns the label text of the setting.
     * @returnType {string} a string value containing the label text */
    getLabel(): string;
    /**  Marks the settings as enabled in Bitwig Studio. By default the setting is enabled.
     * */
    enable(): void;
    /**  Marks the settings as disabled in Bitwig Studio. By default the setting is enabled.
     * */
    disable(): void;
    /**  Shows the setting in Bitwig Studio. By default the setting is shown.
     * */
    show(): void;
    /**  Hides the setting in Bitwig Studio. By default the setting is shown. */
    hide(): void;
}
