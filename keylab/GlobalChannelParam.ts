/// <reference path="../observable/AbstractObservable.ts" />
class GlobalChannelParam {
    constructor(readonly hal: HAL, readonly cmd: number, readonly name: string = 'Channel Parameter') { }

    get(resolve: CallOf<PartChannel>) {
        this.hal.getValue(0x40, this.cmd,
            value => {
                let v = <PartChannel>value;;
                switch (value) {
                    case 0x7E: v = 'All'; break;
                    case 0x7F: v = 'Panel'; break;
                    case 0x40: v = 'Part1'; break;
                    case 0x41: v = 'Part2'; break;
                }
                resolve(v);
            },
            error => { println(`Error getting value for ${this.name}: ${error.message}`) });
    }

    set(value: PartChannel) {
        let num: number;
        switch (value) {
            case 'All': num = 0x7E; break;
            case 'Panel': num = 0x7F; break;
            case 'Part1': num = 0x40; break;
            case 'Part2': num = 0x41; break;
            default: num = value;
        }
        this.hal.ensureValue(0x40, this.cmd, num);
    }
}
