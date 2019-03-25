import { MongoClient } from 'mongodb';
import EmpityValidator from './validators/empity-validator';
export default class BaseRepository {

    constructor(collection) {
        this.url = 'mongodb://localhost:27017';
        this.dbName = 'pocMongoDb';
        this.collection = collection;
    }

    get client() {
        return new MongoClient(this.url);
    }

    get options() {
        return {
            w: 'majority',
            wtimeout: 10000,
            serializeFunctions: true,
            forceServerObjectId: true
        }
    }

    async connect(client) {
        await client.connect();
    }

    close(client) {
        client.close();
    }

    async insertOne(data = new EmpityValidator(data)) {
        const client = this.client;
        try {
            await this.connect(client);
            const dataBase = client.db(this.dbName);
            const result = await dataBase.collection(this.collection).insertOne(data, this.options);
            return result.ops[0];
        } catch (err) {
            this.close(client);
            throw new Error(err);
        }
    }

    async insertMany(data = new EmpityValidator(data)) {
        const client = this.client;
        try {
            await this.connect(client);
            const dataBase = client.db(this.dbName);
            const result = await dataBase.collection(this.collection).insertMany(data, this.options);
            return result.ops;
        } catch (err) {
            this.close(client);
            throw new Error(err);
        }
    }

}