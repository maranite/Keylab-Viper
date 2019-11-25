/** Represents a cursor that looks at a {RemoteControlsPage}. */
interface CursorRemoteControlsPage extends Cursor, RemoteControlsPage {
    /**  Value that reports the names of the devices parameter pages. */
    pageNames(): StringArrayValue;
    /** Value that represents the number of pages. */
    pageCount(): IntegerValue;
    /**  Value that reports the currently selected parameter page index. */
    selectedPageIndex(): SettableIntegerValue;
    /**  Selects the next page.
     * @param shouldCycle
              If true then when the end is reached and there is no next page it selects the first page */
    selectNextPage(shouldCycle: boolean): void;
    /**  Selects the previous page.
     * @param shouldCycle
              If true then when the end is reached and there is no next page it selects the first page */
    selectPreviousPage(shouldCycle: boolean): void;
    /**  Selects the next page that matches the given expression.
     * @param expression
              An expression that can match a page based on how it has been tagged. For now this can only be
              the name of a single tag that you would like to match.
     * @param shouldCycle
              If true then when the end is reached and there is no next page it selects the first page */
    selectNextPageMatching(expression: string, shouldCycle: boolean): void;
    /**  Selects the previous page that matches the given expression.
     * @param expression
              An expression that can match a page based on how it has been tagged. For now this can only be
              the name of a single tag that you would like to match.
     * @param shouldCycle
              If true then when the end is reached and there is no next page it selects the first page */
    selectPreviousPageMatching(expression: string, shouldCycle: boolean): void;
}
