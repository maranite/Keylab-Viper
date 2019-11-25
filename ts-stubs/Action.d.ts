/**
 * Instances of this interface represent actions in Bitwig Studio, such as commands that can be launched from
 * the main menu or via keyboard shortcuts.
 *
 * To receive the list of all actions provided by Bitwig Studio call {Application#getActions()}. The
 * list of actions that belong to a certain category can be queried by calling
 * {ActionCategory#getActions()}. Access to specific actions is provided in
 * {Application#getAction(String)}.
 */
interface Action {
    /**  Returns a string the identifies this action uniquely.
     * @returnType {string} the identifier string */
    getId(): string;
    /**  Returns the name of this action.
     * @returnType {string} the name string */
    getName(): string;
    /**  Returns the category of this action.
     * @returnType {ActionCategory} the category string */
    getCategory(): ActionCategory;
    /**  Returns the text that is displayed in menu items associated with this action.
     * @returnType {string} the menu item text */
    getMenuItemText(): string;
    /**  Invokes the action.
     * */
    invoke(): void;
}
