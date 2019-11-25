class Controls {
    constructor(private readonly hal: HAL) {
    }

    readonly volume = new Encoder(this.hal, 0x30, "Volume", 0, 0x07);
    readonly param = new Encoder(this.hal, 0x31, "Param", 0, 0x70);
    readonly paramButton = new Clickable(this.hal, 0x32, "Param Click", 0, 0x72);
    readonly value = new Encoder(this.hal, 0x33, "Value", 0, 0x71);
    readonly valueButton = new Clickable(this.hal, 0x34, "Value Click", 0, 0x73);
    readonly sound = new Button(this.hal, 0x1E, "Sound", 0, 0x76);
    readonly multi = new Button(this.hal, 0x1F, "Multi", 0, 0x77);
    readonly bank1 = new Button(this.hal, 0x1D, "Bank 1", 0, 0x2E);
    readonly bank2 = new Button(this.hal, 0x1C, "Bank 2", 0, 0x2F);
    readonly rewind = new TransportButton(this.hal, 0x5B, "Rewind", 0, 0x50);
    readonly forward = new TransportButton(this.hal, 0x5C, "Forward", 0, 0x51);
    readonly record = new TransportButton(this.hal, 0x5A, "Record", 0, 0x52);
    readonly stop = new TransportButton(this.hal, 0x59, "Stop", 0, 0x53);
    readonly play = new TransportButton(this.hal, 0x58, "Play", 0, 0x54);
    readonly loop = new TransportButton(this.hal, 0x5D, "Loop", 0, 0x55);
    readonly button0 = new RowButton(this.hal, 0x12, "Button 01", 0, 0x16);
    readonly button1 = new RowButton(this.hal, 0x13, "Button 02", 0, 0x17);
    readonly button2 = new RowButton(this.hal, 0x14, "Button 03", 0, 0x18);
    readonly button3 = new RowButton(this.hal, 0x15, "Button 04", 0, 0x19);
    readonly button4 = new RowButton(this.hal, 0x16, "Button 05", 0, 0x1A);
    readonly button5 = new RowButton(this.hal, 0x17, "Button 06", 0, 0x1B);
    readonly button6 = new RowButton(this.hal, 0x18, "Button 07", 0, 0x1C);
    readonly button7 = new RowButton(this.hal, 0x19, "Button 08", 0, 0x1D);
    readonly button8 = new RowButton(this.hal, 0x1A, "Button 09", 0, 0x1E);
    readonly button9 = new RowButton(this.hal, 0x1B, "Button 10", 0, 0x1F);

    readonly B1P0 = new EncoderBank1(this.hal, 0x70, "P 1-01", 0, 0x65);
    readonly B1P1 = new EncoderBank1(this.hal, 0x71, "P 1-02", 0, 0x66);
    readonly B1P2 = new EncoderBank1(this.hal, 0x72, "P 1-03", 0, 0x67);
    readonly B1P3 = new EncoderBank1(this.hal, 0x73, "P 1-04", 0, 0x68);
    readonly B1P4 = new EncoderBank1(this.hal, 0x74, "P 1-05", 0, 0x69);
    readonly B1P5 = new EncoderBank1(this.hal, 0x75, "P 1-06", 0, 0x6A);
    readonly B1P6 = new EncoderBank1(this.hal, 0x76, "P 1-07", 0, 0x6B);
    readonly B1P7 = new EncoderBank1(this.hal, 0x77, "P 1-08", 0, 0x6C);
    readonly B1P8 = new EncoderBank1(this.hal, 0x78, "P 1-09", 0, 0x6D);
    readonly B1P9 = new EncoderBank1(this.hal, 0x79, "P 1-10", 0, 0x6E);
    readonly B2P0 = new EncoderBank2(this.hal, 0x70, "P 2-01", 2, 0x65);
    readonly B2P1 = new EncoderBank2(this.hal, 0x71, "P 2-02", 2, 0x66);
    readonly B2P2 = new EncoderBank2(this.hal, 0x72, "P 2-03", 2, 0x67);
    readonly B2P3 = new EncoderBank2(this.hal, 0x73, "P 2-04", 2, 0x68);
    readonly B2P4 = new EncoderBank2(this.hal, 0x74, "P 2-05", 2, 0x69);
    readonly B2P5 = new EncoderBank2(this.hal, 0x75, "P 2-06", 2, 0x6A);
    readonly B2P6 = new EncoderBank2(this.hal, 0x76, "P 2-07", 2, 0x6B);
    readonly B2P7 = new EncoderBank2(this.hal, 0x77, "P 2-08", 2, 0x6C);
    readonly B2P8 = new EncoderBank2(this.hal, 0x78, "P 2-09", 2, 0x6D);
    readonly B2P9 = new EncoderBank2(this.hal, 0x79, "P 2-10", 2, 0x6E);
    readonly B1F0 = new FaderBank1(this.hal, 0x70, "F 1-01", 0, 0x5B);
    readonly B1F1 = new FaderBank1(this.hal, 0x71, "F 1-02", 0, 0x5C);
    readonly B1F2 = new FaderBank1(this.hal, 0x72, "F 1-03", 0, 0x5D);
    readonly B1F3 = new FaderBank1(this.hal, 0x73, "F 1-04", 0, 0x5E);
    readonly B1F4 = new FaderBank1(this.hal, 0x74, "F 1-05", 0, 0x5F);
    readonly B1F5 = new FaderBank1(this.hal, 0x75, "F 1-06", 0, 0x60);
    readonly B1F6 = new FaderBank1(this.hal, 0x76, "F 1-07", 0, 0x61);
    readonly B1F7 = new FaderBank1(this.hal, 0x77, "F 1-08", 0, 0x62);
    readonly B1F8 = new FaderBank1(this.hal, 0x78, "F 1-09", 0, 0x63);
    readonly B2F0 = new FaderBank2(this.hal, 0x70, "F 2-01", 2, 0x5B);
    readonly B2F1 = new FaderBank2(this.hal, 0x71, "F 2-02", 2, 0x5C);
    readonly B2F2 = new FaderBank2(this.hal, 0x72, "F 2-03", 2, 0x5D);
    readonly B2F3 = new FaderBank2(this.hal, 0x73, "F 2-04", 2, 0x5E);
    readonly B2F4 = new FaderBank2(this.hal, 0x74, "F 2-05", 2, 0x5F);
    readonly B2F5 = new FaderBank2(this.hal, 0x75, "F 2-06", 2, 0x60);
    readonly B2F6 = new FaderBank2(this.hal, 0x76, "F 2-07", 2, 0x61);
    readonly B2F7 = new FaderBank2(this.hal, 0x77, "F 2-08", 2, 0x62);
    readonly B2F8 = new FaderBank2(this.hal, 0x78, "F 2-09", 2, 0x63);

    readonly pad0 = new Pad(this.hal, 0x70, 0, 9, 0x18); // 0X18 = C1
    readonly pad1 = new Pad(this.hal, 0x71, 1, 9, 0x19);
    readonly pad2 = new Pad(this.hal, 0x72, 2, 9, 0x1A);
    readonly pad3 = new Pad(this.hal, 0x73, 3, 9, 0x1B);
    readonly pad4 = new Pad(this.hal, 0x74, 4, 9, 0x1C);
    readonly pad5 = new Pad(this.hal, 0x75, 5, 9, 0x1D);
    readonly pad6 = new Pad(this.hal, 0x76, 6, 9, 0x1E);
    readonly pad7 = new Pad(this.hal, 0x77, 7, 9, 0x1F);
    readonly pad8 = new Pad(this.hal, 0x78, 8, 9, 0x20);
    readonly pad9 = new Pad(this.hal, 0x79, 9, 9, 0x21);
    readonly padA = new Pad(this.hal, 0x7A, 10, 9, 0x22);
    readonly padB = new Pad(this.hal, 0x7B, 11, 9, 0x23);
    readonly padC = new Pad(this.hal, 0x7C, 12, 9, 0x24);
    readonly padD = new Pad(this.hal, 0x7D, 13, 9, 0x25);
    readonly padE = new Pad(this.hal, 0x7E, 14, 9, 0x26);
    readonly padF = new Pad(this.hal, 0x7F, 15, 9, 0x27);

    readonly pads = [this.pad0, this.pad1, this.pad2, this.pad3, this.pad4,
    this.pad5, this.pad6, this.pad7, this.pad8, this.pad9, this.padA,
    this.padB, this.padC, this.padD, this.padE, this.padF];

    readonly relativeKnobMode = new GlobalBoolParam(this.hal, 0x02, 'Relative Knob Mode');
    readonly drawbarMode = new GlobalBoolParam(this.hal, 0x01, 'Drawbar Mode');
    readonly splitMode = new GlobalBoolParam(this.hal, 0x07, 'Keyboard Split Mode');
    readonly afterTouchChanel = new GlobalChannelParam(this.hal, 0x0B, 'AfterTouch Chanel');
    readonly octaveButtonsAssign = new GlobalChannelParam(this.hal, 0x12, 'Octave Buttons Assign');
    readonly part1Chanel = new GlobalIntParam(this.hal, 0x06);
    readonly part2Chanel = new GlobalIntParam(this.hal, 0x05);
    readonly splitPoint = new GlobalIntParam(this.hal, 0x0D);
    readonly part1TransposeOctave = new GlobalIntParam(this.hal, 0x03);
    readonly part2TransposeOctave = new GlobalIntParam(this.hal, 0x10);
    readonly part1TransposeChromatic = new GlobalIntParam(this.hal, 0x06); //<-- Wrong!!!
    readonly part2TransposeChromatic = new GlobalIntParam(this.hal, 0x11);
}

// type KeysExtending<T, E> = ({ [P in keyof T]: T[P] extends E ? P : never })[keyof T];
// type Encoder1Keys = KeysExtending<Controls, EncoderBank1>;
// type Encoder2Keys = KeysExtending<Controls, EncoderBank2>;
// type Fader1Keys = KeysExtending<Controls, FaderBank1>;
// type Fader2Keys = KeysExtending<Controls, FaderBank2>;
// type PadKeys = KeysExtending<Controls, Pad>;
