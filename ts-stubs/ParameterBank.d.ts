/** Defines a bank of parameters. */
interface ParameterBank {
    /**  Gets the number of slots that these remote controls have.  */
    getParameterCount(): number;
    /**  Returns the parameter at the given index within the bank.
     * @param indexInBank
              the parameter index within this bank. Must be in the range [0..getParameterCount()-1].
     * @returns The requested parameter */
    getParameter(indexInBank: number): Parameter;
    /** Informs the application how to display the controls during the on screen notification.
        @param type	which kind of hardware control is used for this bank (knobs/encoders/sliders)
        @param columns	How wide this section is in terms of layout (4/8/9) */
    setHardwareLayout(type: any|HardwareControlType, columns: 4 | 8 | 9): void;
}
