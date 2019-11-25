declare interface Object {
    bindProperties<T extends object, T2 extends object>(target: T, source: T2): T & T2;
}
