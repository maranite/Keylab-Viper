/** Implements compound observable such that activation follows C = A && B */
class TrueForAllOrAny<T> extends AbstractObservable<boolean> {
    constructor(readonly sources: ObservableValue<T>[], requireAll: boolean, fnIsTrue: (value: T, index: number) => boolean) {
        super();
        const truthStates: boolean[] = new Array<boolean>(sources.length);
        const fnAllTrue = (count: number) => requireAll ? count === sources.length : count > 0;
        sources.forEach((source, index) => {
            source.addValueObserver(value => {
                const elementTrue = fnIsTrue(value, index);
                if (truthStates[index] === elementTrue) return;
                truthStates[index] = elementTrue;
                const nowTrue = fnAllTrue(truthStates.filter(s => s).length);
                if (nowTrue === this.isTrue) return;
                this.notify(this.isTrue = nowTrue);
            });
        });
    }
    private isTrue = false;
    get() { return this.isTrue; }
}

/** Helper. Returns a composite obsevable that indicates a collective truthiness of underlying observables */
function allTrue(...sources: ObservableValue<boolean>[]) {
    return new TrueForAllOrAny(sources, true, (value, index) => value);
}

function anyTrue(...sources: ObservableValue<boolean>[]) {
    return new TrueForAllOrAny(sources, false, (value, index) => value);
}
