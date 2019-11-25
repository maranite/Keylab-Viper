//TODO: Add in new Bitwig API 9 methods

/** An interface representing the host application to the script.
 * @global
 * @type {ControllerHost}
 */
declare const host: ControllerHost;

declare function loadAPI(val: number): void;
declare function println(s: string): void;
declare function load(file: string): void;


