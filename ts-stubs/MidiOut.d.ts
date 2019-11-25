/** Instances of this interface are used to send MIDI messages to a specific MIDI hardware. */
interface MidiOut {
    /**  Sends a MIDI message to the hardware device.
     * @param status
              the status byte of the MIDI message
     * @param data1
              the data1 part of the MIDI message
     * @param data2
              the data2 part of the MIDI message */
    sendMidi(statusByte: number, data1: number, data2: number): void;
    /**  Sends a MIDI SysEx message to the hardware device.
     * @param hexString
              the sysex message formatted as hexadecimal value string */
    sendSysex(hexString: string): void;
    /**  Sends a MIDI SysEx message to the hardware device.
     * @param hexString
              the sysex message formatted as hexadecimal value string */
    sendSysex(data: number[]): void;
}
