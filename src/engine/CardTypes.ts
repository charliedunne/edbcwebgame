export interface CardSize {
    width: number
    height: number
}

export enum CardType {
    none = "none",
    ship = "ship",
    action = "action",
    outfitting = "outfitting",
    mission = "mission",
    missionSpecific = "mission specific"
}

export enum CardFaction {
    none = "none",
    alliance = "alliance",
    empire = "empire",
    federation = "federation",
    neutral = "neutral",
}

export enum CardSet {
    core = "coriolis",
}

export enum ShipRole {
    fighter = "Fighter",
    warship = "Warship",
    multipurpose = "Multipurpose",
    liner = "Liner",
    miner = "Miner",
    explorer = "Explorer",
    transport = "Transport",
    bountyHunter = "Bounty Hunter",
}

export enum CardZoomStatus {
    default,
    hover,
    click,
}

export enum CardColor {
    none = "0xFFFFFF",
    federation = "0xff0a0a",
    empire = "0x21bbff",
    alliance = "0x10ccaa",
    neutral = "0xff8020",
}

export type CardBaseAttr = {
    id: number;
    set: CardSet;
    title: string;
    type: CardType;
    faction: CardFaction;
    flavor?: string;
    art?: string;
};

export type CardShipAttr = {
    cost: number;
    karma: number;
    strength: number;
    speed: number;
    builder: string;
    model: string;
    role: ShipRole[];
};
