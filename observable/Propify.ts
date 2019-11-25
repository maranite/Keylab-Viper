/// <reference path="./Object.ts" />
function Propify<T, K extends PropsKeys<T>>(source: T, ...keys: K[]): T {
    keys.forEach(key => {
        const prop = (<any>source[key])();
        if (isMarkInterested(prop))
            prop.markInterested();
        else
            throw new Error(`Cannot propify ${key}`);
    });
    return source;
}

type PropsMethods<T, K> = ({ [P in keyof T]:
    P extends K ? never :
    T[P] extends () => { markInterested(): void } ? never :
    T[P] extends Function ? P : never })[keyof T];
type PropsKeys<T> = ({ [P in keyof T]: T[P] extends () => { markInterested(): void } ? P : never })[keyof T];
type PropsRoKeys<T, K extends keyof T> = ({ [P in K]: T[P] extends () => { markInterested(): void } ? T[P] extends () => { set(_: infer R): void } ? never : P : never })[K];
type PropsRwKeys<T, K extends keyof T> = ({ [P in K]: T[P] extends () => { markInterested(): void, set(_: infer R): void } ? P : never })[K];

/** Returns a proxy which simplifies access to Bitwig properties */
function Props<T, K extends PropsKeys<T>>(source: T, ...keys: K[]):
    { [I in PropsMethods<T, K>]: T[I] }
    & { /*******/[I in PropsRwKeys<T, K>]: T[I] extends () => { set(_: infer R): void } ? R : never }
    & { readonly [I in PropsRoKeys<T, K>]: T[I] extends () => { get(): infer R } ? R : never }
    & { readonly on: { [I in K]: T[I] extends () => { addValueObserver(c: infer R): void } ? CallOf<R> : never } }
    & { readonly _: T } {

    var result = {
        _: source, on: {},
        __noSuchMethod__: (method: string, arg1: any, arg2: any, arg3: any) => {
            const m = <any>result;
            const s = <any>source;
            if (typeof arg1 === 'undefined') {
                m[method] = () => s[method]();
                return m[method]();
            }
            else if (typeof arg2 === 'undefined') {
                m[method] = (a1: any) => s[method](a1);
                return m[method](arg1);
            }
            else if (typeof arg3 === 'undefined') {
                m[method] = (a1: any, a2: any) => s[method](a1, a2);
                return m[method](arg1, arg2);
            }
            else {
                m[method] = (a1: any, a2: any, a3: any) => s[method](a1, a2, a3);
                return m[method](arg1, arg2, arg3);
            }            
        }
    };
    keys.forEach(key => {
        const prop = (<any>source[key])();
        if (isMarkInterested(prop)) prop.markInterested();
        const def: PropertyDescriptor = { 'get': () => prop.get() };
        if (isSettable<T[K]>(prop))
            def.set = (v: T[K]) => prop.set(v);
        Object.defineProperty(result, key, def);
        Object.defineProperty(result.on, key, { 'value': function (arg: any) { prop.addValueObserver(arg); } });
    });
    return <any>result;
}

// var rr = host.createArrangerCursorTrack(0, 16).createCursorDevice();
// var ud = Props(
//     rr,
//     'isPinned');
