import { ObjectId } from "mongodb"

export default class Faction {
    constructor(
        public name: string,
        public id?: ObjectId
    ) {}
}