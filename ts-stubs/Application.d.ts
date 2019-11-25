/**
 * An interface that provides methods for accessing the most common global application commands.
 *
 * In addition, functions are provided for accessing any application action in a generic and categorized way,
 * pretty much as displayed in the Bitwig Studio commander dialog (see {#getActions()},
 * {#getAction(String)}, {#getActionCategories()}), {#getActionCategory(String)}).
 *
 * To receive an instance of the application interface call {ControllerHost#createApplication()}.
 */
interface Application {
    /**  Creates a new audio track at the given position.
     * @param position
              the index within the list of main tracks where the new track should be inserted, or `-1` in
              case the track should be inserted at the end of the list. Values outside the valid range will
              get pinned to the valid range, so the actual position might be different from the provided
              parameter value.
     */
    createAudioTrack(position: number): void;
    /**  Creates a new instrument track at the given position.
     * @param position
              the index within the list of main tracks where the new track should be inserted, or `-1` in
              case the track should be inserted at the end of the list. Values outside the valid range will
              get pinned to the valid range, so the actual position might be different from the provided
              parameter value. */
    createInstrumentTrack(position: number): void;
    /**  Creates a new effect track at the given position.
     * @param position
              the index within the list of effect tracks where the new track should be inserted, or `-1` in
              case the track should be inserted at the end of the list. Values outside the valid range will
              get pinned to the valid range, so the actual position might be different from the provided
              parameter value. */
    createEffectTrack(position: number): void;
    /**  Returns a list of actions that the application supports. Actions are commands in Bitwig Studio that are
     * typically accessible through menus or keyboard shortcuts.
     *
     * Please note that many of the commands encapsulated by the reported actions are also accessible through
     * other (probably more convenient) interfaces methods of the API. In contrast to that, this method
     * provides a more generic way to find available application functionality.
     * @returnType {Action[]} the list of actions */
    getActions(): Action[];
    /**  Returns the action for the given action identifier. For a list of available actions, see
     * {#getActions()}.
     * @param id
              the action identifier string, must not be `null`
     * @returnType {Action} the action associated with the given id, or null in case there is no action with the given
            identifier. */
    getAction(id: number): Action;
    /**  Returns a list of action categories that is used by Bitwig Studio to group actions into categories.
     * @returnType {ActionCategory[]} the list of action categories */
    getActionCategories(): ActionCategory[];
    /**  Returns the action category associated with the given identifier. For a list of available action
     * categories, see {#getActionCategories()}.
     * @param id
              the category identifier string, must not be `null`
     * @returnType {ActionCategory} the action associated with the given id, or null in case there is no category with the given
            identifier */
    getActionCategory(id: string): ActionCategory;
    /** Activates the audio engine in Bitwig Studio.     */
    activateEngine(): void;
    /** Deactivates the audio engine in Bitwig Studio.     */
    deactivateEngine(): void;
    /**  Value that reports whether an audio engine is active or not.
     * @returnType {BooleanValue} */
    hasActiveEngine(): BooleanValue;
    /**  Value that reports the name of the current project.
     * @returnType {StringValue} */
    projectName(): StringValue;
    /** Switches to the next project tab in Bitwig Studio.     */
    nextProject(): void;
    /** Switches to the previous project tab in Bitwig Studio. */
    previousProject(): void;
    /**  Set BitwigStudio to navigate into the group.
     * @param {Track} track */
    navigateIntoTrackGroup(track: Track): void;
    /** Set BitwigStudio to navigate into the parent group.      */
    navigateToParentTrackGroup(): void;
    /** Sends an undo command to Bitwig Studio. */
    undo(): void;
    /** Sends a redo command to Bitwig Studio. */
    redo(): void;
    /**  Switches the Bitwig Studio user interface to the panel layout with the given name. The list of available
     * panel layouts depends on the active display profile.
     * @param panelLayout
              the name of the new panel layout */
    setPanelLayout(panelLayout: string): void;
    /**  Switches to the next panel layout of the active display profile in Bitwig Studio.  */
    nextPanelLayout(): void;
    /** Switches to the previous panel layout of the active display profile in Bitwig Studio. */
    previousPanelLayout(): void;
    /** Value that reports the name of the active panel layout.
     * @returnType {StringValue}     */
    panelLayout(): StringValue;
    /**  Value that reports the name of the active display profile.
     * @returnType {StringValue} */
    displayProfile(): StringValue;
    /**  Toggles the visibility of the inspector panel. */
    toggleInspector(): void;
    /**  Toggles the visibility of the device chain panel.     */
    toggleDevices(): void;
    /**  Toggles the visibility of the mixer panel.     */
    toggleMixer(): void;
    /**  Toggles the visibility of the note editor panel.     */
    toggleNoteEditor(): void;
    /**  Toggles the visibility of the automation editor panel.     */
    toggleAutomationEditor(): void;
    /**  Toggles the visibility of the browser panel.     */
    toggleBrowserVisibility(): void;
    /**  Shows the previous detail panel (note editor, device, automation).
     */
    previousSubPanel(): void;
    /**  Shows the next detail panel (note editor, device, automation).     */
    nextSubPanel(): void;
    /**  Equivalent to an Arrow-Left key stroke on the computer keyboard. The concrete functionality depends on
     * the current keyboard focus in Bitwig Studio.     */
    arrowKeyLeft(): void;
    /**  Equivalent to an Arrow-Right key stroke on the computer keyboard. The concrete functionality depends on
     * the current keyboard focus in Bitwig Studio.     */
    arrowKeyRight(): void;
    /**  Equivalent to an Arrow-Up key stroke on the computer keyboard. The concrete functionality depends on the
     * current keyboard focus in Bitwig Studio.     */
    arrowKeyUp(): void;
    /**  Equivalent to an Arrow-Down key stroke on the computer keyboard. The concrete functionality depends on
     * the current keyboard focus in Bitwig Studio.     */
    arrowKeyDown(): void;
    /**  Equivalent to an Enter key stroke on the computer keyboard. The concrete functionality depends on the
     * current keyboard focus in Bitwig Studio.     */
    enter(): void;
    /**  Equivalent to an Escape key stroke on the computer keyboard. The concrete functionality depends on the
     * current keyboard focus in Bitwig Studio.     */
    escape(): void;
    /**  Selects all items according the current selection focus in Bitwig Studio.     */
    selectAll(): void;
    /**  Deselects any items according the current selection focus in Bitwig Studio.     */
    selectNone(): void;
    /**  Cuts the selected items in Bitwig Studio if applicable.     */
    cut(): void;
    /**  Copies the selected items in Bitwig Studio to the clipboard if applicable.     */
    copy(): void;
    /**  Pastes the clipboard contents into the current selection focus in Bitwig Studio if applicable.     */
    paste(): void;
    /**  Duplicates the active selection in Bitwig Studio if applicable.     */
    duplicate(): void;
    /**  Deletes the selected items in Bitwig Studio if applicable. Originally this function was called `delete`
     * (Bitwig Studio 1.0). But as `delete` is reserved in JavaScript this function got renamed to `remove` in
     * Bitwig Studio 1.0.9.     */
    remove(): void;
    /**  Opens a text input field in Bitwig Studio for renaming the selected item.     */
    rename(): void;
    /**  Zooms in one step into the currently focused editor of the Bitwig Studio user interface.     */
    zoomIn(): void;
    /**  Zooms out one step in the currently focused editor of the Bitwig Studio user interface.     */
    zoomOut(): void;
    /**  Adjusts the zoom level of the currently focused editor so that it matches the active selection.     */
    zoomToSelection(): void;
    /**  Adjusts the zoom level of the currently focused editor so that all content becomes visible.     */
    zoomToFit(): void;
    /**  Moves the panel focus to the panel on the left of the currently focused panel.     */
    focusPanelToLeft(): void;
    /**  Moves the panel focus to the panel right to the currently focused panel.     */
    focusPanelToRight(): void;
    /**  Moves the panel focus to the panel above the currently focused panel.     */
    focusPanelAbove(): void;
    /**  Moves the panel focus to the panel below the currently focused panel.     */
    focusPanelBelow(): void;
    /**  Toggles between full screen and windowed user interface.     */
    toggleFullScreen(): void;
}
