/**
 * Interface for something that can be scrolled.
 *
 * @since API version 2
 */
interface Scrollable {
    /**  Value that reports the current scene scroll position.
     * @returnType {SettableIntegerValue} */
    scrollPosition(): SettableIntegerValue;
    /**  Scrolls by a number of steps.
     * @param amount
              The number of steps to scroll by (positive is forwards and negative is backwards). */
    scrollBy(amount: number): void;
    /**  Scrolls forwards by one step. This is the same as calling {#scrollBy(int)} with 1  */
    scrollForwards(): void;
    /**  Scrolls forwards by one step. This is the same as calling {#scrollBy(int)} with -1 */
    scrollBackwards(): void;
    /**  Scrolls by a number of pages.
     * @param amount
              The number of pages to scroll by (positive is forwards and negative is backwards). */
    scrollByPages(pages: number): void;
    /**  Scrolls forwards by one page. */
    scrollPageForwards(): void;
    /**  Scrolls backwards by one page. */
    scrollPageBackwards(): void;
    /** Scrolls the supplied position into view if it isn't already. */
    scrollIntoView(position: number): void;
    /**  Value that reports if it is possible to scroll the bank backwards or not.
     * @returnType {BooleanValue} */
    canScrollBackwards(): BooleanValue;
    /**  Value that reports if it is possible to scroll the bank forwards or not.
     * @returnType {BooleanValue} */
    canScrollForwards(): BooleanValue;
}
