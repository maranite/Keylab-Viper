/**
 * Instances of this interface are used to categorize actions in Bitwig Studio. The list of action categories
 * provided by Bitwig Studio can be queried by calling {Application#getActionCategories()}. To receive a
 * specific action category call {Application#getActionCategory(String)}.
 *
 * @see Application#getActionCategories()
 * @see Application#getActionCategory(String)
 */
interface ActionCategory {
    /**  Returns a string the identifies this action category uniquely.
     * @returnType {string} the identifier string */
    getId(): string;
    /**  Returns the name of this action category.
     * @returnType {string} the name string */
    getName(): string;
    /**  Lists all actions in this category.
     * @returnType {Action[]} the array of actions in this category */
    getActions(): Action[];
}
