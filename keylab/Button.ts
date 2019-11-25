/// <reference path="./Clickable.ts" />

class Button extends Clickable implements LedControl {
    _lit: boolean = <any>undefined;
    get isLit() { return this._lit; }
    set isLit(lit: boolean) {
        //println(`isLit: Setting LED on ${this.name} to ${lit}`);
        if (this._lit === lit) return;
        this._lit = lit;
        this.hal.setLED(this.id, lit);
    }

    handleMidiCc = (statusByte: number, data1: number, data2: number) => {
        const isDown = this._isDown = data2 > 0;
        if (this.onPress) this.onPress(isDown);
        if (!isDown) {
            this.hal.updateDisplay();
            if (this._lit) this.hal.setLED(this.id, this._lit);
        }
        return this.onPress !== undefined;
    };
}
