/**
 * A scene bank provides access to a range of scenes in Bitwig Studio. Instances of scene bank are configured
 * with a fixed number of scenes and represent an excerpt of a larger list of scenes. Various methods are
 * provided for scrolling to different sections of the scene list. It basically acts like a window moving over
 * the list of underlying scenes.
 *
 * To receive an instance of scene bank call {ControllerHost#createSceneBank}.
 */
interface SceneBank extends ClipLauncherSlotOrSceneBank<Scene> {
    /**  Returns the scene at the given index within the bank.
     * @param indexInBank
              the scene index within this bank, not the index within the list of all Bitwig Studio scenes.
              Must be in the range [0..sizeOfBank-1].
     * @returnType {Scene} the requested scene object */
    getScene(indexInBank: number): Scene;
    /**  Launches the scene with the given bank index.
     * @param indexInWindow
              the scene index within the bank, not the position of the scene withing the underlying full
              list of scenes. */
    launchScene(indexInWindow: number): void;
}
