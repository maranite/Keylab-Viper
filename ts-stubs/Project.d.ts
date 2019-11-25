/**
 * An interface for representing the current project.
 */
interface Project extends ObjectProxy {
    /**  Returns an object that represents the root track group of the active Bitwig Studio project.
     * @returnType {Track} the root track group of the currently active project */
    getRootTrackGroup(): Track;
    /**  Returns an object that represents the top level track group as shown in the arranger/mixer of the active
     * Bitwig Studio project.
     * @returnType {Track} the shown top level track group of the currently active project */
    getShownTopLevelTrackGroup(): Track;
    /**  Creates a new scene (using an existing empty scene if possible) from the clips that are currently
     * playing in the clip launcher. */
    createSceneFromPlayingLauncherClips(): void;
}
