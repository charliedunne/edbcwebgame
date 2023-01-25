
import { CardFaction, ShipRole } from "./CardTypes"


export interface Target {
    itself?: Boolean,
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