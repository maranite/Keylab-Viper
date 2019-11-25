/// <reference path="../observable/AbstractObservable.ts" />
class GlobalBoolParam {
    constructor(readonly hal: HAL, readonly cmd: number, readonly name: string = 'Boolean Parameter') { }
    get(resolve: CallOf<boolean>) { this.hal.getValue(0x40, this.cmd, v => resolve(v > 1)); }
    set(value: boolean) { this.hal.ensureValue(0x40, this.cmd, value ? 0x7F : 0x01); }
}

