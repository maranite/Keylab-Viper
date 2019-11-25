class TwoDim<T> {
    values: T[][] = [];
    get(a: number, b: number) {
        let x = this.values[a];
        return x ? x[b] : undefined;
    }
    set(a: number, b: number, value: T) {
        let x = this.values[a];
        if (!x)
            x = this.values[a] = [];
        x[b] = value;
    }
    remove(a: number, b: number) {
        let x = this.values[a];
        if (!x) return;
        x[b] = <any>undefined;
    }
}
