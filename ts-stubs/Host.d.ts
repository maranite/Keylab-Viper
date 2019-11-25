/**
 * Defines the interface through which an extension can talk to the host application.
 */
declare interface Host {
    /** Returns the latest supported API version of the host application.
     * @returnType {int} the latest supported API version of the host application
 */
    getHostApiVersion(): number;
    /** Returns the vendor of the host application.
     * @returnType {string} the vendor of the host application
 */
    getHostVendor(): string;
    /** Returns the product name of the host application.
     * @returnType {string} the product name of the host application
 */
    getHostProduct(): string;
    /** Returns the version number of the host application.
     * @returnType {string} the version number of the host application
 */
    getHostVersion(): string;
    /** The platform type that this host is running on.
     * @returnType {com.bitwig.extension.api.PlatformType} */
    getPlatformType(): PlatformType;
    /** Sets an email address to use for reporting errors found in this script.
     * @param {string} address */
    setErrorReportingEMail(address: string): string;
}
