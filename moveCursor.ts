/** Provides an inc/dec function to drive a cursor */
function moveCursor(cursor: Cursor): {
    (inc: number): void;
} {
    return inc => (inc > 0) ? cursor.selectNext() : cursor.selectPrevious();
}
