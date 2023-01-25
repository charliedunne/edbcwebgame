import { ActionType } from './ActionTypes'

export default abstract class Action { 

    /* - Private members --------------------------------------------------- */

    /* None */

    /* - Protected members ------------------------------------------------- */

    id: number;
    type: ActionType;
    secondaryAction?: Action;

    /* - Public members ---------------------------------------------------- */

    /* None */

    /* - Constructor ------------------------------------------------------- */

    constructor (id: number, type: ActionType, secondaryAction?: Action) {

        // Fill internal members
        this.id = id;
        this.type = type;

        this.secondaryAction = secondaryAction;
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