/*
                    |  1 |  2 |    3 |   4 |   5 | 6 |40|41|Fad|Enc|Btn|Trnsprt|Pad|
Off				    | 00 |  - |    - |   - |   - | - |  |  | x | x | x |   x   | x |
CC Fader            | 01 | CH |   CC | MIN | MAX | 0 | 0| 1| x |   |   |       |   |
CC Encoder          | 01 | CH |   CC | MIN | MAX | 0 | 1| 5|   | x |   |       |   |
CC Relative         | 01 | CH |   CC |   0 |  7F | 1 | 1| 5|   | x |   |       |   |
NRPN                | 04 | CH |  RPN | MIN | MAX | 0 |  |  | x | x |   |       | x |
RPN                 | 04 | CH | NRPN | MIN | MAX | 1 |  |  | x | x |   |       | x |
CC Duration         | 05 | CH |   CC |  CC | CC2 | 0 | 0|  |   |   | x |   x   |   |
MMC                 | 07 |  0 |  MMC |   0 |   0 | 0 |  |  |   |   | x |   x   |   |
CC Toggle           | 08 | CH |   CC | OFF |  ON | 0 |  |  |   |   | x |   x   | x |
CC Gate             | 08 | CH |   CC | OFF |  ON | 1 |  |  |   |   | x |   x   | x |
Midi Note Toggle    | 09 | CH | NOTE |   0 | VEL | 0 |  |  |   |   | x |   x   | x |
Midi Note Gate      | 09 | CH | NOTE |   0 | VEL | 1 |  |  |   |   | x |   x   | x |
Keyboard Preset     | 0B |  0 |  0-9 |   0 |   0 | 0 |  |  |   |   | x |   x   | x |
Program Change      | 0B | CH | PROG | LSB | MSB | 1 |  |  |   |   | x |   x   |   |
*/
// What might modes 2, 3, 6 & A be ???
enum ControlMode {
    Off = 0x0,
    Fader = 0x11,
    Knob = 0x10,
    Encoder = 0x11,
    ToggleButton = 0x80,
    GateButton = 0x81,
    Duration = 0x50,
    Note = 0x91,
    NoteToggle = 0x90,
    MMC = 0x70,
    NRPN = 0x40,
    RPN = 0x41,
    Preset = 0xB0,
    ProChg = 0xB1
}
