
function isIndicatable(arg: unknown): arg is { setIndication(shouldIndicate: boolean): void } {
    return (arg as { setIndication(shouldIndicate: boolean): void }).setIndication !== undefined;
}

function isSubscribable(arg: unknown): arg is Subscribable {
    return (arg as Subscribable).subscribe !== undefined;
}

function isMarkInterested(arg: unknown): arg is { markInterested(): void } {
    return (arg as { markInterested(): void }).markInterested !== undefined;
}

function isBitwigValue<T extends () => void>(arg: unknown): arg is Value<T> {
    return (arg as Value<T>).markInterested !== undefined;
}

function isSettableRangedValue(arg: unknown): arg is SettableRangedValue {
    return (arg as SettableRangedValue).incRaw !== undefined
    && (arg as SettableRangedValue).setImmediately !== undefined
}

function isSettableDoubleValue(arg: unknown): arg is SettableDoubleValue {
    return (arg as SettableDoubleValue).inc !== undefined;
}

function isSettableBooleanValue(arg: unknown): arg is SettableBooleanValue {
    return (arg as SettableBooleanValue).toggle !== undefined;
}

function isSettable<T>(arg: unknown): arg is { set(value: T): void } {
    return (arg as { set(value: T): void }).set !== undefined;
}

function isToggle(arg: unknown): arg is { toggle(): void } {
    return (arg as { toggle(): void }).toggle !== undefined;
}

function isCallback(a: unknown): a is CallOf<number> {
    return typeof a === 'function';
}


function controlIsFader(control: any): control is Fader {
    return control instanceof Fader;
}

function controlIsEncoder(control: any): control is Encoder {
    return control instanceof Encoder;
}

function controlIsCLickable(control: any): control is Clickable {
    return control instanceof Clickable;
}

function controlHasLed(control: any): control is LedControl {
    return typeof control.isLit !== 'undefined';
}