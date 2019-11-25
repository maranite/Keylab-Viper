/// <reference path="./CCControl.ts" />

class Fader extends CCControl {
    constructor(hal: HAL, id: number, name: string, channel: number, cc: number) {
        super(hal, id, name, ControlMode.Fader, channel, cc);
    }

    handleMidiCc = (statusByte: number, data1: number, data2: number) => {
        if (!this.onMoved) return false;
        this.onMoved(data2);
        return true;
    };

    onMoved?: (value: number) => void;
}
