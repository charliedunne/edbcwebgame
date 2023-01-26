import Ability from "./Ability";
import { AbilityType } from "./AbilityTypes";

export default class Counterattack extends Ability {
    /* - Private members --------------------------------------------------- */

    /* - Protected members ------------------------------------------------- */

    /* - Public members ---------------------------------------------------- */

    value: number;

    /* - Constructor ------------------------------------------------------- */

    constructor(id: number, value: number, karmaCost?: number) {
        // Base constructor
        super(id, AbilityType.counterattack, karmaCost);

        this.value = value;

        this.title += "Counterattack " + value;
        this.desc += "After this unit is attacked, make a\nBurst attack (" + value + ") against the unit that attacked you.\nThis ability works against each unit that attacks you.\nYou make your counterattack even if your unit is\ndestroyed by the attack";
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

    run(): void { }
}
