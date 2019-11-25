/**
 * A track bank provides access to a range of tracks and their scenes (clip launcher slots) in Bitwig Studio.
 * Instances of track bank are configured with a fixed number of tracks and scenes and represent an excerpt of
 * a larger list of tracks and scenes. Various methods are provided for scrolling to different sections of the
 * track/scene list. It basically acts like a 2-dimensional window moving over the grid of tracks and scenes.
 *
 * To receive an instance of track bank that supports all kinds of tracks call {ControllerHost#createTrackBank}.
 * Additional methods are provided in the {ControllerHost} interface to create track banks that include only main
 * tracks ({ControllerHost#createMainTrackBank}) or only effect tracks ({ControllerHost#createEffectTrackBank}).
 *
 * @see {ControllerHost#createTrackBank}
 * @see {ControllerHost#createMainTrackBank}
 * @see {ControllerHost#createEffectTrackBank}
 */
interface TrackBank extends ChannelBank<Track> {
    /**  Returns the track at the given index within the bank.
     * @param indexInBank
              the track index within this bank, not the index within the list of all Bitwig Studio tracks.
              Must be in the range [0..sizeOfBank-1].
     * @returnType {Track} the requested track object */
    getChannel(indexInBank: number): Track;
    /**  {SceneBank} that represents a view on the scenes in this {TrackBank}.
     * @returnType {SceneBank} */
    sceneBank(): SceneBank;
    /**  Scrolls the scenes one page down. */
    scrollScenesPageDown(): void;
    /**  Scrolls the scenes one step up. */
    scrollScenesUp(): void;
    /**  Scrolls the scenes one step down. */
    scrollScenesDown(): void;
    /**  Makes the scene with the given position visible in the track bank.
     * @param position
              the position of the scene within the underlying full list of scenes */
    scrollToScene(position: number): void;
    /**  Registers an observer that reports the current scene scroll position.
     * @param callback
              a callback function that takes a single integer parameter
     * @param valueWhenUnassigned
              the default value that gets reports when the track bank is not yet connected to a Bitwig
              Studio document */
    addSceneScrollPositionObserver(callback: (value: number) => void, valueWhenUnassigned: number): void;
    /**  Causes this bank to follow the supplied cursor. When the cursor moves to a new item the bank will be
     * scrolled so that the cursor is within the bank, if possible.
     * @param cursorTrack
              The {CursorTrack} that this bank should follow. */
    followCursorTrack(cursorTrack: CursorTrack): void;
}
