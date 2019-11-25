/// <reference path="./CCControl.ts" />

class Clickable extends CCControl {

    constructor(hal: HAL, id: number, name: string, channel: number, cc: number) {
        super(hal, id, name, ControlMode.GateButton, channel, cc);
    }

    _isDown = false;

    get isDown() { return this._isDown; }

    handleMidiCc = (statusByte: number, data1: number, data2: number) => {
        const isDown = this._isDown = data2 > 0;
        if (this.onPress)
            this.onPress(isDown);
        if (!isDown && this)
            this.hal.updateDisplay();
        return this.onPress !== undefined;
    };

    onPress?: (isDown: boolean) => void;

    get config() { return [8, this.channel, this.cc, 0, 127, 1]; }
}
