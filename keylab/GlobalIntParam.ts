/// <reference path="../observable/AbstractObservable.ts" />
class GlobalIntParam {
    constructor(readonly hal: HAL, readonly cmd: number, readonly name: string = 'Signed Parameter') { }

    get(resolve: CallOf<number>) {
        this.hal.getValue(0x40, this.cmd,
            val => resolve(val < 0 ? 0x40 - val : val),
            error => { println(`Error getting value for ${this.name}: ${error.message}`) });
    }

    set(value: number) {
        if (value > 0x40) value = 0x40;
        if (value < -0x3F) value = 0x3F;
        this.hal.ensureValue(0x40, this.cmd, value < 0 ? 0x40 - value : value);
    }
}
