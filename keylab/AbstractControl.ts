class AbstractControl {
    constructor(readonly hal: HAL, public readonly id: number, public readonly name: string) {
        this.hal.controlById[id] = this;
    }

    private unresolvedItems = 0;
    get isValid() { return this.unresolvedItems === 0; }

    protected _config: number[] = [];
    get config() { return this._config; }
    set config(config: number[]) {
        this._config = config;
        this.invalidate();
    }

    invalidate() {
        const config = this.config;
        this.unresolvedItems = config.length;
        for (let i = 0; i < this.unresolvedItems; i++)
            this.hal.ensureValue(this.id, i + 1, config[i], this.resolve);
    }

    private resolve() { --this.unresolvedItems; }
}
