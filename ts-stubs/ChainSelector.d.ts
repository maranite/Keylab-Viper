/** This interface represents a chain selector device which can be an instrument selector or effect selector   */
interface ChainSelector extends ObjectProxy, Cursor {
    /** The index of the active chain in the chain selector. In case the chain selector has no chains or the value is not connected to the chain selector, then the value will be 0. */
    activeChainIndex(): SettableIntegerValue;
    /** The number of chains in the chain selector. */
    chainCount(): IntegerValue;
    /** The active device layer. */
    activeChain(): DeviceLayer;
    /** Cycle to the next chain. If the current active chain is the last one, then moves to the first one. */
    cycleNext(): void;
    /** Cycle to the previous chain. If the current active chain the first one, then moves to the last one. */
    cyclePrevious(): void;
}
