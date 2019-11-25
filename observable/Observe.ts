class Observe<T> {
    constructor(readonly observable: T) { }

    add<N extends keyof T, V, M = T[N] & { (): ObservableValue<V> }>

        (key: N, callback?: CallOf<V>)

        : this & (M extends () => { set: any; }
            ? { [I in N]: V; }
            : { readonly [I in N]: V; }) {

        const property = <ObservableValue<V>>(<any>(this.observable[key]))();

        if (isMarkInterested(property))
            property.markInterested();

        if (callback)
            property.addValueObserver(callback);

        if (isSettable<V>(property))
            Object.defineProperty(this, key, { 'get': () => property.get(), 'set': v => property.set(v) });
        else
            Object.defineProperty(this, key, { 'get': () => property.get() });

        return <any>this;
    }

    done(): Pick<this, Exclude<keyof this, 'add' | 'done'>> {
        return <any>this;
    }
}




