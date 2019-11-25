class Pad extends AbstractControl implements LedControl {
    constructor(hal: HAL, id: number, public readonly index: number, channel: number, note: number) {
        super(hal, id, `Pad ${index + 1}`);
        this.config = [9, channel, note, 20, 127, 1];
    }

    get channel() { return this.config[1]; }
    set channel(channel: number) {
        this.config = this.config.filter((v, i) => i == 1 ? channel : v);
    }

    get note() { return this.config[2]; }
    set note(note: number) {
        this.config = this.config.filter((v, i) => i == 2 ? note : v);
    }

    set config(config: number[]) {
        if (this._config.length >= 5)
            this.hal.noteMap.remove(this.channel, this.note);
        this._config = config;
        this.hal.noteMap.set(this.channel, this.note, this);
        this.invalidate();
    }

    _lit: boolean = <any>undefined;
    get isLit() { return this._lit; }
    set isLit(lit: boolean) {
        if (this._lit === lit)
            return;
        this._lit = lit;
        this.hal.setLED(this.id, lit);
    }

    private _isDown = false;
    get isDown() { return this._isDown; }

    handleMidi(status: number, data1: number, data2: number) {
        const cmd = status & 0x70;
        if (cmd === 0x90) this._isDown = data2 > 0;
        else if (cmd === 0x80) this._isDown = false;
    }
}
