/// <reference path="./TwoDim.ts" />
let flush = () => { host.println('Flushing '); }

class HAL {

    constructor() {
        const midiOut = host.getMidiOutPort(0);
        const midiIn = host.getMidiInPort(0);
        const midiInKeys = midiIn.createNoteInput("Keys",
            "80????", // Note off
            "90????", // Note on
            "A0????", // Poly After touch  (not supported by keylab)
            "B001??", // CC 01 = Modwheel
            "B002??", // CC 02 = Breath
            "B004??", // CC 04 = Foot Controller
            "B00B??", // CC 11 = Expression Controller
            "B040??", // CCx40 = Damper Pedal on/off (Sustain)
            "B042??", // CCx42 = Sostenuto On/Off
            "B043??", // CCx43 = Soft Pedal On/Off
            "C0????", // Program Change
            "D0????", // Channel pressure
            "E0????" // Pitch Bend
        );
        midiInKeys.setShouldConsumeEvents(true);

        this.sendSysex = sysex => {
            this.nextClearToSendtime = Date.now() + this.sysexCadence;
            midiOut.sendSysex(sysex);
            this.bytesSinceFlush += sysex.length;
        }

        flush = this.flush;        // set Bitwig flush method to call ours.
        midiIn.setSysexCallback(this.handleSysex);
        midiIn.setMidiCallback(this.handleMidi);
        this.controls = new Controls(this);
        this.ensureValue(0x02, 0x40, 0x7F);
        //this.enqueueSysex([0x02, 0x00, 0x40, 0x02, 0x7F]); // Set relative control mode
    }

    readonly ccMap = new TwoDim<CCControl>();
    readonly noteMap = new TwoDim<Pad>();
    readonly controlById: { [id: number]: AbstractControl; } = {};
    readonly controls: Controls;

    readonly sendSysex: (sysex: number[]) => void;  // Set up in CTOR

    /** Next time when it will be OK to send sysex */
    private nextClearToSendtime: number = 0;

    /** Queue of delegates wanting to get exclusive access to the sysex sending service */
    private sysexQueue: { sysex: number[], onSend?: () => void }[] = [];

    /** Queue of delegates wanting to get exclusive access to the sysex sending service */
    private pendingGets: {
        id: number, cmd: number,
        resolve?: CallOf<number>,
        reject?: CallOf<Error>,
        attempts: number,
        timesOut: number,
    }[] = [];

    private processTimedOutRequests() {
        const now = Date.now();
        for (let i = 0; i < this.pendingGets.length; i++) {
            const r = this.pendingGets[i];
            if (r.timesOut < now) {
                const name = (this.controlById[r.id] || { name: "Unknown" }).name;
                const message = `Request timed out for ${name} ${asHex(r.id)}:${asHex(r.cmd)}`;
                if (++r.attempts < 3) {
                    //println(`${message}   ...retrying`);
                    this.enqueueSysex([0x01, 0x00, r.cmd, r.id], () => { r.timesOut = Date.now() + 100; });
                } else {
                    println(`${message} - giving up.`);
                    if (r.reject) r.reject(new Error(message));
                    this.pendingGets.splice(i, 1);
                }
            }
        }
    }

    /** The number of milliseconds to wait, to provide Keylab time to process */
    private sysexCadence: number = 55;
    /** Number of bytes transmitted during the current flush cycle */
    private bytesSinceFlush: number = 0;
    /** Maximum allowable number of sysex bytes transmitted per flush */
    private maxBytesPerFlush: number = 48;
    /** True when the flush() method is scheduled for execution */
    private isFlushQueued = false;

    /** Ensures that flush() is scheduled for execution*/
    private enqueueFlush() {
        if (this.isFlushQueued) return;
        this.isFlushQueued = true;
        if (this.nextClearToSendtime === 0)
            host.requestFlush();
        else
            host.scheduleTask(() => host.requestFlush(), this.nextClearToSendtime - Date.now());
    }

    /** When a client calls sendSysex, the request for access to the send sysex serivce is queued,
     *  and that queue is processed during a flush.
     *  This  loops, calling each requestor in order until a requestor uses the service.
     *  If the queue is not empty after the service is used, then a subsequent flush is scheduled.      */
    flush = () => {
        this.isFlushQueued = false;
        if (this.nextClearToSendtime > Date.now()) {
            this.enqueueFlush();
            return;
        }
        this.bytesSinceFlush = 0;
        this.nextClearToSendtime = 0;
        const queue = this.sysexQueue;
        while (queue.length > 0) {
            let item = queue[0];
            const sizeIfSent = this.bytesSinceFlush + item.sysex.length;
            if (sizeIfSent > this.maxBytesPerFlush) break;
            queue.shift();
            this.sendSysex(item.sysex);
            if (item.onSend) item.onSend();
        }

        if (queue.length > 0 || this.bytesSinceFlush > 0)
            this.enqueueFlush();
        else {
            this.processTimedOutRequests();
            host.scheduleTask(() => {
                for (let key in this.controlById) {
                    const control = this.controlById[key];
                    if (!control.isValid) control.invalidate();
                }
            }, 10000);
        }
    };

    /** Schedules an outbound sysex message for transmission.
     * If the queue is empty, the message is sent immediately.
     * Otherwise it is queued on a scheduler for later transmission */
    enqueueSysex(sysex: number[], onSend?: () => void) {
        const bytes = [0xF0, 0x00, 0x20, 0x6B, 0x7F, 0x42, ...sysex, 0xF7];
        const sizeIfSent = this.bytesSinceFlush + bytes.length;
        if (sizeIfSent <= this.maxBytesPerFlush)
            this.sendSysex(bytes);
        else {
            this.sysexQueue.push({ sysex: bytes, onSend });
            this.enqueueFlush();
        }
    }

    private readonly handleSysex = (data: string) => {
        //printx('Sysex Received: ', data);
        this.nextClearToSendtime = 0;
        let match = data.match(/f000206b(..)420200(..)(..)(..)f7/i);
        if (!match || match.length < 4) {
            println(`Sysex Not Handled: ${data}`); // <-- f000206b7f42020004f0... SYSEX GETS CUT OFF
            return;
        }
        const cmd = parseInt(match[2], 16);
        const id = parseInt(match[3], 16);
        const val = parseInt(match[4], 16);
        for (let i = 0; i < this.pendingGets.length; i++) {
            const r = this.pendingGets[i];
            if (r.id === id && r.cmd === cmd) {
                this.pendingGets.splice(i--, 1);
                if (r.resolve) r.resolve(val);
            }
        }
        this.processTimedOutRequests();
    };


    /** Sets a single config value */
    setValue(id: number, cmd: number, value: number) { this.enqueueSysex([0x02, 0x00, cmd, id, value]); }

    getValue(id: number, cmd: number, resolve: CallOf<number>, reject?: CallOf<Error>) {
        this.enqueueSysex([0x01, 0x00, cmd, id], () => {
            this.pendingGets.push({ id, cmd, resolve, reject, attempts: 1, timesOut: Date.now() + 50 });
        });
    }

    ensureValue(id: number, cmd: number, value: number, resolve?: () => void, attempt = 1) {
        this.getValue(id, cmd, val => {
            if (val === value) {
                if (resolve) resolve();
                return;
            }
            if (attempt >= 3) {
                const name = (this.controlById[id] || { name: 'Unknown / Parameter' }).name;
                const message = `Unable to set ${asHex(id)}:${asHex(cmd)} to ${asHex(value)} on ${name} after ${attempt} attempts.`;
                throw new Error(message);
            }
            this.setValue(id, cmd, value);
            this.ensureValue(id, cmd, value, resolve, attempt + 1);
        });
    }

    setLED = (id: number, isLit: boolean) => {
        const message = [0x02, 0x00, 0x10, id, isLit ? 0x7F : 0x00];
        if (this.isFlushQueued)
            this.enqueueSysex(message);
        else
            this.sendSysex(message);
    };

    /** Instructs Keylab to load a memory preset */
    loadMemory(preset: KeylabPreset) { this.enqueueSysex([0x05, preset]); }

    /** Instructs Keylab to store a memory preset */
    saveMemory(preset: KeylabPreset) { this.enqueueSysex([0x06, preset]); }

    readonly displayBytes: number[] = [0x04, 0x00, 0x60,
        0x01, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00,
        0x02, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x00];

    /** Prints characters to the Keylab display. Use with caution, becuase the cunts at Arturia
     *  have a firmware bug that causes the next note-on to have 100% velocity      */
    setDisplay(line1: string, line2: string = '') {
        for (let i = 0; i < 16; i++) {
            this.displayBytes[4 + i] = (i < line1.length) ? line1.charCodeAt(i) : 0x20;
            this.displayBytes[22 + i] = (i < line2.length) ? line2.charCodeAt(i) : 0x20;
        }
        this.updateDisplay();
    }

    updateDisplay() { this.enqueueSysex(this.displayBytes); }

    onPadMidi?: (pad: Pad, status: number, data1: number, data2: number) => void;


    handleMidi(status: number, data1: number, data2: number) {
        const cmd = status & 0xF0;
        const ch = status & 0x0F;
        if (cmd === 0xB0) {
            const ctrl = this.ccMap.get(ch, data1);
            if (ctrl && ctrl.handleMidiCc(status, data1, data2))
                return;
            host.println(`Unhandled CC: ${asHex(status)}-${asHex(data1)}-${asHex(data2)}`);
        }
        else if (ch > 0) {
            if (status === 0x80 || status === 0x90 || status === 0xA0 || status === 0xD0) {
                const pad = this.noteMap.get(ch, data1);
                if (pad) {
                    pad.handleMidi(status, data1, data2);
                    const padMidi = this.onPadMidi;
                    if (padMidi)
                        padMidi(pad, status, data1, data2);
                    return;
                }
            }
        }
    }
}
