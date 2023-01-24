export enum ActionType {
    attack,
    defense,
    task,
    card
}

export default abstract class Action { 

    /* - Private members --------------------------------------------------- */

    /* None */

    /* - Protected members ------------------------------------------------- */

    id: number;
    type: ActionType;

    /* - Public members ---------------------------------------------------- */

    /* None */

    /* - Constructor ------------------------------------------------------- */

    constructor (id: number, type: ActionType) {

        // Fill internal members
        this.id = id;
        this.type = type;
    }

    /* Getters ------------------------------------------------------------- */

    /* None */

    /* Setters ------------------------------------------------------------- */

    /* None */

    /* Private interface --------------------------------------------------- */

    /* None */

    /* Protected interface ------------------------------------------------- */

    /* None */

    /* Public interface ---------------------------------------------------- */

    abstract run() : void;

}