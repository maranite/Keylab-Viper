/// <reference path="./CCControl.ts" />

class Encoder extends CCControl {
    constructor(hal: HAL, id: number, name: string, channel: number, cc: number) {
        super(hal, id, name, ControlMode.Encoder, channel, cc);
    }

    handleMidiCc = (statusByte: number, data1: number, data2: number) => {
        if (!this.onTurn)
            return false;
        this.onTurn(data2 - 64);
        return true;
    };
    
    onTurn?: (inc: number) => void;
}
