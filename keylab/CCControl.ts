/// <reference path="./AbstractControl.ts" />

abstract class CCControl extends AbstractControl {

    constructor(hal: HAL, id: number, name: string, mode: ControlMode, channel: number, cc: number) {
        super(hal, id, name);
        this.config = [(mode & 0xF0 >> 8), channel, cc, 0, 127, mode & 0x01];
    }

    get mode(): ControlMode {
        return this._config ? <ControlMode>((this._config[0] << 8) & this._config[5]) : ControlMode.Off;
    }
    set mode(mode: ControlMode) {
        this.config = this.config.filter((v, i) =>
            i == 0 ? ((mode & 0xF0) >> 8) :
                i == 5 ? (mode & 0x01) : v);
    }

    get channel() { return this.config[1]; }
    set channel(channel: number) {
        this.config = this.config.filter((v, i) => i == 1 ? channel : v);
    }

    get cc() { return this.config[2]; }
    set cc(cc: number) {
        this.config = this.config.filter((v, i) => i == 2 ? cc : v);
    }

    set config(config: number[]) {
        if (this._config && this._config.length > 5)
            this.hal.ccMap.remove(this.channel, this.cc);
        this._config = config;
        this.hal.ccMap.set(this.channel, this.cc, this);
        this.invalidate();
    }

    abstract handleMidiCc: (status: number, data1: number, data2: number) => boolean;
}
