
import { CardFaction, ShipRole } from "./CardTypes"


export enum ActionType {
    attack,
    defense,
    task,
    management
}

export interface Target {
    itself?: Boolean,
    opponent?: Boolean,
    number?: number,
    all?: Boolean,
    faction?: CardFaction,
    role?: ShipRole[]
};

export enum Location {
    thisZone = 'This Zone',
    otherZone = 'Other Zone',
    anyZone = 'Any Zone',
    leftZone = 'Left Zone',
    rightZone = 'Right Zone'
}

export enum Task {
    scan,
    delivery
}

export enum Management {
    draw,
    retreat,
}