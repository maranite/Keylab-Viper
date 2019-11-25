declare class ShortMidiMessage {
    //  const NOTE_OFF = 0x80;
    //  const NOTE_ON = 0x90;
    //  const POLY_PRESSURE = 0xA0;
    //  const CONTROL_CHANGE = 0xB0;
    //  const PROGRAM_CHANGE = 0xC0;
    //  const CHANNEL_PRESSURE = 0xD0;
    //  const PITCH_BEND = 0xE0;
    //  const MIDI_TIME_CODE = 0xF1;
    //  const SONG_POSITION_POINTER = 0xF2;
    //  const SONG_SELECT = 0xF3;
    //  const TUNE_REQUEST = 0xF6;
    //  const TIMING_CLOCK = 0xF8;
    //  const START = 0xFA;
    //  const CONTINUE = 0xFB;
    //  const STOP = 0xFC;
    //  const ACTIVE_SENSING = 0xFE;
    //  const SYSTEM_RESET = 0xFF;
    constructor(status: number, data1: number, data2: number);
    /**  @returnType {int} */
    getStatusByte(): number;
    /**  @returnType {int} */
    getData1(): number;
    /**  @returnType {int} */
    getData2(): number;
    /**  @returnType {int} */
    getChannel(): number;
    /**  @returnType {int} */
    getStatusMessage(): number;
    /**  @returnType {boolean} */
    isNoteOff(): boolean;
    /**  @returnType {boolean} */
    isNoteOn(): boolean;
    /**  @returnType {boolean} */
    isPolyPressure(): boolean;
    /**  @returnType {boolean} */
    isControlChange(): boolean;
    /**  @returnType {boolean} */
    isProgramChange(): boolean;
    /**  @returnType {boolean} */
    isChannelPressure(): boolean;
}
