/// <reference path="./AbstractObservable.ts" />
class ObservableAny<T> extends AbstractObservable<T> implements SettableObservableValue<T> {
    constructor(value: T) {
        super();
        this.value = value;
    }
    protected value: T;
    get(): T { return this.value; }
    set(value: T) {
        if (value === this.value)
            return;
        this.value = value;
        this.notify(value);
    }
    /** Special setter for mode-style values, where the value must become undefined before becomming something else. */
    setMode(value: T) {
        if (value === this.value)
            return;
        this.notify(undefined!);
        this.value = value;
        this.notify(value);
    }
    when(value: T, ...trueValues: T[]): SettableObservableValue<boolean> {
        return new ObservableTruth<T>(this, false, [value, ...trueValues]);
    }
    whenNot(value: T, ...trueValues: T[]): SettableObservableValue<boolean> {
        return new ObservableTruth<T>(this, true, [value, ...trueValues]);
    }
}

type ObservableMode<T extends keyof any> = ObservableAny<T> & { readonly [I in T]: SettableObservableValue<boolean> }

function ObservableMode<T extends keyof any>(...values: T[]) {
    const result: any = new ObservableAny<T>(values[0]);
    values.forEach(value => {
        result[value] = whenValue(result, value);
        //new ObservableTruth<T>(result, false, [value]);
    });
    return <ObservableMode<T>>result;
}



