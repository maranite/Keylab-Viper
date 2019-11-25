/** Interface that defines a cursor that can be "pinned".  */
interface PinnableCursor extends Cursor {
    /**
     * Determines if this cursor is currently pinned or not. If the cursor is pinned then it won't follow the
     * selection the user makes in the application.
     *
     * @returnType {SettableBooleanValue}
     */
    isPinned(): SettableBooleanValue;
}
