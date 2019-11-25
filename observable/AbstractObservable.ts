type CallOf<T> = (value: T) => void;

abstract class AbstractObservable<T> implements ObservableValue<T> {
    private observers: CallOf<T>[] = [];
    addValueObserver(callback: CallOf<T>): void {
        this.observers.push(callback);
        const value = this.get();
        if (value) callback(value);
    }
    abstract get(): T;
    protected notify(value: T) {
        for (let i = 0; i < this.observers.length; i++)
            this.observers[i](value);
    }
}
