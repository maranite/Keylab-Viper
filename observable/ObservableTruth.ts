/** A proxy for observing whether an underlying observable is set to a particular value. */
class ProxyObservable<T> implements ObservableValue<boolean> {
    constructor(source: ObservableValue<T>, isTrue: (value: T) => boolean) {
        this.addValueObserver = (callback) => { source.addValueObserver(v => { callback(isTrue(v)); }); };
        this.get = () => { return isTrue(source.get()); }
    }
    addValueObserver: (callback: CallOf<boolean>) => void;
    get: () => boolean;
}

/** A proxy for observing whether an underlying observable is set to a particular value. */
class ObservableTruth<T> extends ProxyObservable<T> implements SettableObservableValue<boolean> {
    constructor(source: SettableObservableValue<T>, invert: boolean, trueValues: T[]) {
        super(source, (value: T) => {
            for (let i = 0; i < trueValues.length; i++)
                if (trueValues[i] === value)
                    return !invert;
            return invert;
        });
        this.set = (value: boolean) => { if (value) source.set(trueValues[0]); }
    }
    set: (value: boolean) => void;
}

/** Helper. Returns a proxy for observing whether source is set to one or more particular values.  */
function whenValue<T>(source: SettableObservableValue<T>, ...trueValues: T[]): SettableObservableValue<boolean> {
    if (!trueValues || trueValues.length < 1) throw new Error("At least one true value is requried for whenValue()");
    return new ObservableTruth(source, false, trueValues);
}

function whenNumber(source: SettableIntegerValue, trueValue: number): SettableObservableValue<boolean> {
    return new ObservableTruth(source, false, [trueValue]);
}


/** Helper. Returns a proxy for observing that a source is not a particular value */
function not(observable: ObservableValue<boolean>): ObservableValue<boolean> {
    return new ProxyObservable<boolean>(observable, v => !v);
}


function combine(...items: ObservableValue<boolean>[]) {
    if (items.length === 2)
        return new class extends AbstractObservable<boolean> {
            constructor(a: ObservableValue<boolean>, b: ObservableValue<boolean>) {
                super();                
                a.addValueObserver(v => { this.valA = v; this.checkVal(); });
                a.addValueObserver(v => { this.valB = v; this.checkVal(); });
            }
            private val = false;
            private valA = false;
            private valB = false;

            private checkVal() {
                const r = this.get();
                if (this.val === r) return;
                this.notify(this.val = r);
            }
            get() { return this.val; }
        }(items[0], items[1]);


    return new class extends AbstractObservable<boolean> {
        constructor(items: ObservableValue<boolean>[]) {
            super();
            this.truths = items.map(_ => false);
            items.forEach((o, i) => {
                o.addValueObserver(v => {
                    let prev = this.get();
                    this.truths[i] = v;
                    let now = this.get();
                    if (prev != now) this.notify(now);
                });
            });
        }
        private truths: boolean[];
        private allTrue = (v: boolean, y: boolean) => v && y;
        get() { return this.truths.reduce(this.allTrue, true); }
    }(items);
}
