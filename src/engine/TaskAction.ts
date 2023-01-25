import Action  from "./Action";
import { Task, ActionType } from "./ActionTypes";

export default class TaskAction extends Action {
  /* - Private members --------------------------------------------------- */

  private text: string;

  /* - Protected members ------------------------------------------------- */

  /* - Public members ---------------------------------------------------- */

  public task: Task;

  /* - Constructor ------------------------------------------------------- */

  constructor(id: number, task: Task) {
    // Base constructor
    super(id, ActionType.task);

    this.task = task;
    this.text = "undefined";

    if (task === Task.scan) {
        this.text = "Scan a Planet";
    }

    if (task === Task.delivery) {
        this.text = "Make a delivery"
    }
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

  run(): void {}

  toString(): string {
    return this.text;
  }
}
