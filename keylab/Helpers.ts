/// <reference path="./Encoder.ts" />
/// <reference path="./Button.ts" />
/// <reference path="./Fader.ts" />

class EncoderBank1 extends Encoder { };
class EncoderBank2 extends Encoder { };
class FaderBank1 extends Fader { };
class FaderBank2 extends Fader { };
class RowButton extends Button { };
class TransportButton extends Button { };

type MidiChannel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | OmniChannel;
type PartChannel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 'All' | 'Part1' | 'Part2' | 'Panel';
type KeylabPreset = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
enum OmniChannel {
    Part1 = 0x41,
    Part2 = 0x40,
    All = 0x7E,
    Panel = 0x7F
}

type SysexService = (data: number[]) => void;
type SysexDelegate = (service: SysexService) => void;
type SysexConfig = { [key: number]: number };

type KLValueHandler = (id: number, cmd: number, val: number) => void;
type ErrorHandler = (eror: Error) => void;


/** Returns a two character ASCII representation of a number  */
function asHex(value: number): string {
    return ((value >> 4) & 0xF).toString(16) + (value & 0xF).toString(16);
}

