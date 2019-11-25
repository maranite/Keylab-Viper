class PadBinder {
    constructor(readonly hal: HAL) { }

    private createLedSetters(isActive: ObservableValue<boolean>) {
        return this.hal.controls.pads.map((pad, index) => {
            let isLit = false;
            return {
                pad,
                index,
                applyLED: () => pad.isLit = isLit,
                setLED: (lit: boolean) => {
                    isLit = lit;
                    if (isActive.get())
                        pad.isLit = lit;
                }
            };
        });
    }


    grid(isActive: ObservableValue<boolean>, callback: (pad: Pad, index: number, setLED: CallOf<boolean>) => CallOf<boolean>) {

        const ledSetters = this.createLedSetters(isActive);

        const clickActions = this.hal.controls.pads.map((pad, index) => callback(pad, index, ledSetters[index].setLED));

        function onPadMidi(pad: Pad, status: number, data1: number, data2: number) {
            const cmd = status & 0x70;
            if (cmd === 0x90)
                clickActions[pad.index](data2 > 0);
            else if (cmd === 0x80)
                clickActions[pad.index](false);
        }

        isActive.addValueObserver(active => {
            if (!active) return;
            ledSetters.forEach(v => v.applyLED());
            this.hal.onPadMidi = onPadMidi;
        });
        return ledSetters;
    }
 
    midi(isActive: ObservableValue<boolean>, onPadMidi: (pad: Pad, status: number, data1: number, data2: number) => void) {
        const ledSetters = this.createLedSetters(isActive);
        isActive.addValueObserver(active => {
            if (!active)
                return;
            ledSetters.forEach(v => v.applyLED());
            this.hal.onPadMidi = onPadMidi;
        });
        return ledSetters;
    }
}

