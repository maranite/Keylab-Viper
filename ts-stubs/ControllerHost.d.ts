declare function printSysex(data: any): void;
declare function uint8ToHex(x: any): string;
declare function uint7ToHex(x: any): string;
declare function printMidi(status: number, data1: number, data2: number): void;

/** An interface representing the host application to the script. A singleton instance of this interface is
 * available in the global scope of each script. */
interface ControllerHost extends Host {
   //getOscModule (): OscModule;
   /**  Loads the supplied API version into the calling script. This is only intended to be called from a controller
    * script. It cannot be called from a Java controller extension.
    * @param {int} version */
   loadAPI(version: number): number;
   /**  Determines whether the calling script should fail if it calls a deprecated method based on the API version that it requested.
    * @returnType {boolean} */
   shouldFailOnDeprecatedUse(): boolean;
   /**  Sets whether the calling script should fail if it calls a deprecated method based on the API version
    * that it requested. This is only intended to be called from a controller
    * script. It cannot be called from a Java controller extension.
    * @param {boolean} value */
   setShouldFailOnDeprecatedUse(value: boolean): void;
   /**  Loads the script defined by the supplied path. This is only intended to be called from a controller
    * script. It cannot be called from a Java controller extension.
    * @param {string} path */
   load(path: string): void;
   /**  Indicates if the host platform is Windows.
    * @returnType {boolean} `true` if the host platform is Windows, `false` otherwise. */
   platformIsWindows(): boolean;
   /**  Indicates if the host platform is Apple Mac OS X.
    * @returnType {boolean} `true` if the host platform is Mac, `false` otherwise. */
   platformIsMac(): boolean;
   /**  Indicates if the host platform is Linux.
    * @returnType {boolean} `true` if the host platform is Linux, `false` otherwise. */
   platformIsLinux(): boolean;
   /**  Registers a controller script with the given parameters. This function must be called once at the global
    * scope of the script.
    * @param vendor
             the name of the hardware vendor. Must not be <code>null</code>.
    * @param name
             the name of the controller script as listed in the user interface of Bitwig Studio. Must not
             be <code>null</code>.
    * @param version
             the version of the controller script. Must not be <code>null</code>.
    * @param uuid
             a universal unique identifier (UUID) string that is used to distinguish one script from
             another, for example `550e8400-e29b-11d4-a716-446655440000`. Must not be <code>null</code>.
             For generating random UUID strings several free web tools are available.
    * @param author
             the name of the script author */
   defineController(vendor: string, name: string, version: string, uuid: string, author?: string): void;
   /**  Defines the number of MIDI ports for input and output that the device uses. This method should be called
    * once in the global scope if the script is supposed to exchange MIDI messages with the device, or if the
    * script adds entries to the MIDI input/output choosers in Bitwig Studio. After calling this method the
    * individual port objects can be accessed using {#getMidiInPort(int index)} and
    * {#getMidiInPort(int index)}.
    * @param numInports
             the number of input ports
    * @param numOutports
             the number of output ports */
   defineMidiPorts(numInports: number, numOutports: number): void;
   /**  Returns the MIDI input port with the given index.
    * @param index
             the index of the MIDI input port, must be valid.
    * @returnType {MidiIn} the requested MIDI input port */
   getMidiInPort(index: number): MidiIn;
   /**  Returns the MIDI output port with the given index.
    * @param index
             the index of the MIDI output port, must be valid.
    * @returnType {MidiOut} the requested MIDI output port */
   getMidiOutPort(index: number): MidiOut;
   /**  Registers patterns which are used to automatically detect hardware devices that can be used with the script.
    *
    * When the user clicks on the `detect` button in the Bitwig Studio controller preferences dialog, Bitwig
    * Studio searches for connected controller hardware by comparing the parameters passed into this function
    * are compared with the port names of the available MIDI drivers. Found controller scripts are
    * automatically added with their input/output ports configured.
    *
    * Calling this function is optional, but can also be called multiple times in the global script scope in
    * order to support alternative driver names.
    * @param inputs
             the array of strings used to detect MIDI input ports, must not be `null`.
    * @param outputs
             the array of strings used to detect MIDI output ports, must not be `null`. */
   addDeviceNameBasedDiscoveryPair(inputs: string[], outputs: string[]): void;
   /**  Creates a preferences object that can be used to insert settings into the Controller Preferences panel
    * in Bitwig Studio.
    * @returnType {Preferences} an object that provides access to custom controller preferences */
   getPreferences(): Preferences;
   /**  Creates a document state object that can be used to insert settings into the Studio I/O Panel in Bitwig
    * Studio.
    * @returnType {DocumentState} an object that provides access to custom document settings */
   getDocumentState(): DocumentState;
   /**  Returns an object that is used to configure automatic notifications. Bitwig Studio supports automatic
    * visual feedback from controllers that shows up as popup notifications. For example when the selected
    * track or the current device preset was changed on the controller these notifications are shown,
    * depending on your configuration.
    * @returnType {NotificationSettings} a configuration object used to enable/disable the various automatic notifications supported by Bitwig Studio */
   getNotificationSettings(): NotificationSettings;
   /**  Returns an object for controlling various aspects of the currently selected project.
    * @returnType {Project} */
   getProject(): Project;
   /**  Returns an object for controlling and monitoring the elements of the `Transport` section in Bitwig
    * Studio. This function should be called once during initialization of the script if transport access is
    * desired.
    * @returnType {Transport} an object that represents the `Transport` section in Bitwig Studio. */
   createTransport(): Transport;
   /**  Returns an object for controlling and monitoring the `Groove` section in Bitwig Studio. This function
    * should be called once during initialization of the script if groove control is desired.
    * @returnType {Groove} an object that represents the `Groove` section in Bitwig Studio. */
   createGroove(): Groove;
   /**  Returns an object that provides access to general application functionality, including global view
    * settings, the list of open projects, and other global settings that are not related to a certain
    * document.
    * @returnType {Application} an application object. */
   createApplication(): Application;
   /**  Returns an object which provides access to the `Arranger` panel of Bitwig Studio. Calling this function
    * is equal to `createArranger(-1)`.
    * @returnType {Arranger} an arranger object */
   createArranger(): Arranger;
   /**  Returns an object which provides access to the `Arranger` panel inside the specified window.
    * @param window
             the index of the window where the arranger panel is shown, or -1 in case the first arranger
             panel found on any window should be taken
    * @returnType {Arranger} an arranger object */
   createArranger(window: number): Arranger;
   /**  Returns an object which provides access to the `Mixer` panel of Bitwig Studio. Calling this function is
    * equal to `createMixer(-1, null)`.
    * @returnType {Mixer} a `Mixer` object */
   createMixer(): Mixer;
   /**  Returns an object which provides access to the `Mixer` panel that belongs to the specified panel layout.
    * Calling this function is equal to `createMixer(-1, panelLayout)`.
    * @param panelLayout
             the name of the panel layout that contains the mixer panel, or `null` in case the selected
             panel layout in Bitwig Studio should be followed. Empty strings or invalid names are treated
             the same way as `null`. To receive the list of available panel layouts see
             {Application#addPanelLayoutObserver}.
    * @returnType {Mixer} a `Mixer` object */
   createMixer(panelLayout?: string): void;
   /**  Returns an object which provides access to the `Mixer` panel inside the specified window. Calling this
    * function is equal to `createMixer(window, null)`.
    * @param window
             the index of the window where the mixer panel is shown, or -1 in case the first mixer panel
             found on any window should be taken
    * @returnType {Mixer} a `Mixer` object */
   createMixer(window: number): Mixer;
   /**  Returns an object which provides access to the `Mixer` panel that matches the specified parameters.
    * @param panelLayout
             the name of the panel layout that contains the mixer panel, or `null` in case the selected
             panel layout in Bitwig Studio should be followed. Empty strings or invalid names are treated
             the same way as `null`. To receive the list of available panel layouts see
             {Application#addPanelLayoutObserver}.
    * @param window
             the index of the window where the mixer panel is shown, or -1 in case the first mixer panel
             found on any window should be taken
    * @returnType {Mixer} a `Mixer` object */
   createMixer(panelLayout: string, window: number): Mixer;
   /**  Returns a track bank with the given number of child tracks, sends and scenes.
    * Creating a track bank using this method will consider all tracks in the document, including effect
    * tracks and the master track. Use {#createMainTrackBank} or {#createEffectTrackBank} in case
    * you are only interested in tracks of a certain kind.
    * @param numTracks             the number of child tracks spanned by the track bank
    * @param numSends             the number of sends spanned by the track bank
    * @param numScenes             the number of scenes spanned by the track bank
    * @param hasFlatTrackList
             specifies whether the track bank should operate on a flat list of all nested child tracks or
             only on the direct child tracks of the connected group track.
    * @returnType {TrackBank} an object for bank-wise navigation of tracks, sends and scenes */
   createTrackBank(numTracks: number, numSends: number, numScenes: number, hasFlatTrackList?: boolean): TrackBank;
   /** Returns a track bank with the given number of tracks, sends and scenes. Only audio tracks, instrument tracks and hybrid tracks are considered.
    * @param numTracks             the number of tracks spanned by the track bank
    * @param numSends             the number of sends spanned by the track bank
    * @param numScenes             the number of scenes spanned by the track bank
    * @returnType {TrackBank} an object for bank-wise navigation of tracks, sends and scenes */
   createMainTrackBank(numTracks: number, numSends: number, numScenes: number): TrackBank;
   /**  Returns a track bank with the given number of effect tracks and scenes. Only effect tracks are
    * considered.
    * @param numTracks
             the number of tracks spanned by the track bank
    * @param numScenes
             the number of scenes spanned by the track bank
    * @returnType {TrackBank} an object for bank-wise navigation of tracks, sends and scenes */
   createEffectTrackBank(numTracks: number, numScenes: number): TrackBank;
   /**  Returns an object that represents the master track of the document.
    * @param numScenes
             the number of scenes for bank-wise navigation of the master tracks clip launcher slots.
    * @returnType {MasterTrack} an object representing the master track. */
   createMasterTrack(numScenes: number): MasterTrack;
   /**  Returns an object that represents the cursor item of the arranger track selection.
    * @param numSends
             the number of sends for bank-wise navigation of the sends that are associated with the track selection
    * @param numScenes
             the number of scenes for bank-wise navigation of the clip launcher slots that are associated with the track selection
    * @returnType {CursorTrack} an object representing the currently selected arranger track (in the future also multiple tracks) */
   createArrangerCursorTrack(numSends: number, numScenes: number): CursorTrack;
   /**  Returns an object that represents a named cursor track, that is independent from the arranger or mixer
    * track selection in the user interface of Bitwig Studio.
    * @param name - the name of the track cursor
    * @param numSends - the number of sends for bank-wise navigation of the sends that are associated with the track selection
    * @param numScenes - the number of scenes for bank-wise navigation of the clip launcher slots that are associated with the track selection
    * @returnType {CursorTrack} an object representing the currently selected arranger track (in the future also multiple tracks).*/
   createCursorTrack(name: string, numSends: number, numScenes: number): CursorTrack;
   /** Returns an object that represents a named cursor track, that is independent from the arranger or mixer
    * track selection in the user interface of Bitwig Studio.
    * @param {string} id
    * @param {string} name
    * @param {int} numSends
    * @param {int} numScenes
    * @param {boolean} shouldFollowSelection
    * @returnType {CursorTrack} an object representing the currently selected arranger track (in the future also multiple tracks). */
   createCursorTrack(id: string, name: string, numSends: number, numScenes: number, shouldFollowSelection: boolean): CursorTrack;
   /**  Returns a scene bank with the given number of scenes.
    * The scene bank returned by this function provides a convenient interface for controlling which scenes
    * are currently shown on the hardware.
    * @param numScenes             the number of scenes spanned by the track bank
    * @returnType {SceneBank} an object for bank-wise navigation of scenes */
   createSceneBank(numScenes: number): SceneBank;
   /**  Returns an object that represents the cursor device in devices selections made by the user in Bitwig
    * Studio. Calling this method is equal to the following code: 
    * {
    *    var cursorTrack = createArrangerCursorTrack(numSends, numScenes);
    *    var cursorDevice = cursorTrack.createCursorDevice();
    * } 
    * To create a custom device selection that is not connected to the main device selection in the user
    * interface, call {Track#createCursorDevice(String) cursorTrack.createCursorDevice(String name)}.
    * @param numSends
             the number of sends that are simultaneously accessible in nested channels.
    * @returnType {CursorDevice} an object representing the currently selected device. */
   createEditorCursorDevice(numSends: number): CursorDevice;
   /**  Returns a clip object that represents the cursor of the launcher clip selection. The gridWidth and
    * gridHeight parameters specify the grid dimensions used to access the note content of the clip.
    * @param gridWidth
             the number of steps spanned by one page of the note content grid.
    * @param gridHeight
             the number of keys spanned by one page of the note content grid.
    * @returnType {Clip} an object representing the currently selected cursor clip  */
   createLauncherCursorClip(gridWidth: number, gridHeight: number): Clip;
   /**  Returns a clip object that represents the cursor of the arranger clip selection. The gridWidth and
    * gridHeight parameters specify the grid dimensions used to access the note content of the clip.
    * @param gridWidth
             the number of steps spanned by one page of the note content grid.
    * @param gridHeight
             the number of keys spanned by one page of the note content grid.
    * @returnType {Clip} an object representing the currently selected cursor clip */
   createArrangerCursorClip(gridWidth: number, gridHeight: number): Clip;
   /**  Returns an object that is used to define a bank of custom user controls. These controls are available to
    * the user for free controller assignments and are typically used when bank-wise navigation is
    * inconvenient.
    * @param numControllers
             the number of controls that are available for free assignments
    * @returnType {UserControlBank} An object that represents a set of custom user controls. */
   createUserControls(numControllers: number): UserControlBank;
   /**  Schedules the given callback function for execution after the given delay. For timer applications call
    * this method once initially and then from within the callback function.
    * @param {java.lang.Runnable} callback
    * @param {long} delay */
   scheduleTask(callback: { (value: void): void } | { (): void }, delay: number): void;
   /**  Requests that the driver's flush method gets called. */
   requestFlush(): void;
   /**  Prints the given string in the control surface console window. The console window can be opened in the
    * view menu of Bitwig Studio.
    * @param s
             the string to be printed */
   println(s: any): void;
   /**  Prints the given string in the control surface console window using a text style that highlights the
    * string as error. The console window can be opened in the view menu of Bitwig Studio.
    * @param s
             the error string to be printed
*/
   errorln(s: string): void;
   /**  Shows a temporary text overlay on top of the application GUI, that will fade-out after a short interval.
    * If the overlay is already shown, it will get updated with the given text.
    * @param text
             the text to be shown
*/
   showPopupNotification(text: string): void;
   // /**
   //  * Opens a TCP (Transmission Control Protocol) host socket for allowing network connections from other
   //  * hardware and software.
   //  *
   //  * @param name
   //           a meaningful name that describes the purpose of this connection.
   //  * @param defaultPort
   //           the port that should be used for the connection. If the port is already in use, then another
   //           port will be used. Check {RemoteSocket#getPort()} on the returned object to be sure.
   //  * @returnType {RemoteSocket} the object that represents the socket
   //  * @since API version 1
   //  */
   // createRemoteConnection(name: string, defaultPort: number): any;
   // /**
   //  * Connects to a remote TCP (Transmission Control Protocol) socket.
   //  *
   //  * @param host
   //           the host name or IP address to connect to.
   //  * @param port
   //           the port to connect to
   //  * @param callback
   //           the callback function that gets called when the connection gets established. A single
   //           {RemoteConnection} parameter is passed into the callback function.
   //  * @since API version 1
   //  */
   // connectToRemoteHost(host, port, callback);
   // /**
   //  * Sends a UDP (User Datagram Protocol) packet with the given data to the specified host.
   //  *
   //  * @param host
   //           the destination host name or IP address
   //  * @param port
   //           the destination port
   //  * @param data
   //           the data to be send. When creating a numeric byte array in JavaScript, the byte values must be
   //           signed (in the range -128..127).
   //  * @since API version 1
   //  */
   // sendDatagramPacket(host, port, data);
   // /**
   //  * Adds an observer for incoming UDP (User Datagram Protocol) packets on the selected port.
   //  *
   //  * @param name
   //           a meaningful name that describes the purpose of this observer.
   //  * @param port
   //           the port that should be used
   //  * @param callback
   //           the callback function that gets called when data arrives. The function receives a single
   //           parameter that contains the data byte array.
   //  * @returnType {boolean} {@true} if was possible to bind the port, false otherwise
   //  * @since API version 1
   //  */
   // addDatagramPacketObserver(name, port, callback);
   /**  @param {int} numSends
    * @param {int} numScenes
    * @returnType {CursorTrack}
*/
   createCursorTrack(numSends: number, numScenes: number): CursorTrack;
   /**  Creates a {PopupBrowser} that represents the pop-up browser in Bitwig Studio.
    * @returnType {PopupBrowser} */
   createPopupBrowser(): PopupBrowser;
   /**  {BeatTimeFormatter} used to format beat times by default. This will be used to format beat times
    * when asking for a beat time in string format without providing any formatting options. For example by
    * calling {BeatTimeStringValue#get()}.
    * @returnType {BeatTimeFormatter} */
   defaultBeatTimeFormatter(): BeatTimeFormatter;
   /**  Sets the {BeatTimeFormatter} to use by default for formatting beat times.
    * @param {BeatTimeFormatter} formatter */
   setDefaultBeatTimeFormatter(formatter: BeatTimeFormatter): void;
   /**  Creates a {BeatTimeFormatter} that can be used to format beat times.
    * @param separator
             the character used to separate the segments of the formatted beat time, typically ":", "." or
             "-"
    * @param barsLen
             the number of digits reserved for bars
    * @param beatsLen
             the number of digits reserved for beats
    * @param subdivisionLen
             the number of digits reserved for beat subdivisions
    * @param ticksLen
             the number of digits reserved for ticks
    * @returnType {BeatTimeFormatter} */
   createBeatTimeFormatter(separator: string, barsLen: number, beatsLen: number, subdivisionLen: number, ticksLen: number): BeatTimeFormatter;
   /** Gets the HardwareDevice at the specified index. */
   //hardwareDevice (index:number): HardwareDevice;
   /** Restarts this controller */
   restart(): void;
}
