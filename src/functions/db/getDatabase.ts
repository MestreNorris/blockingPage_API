import { connectToDatabase } from './mongodb';
import { Metric } from '../../interfaces/index'
import { dateNow } from '../data/info';
import { Db } from 'mongodb';

const getAllDatabases = async () => {
    try {
        const db: Db = await connectToDatabase();
        const blacklistDB = await db.collection('blacklist');
        const whitelistDB = await db.collection('whitelist');
        const metricDB = await db.collection('metric');

        const metricCount = await metricDB.find().count();

        if (metricCount == 0) {
            const metric: Metric = { qntRequest: new Array(), lastUpdate: dateNow(), qntBlockedPhising: new Array(), listPages: new Array() }
            await metricDB.insertOne(metric);
        }

        return { blacklistDB, whitelistDB, metricDB }
    } catch (_) { return null; }
}

const getDataAllDatabases = async () => {
    try {
        const { blacklistDB, whitelistDB, metricDB } = await getAllDatabases();
        const blacklist = await blacklistDB.find().toArray();
        const whitelist = await whitelistDB.find().toArray();
        const metric = await metricDB.find().toArray();
        return { 'blacklist': blacklist, 'whitelist': whitelist, 'metric': metric };
    } catch (error) { return null }
}

export { getAllDatabases, getDataAllDatabases };