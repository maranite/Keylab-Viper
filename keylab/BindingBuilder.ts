type PropsKeyOf<T, K> = ({ [P in keyof T]: T[P] extends K ? P : never })[keyof T];
type PropsOf<T, K> = { [P in PropsKeyOf<T, K>]: T[P] };

class BindingBuilder {

    constructor(readonly hal: HAL, readonly isActive: ObservableValue<boolean>) { }

    readonly controls = this.hal.controls;

    indicate(parameter: any) {
        if (isIndicatable(parameter))
            this.isActive.addValueObserver(active => parameter.setIndication(active));
        if (isMarkInterested(parameter))
            parameter.markInterested();
    }

    moves(parameters: (index: number) => Parameter | SettableBooleanValue | SettableDoubleValue | SettableRangedValue | CallOf<number>
        , ...indices: (keyof PropsOf<Controls, Fader>)[]): this {

        const activators = indices.map((key, index) => {
            const parameter = parameters(index);
            this.indicate(parameter);
            let onMoved: (value: number) => void;
            if (isSettableBooleanValue(parameter))
                onMoved = (value: number) => parameter.set(value > 64);
            else if (isSettableRangedValue(parameter))
                onMoved = (value: number) => parameter.set(value, 0x7f); //, 0x40);
            else if (isSettableDoubleValue(parameter))
                onMoved = (value: number) => parameter.set(value * 1.0);
            else if (isCallback(parameter))
                onMoved = parameter;
            else
                throw new Error('bad parameters on turnz');
            return () => (this.controls[key] as Fader).onMoved = onMoved;
        });
        this.isActive.addValueObserver(active => { if (active) activators.forEach(c => c()); });
        return this;
    }

    private makeTurnable(parameter: Parameter | SettableBooleanValue | SettableDoubleValue | SettableRangedValue | CallOf<number>) {
        this.indicate(parameter);
        let onTurn: (inc: number) => void;
        if (isSettableBooleanValue(parameter))
            onTurn = (direction: number) => parameter.set(direction > 0);
        else if (isSettableRangedValue(parameter))
            onTurn = (direction: number) => parameter.inc(direction, 0x7f); //, 0x40);
        else if (isSettableDoubleValue(parameter))
            onTurn = (direction: number) => parameter.inc(direction * 1.0);
        else if (isCallback(parameter))
            onTurn = parameter;
        else
            throw new Error('bad parameters on turnz');
        return onTurn;
    }

    knobs(parameters: (index: number) => Parameter | SettableBooleanValue | SettableDoubleValue | SettableRangedValue | CallOf<number>
        , ...indices: (keyof PropsOf<Controls, Encoder>)[]): this {

        const activators = indices.map((key, index) => {
            const parameter = parameters(index);
            let onTurn = this.makeTurnable(parameter);
            return () => (this.controls[key] as Encoder).onTurn = onTurn;
        });
        this.isActive.addValueObserver(active => { if (active) activators.forEach(c => c()); });
        return this;
    }

    turns(key: keyof PropsOf<Controls, Encoder>, parameter: Parameter | SettableBooleanValue | SettableDoubleValue | SettableRangedValue | CallOf<number>): this {
        let onTurn = this.makeTurnable(parameter);
        let control: Encoder = this.controls[key];
        this.isActive.addValueObserver(active => { if (active) control.onTurn = onTurn; });
        return this;
    }

    flips(key: keyof PropsOf<Controls, Clickable>,
        parameter: ObservableAny<boolean> | SettableBooleanValue | SettableObservableValue<boolean>): this {
        this.indicate(parameter);
        let control: Clickable = this.controls[key];
        let observer: CallOf<boolean>;
        if (isToggle(parameter))
            observer = isDown => isDown && parameter.toggle();
        else
            observer = isDown => isDown && parameter.set(!parameter.get());

        if (controlHasLed(control)) {
            const led = control;
            allTrue(parameter, this.isActive).addValueObserver(lit => led.isLit = lit);
        }
        this.isActive.addValueObserver(active => { if (active) control.onPress = observer; });
        return this;
    }

    press(key: keyof PropsOf<Controls, Clickable>,
        onPress: (isDown: boolean) => void,
        litOn?: ObservableValue<boolean> | BooleanValue): this {

        const control: Clickable = this.controls[key];
        this.isActive.addValueObserver(active => { if (active) control.onPress = onPress; });
        if (litOn && controlHasLed(control))
            allTrue(litOn, this.isActive).addValueObserver(lit => control.isLit = lit);
        return this;
    }

    click(key: keyof PropsOf<Controls, Clickable>,
        onClick: (caller: Clickable) => void,
        litOn?: ObservableValue<boolean> | BooleanValue): this {
        return this.press(key, isDown => isDown && onClick(this.controls[key]), litOn);
    }
}


