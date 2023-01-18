// Esternal Dependencies
import * as mongoDB from "mongodb"

// Global Variables
export const collections: { factions?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
         
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(import.meta.env.VITE_DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(import.meta.env.VITE_DB_NAME);
   
    const factionCollection: mongoDB.Collection = db.collection(import.meta.env.VITE_FACTION_COLLECTION_NAME);
 
  collections.factions = factionCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${factionCollection.collectionName}`);
 }