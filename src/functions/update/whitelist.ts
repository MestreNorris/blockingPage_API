import { dateNow } from '../data/date';
import { getAllDatabases } from '../db/getDatabase';
import { Whitelist } from '../interfaces/index'

const addWhitelist = async (url) => {
    let isExist = false;
    const { whitelistDB } = await getAllDatabases();

    const dataWhitelist = await whitelistDB.find().toArray();

    for (let index = 0; index < dataWhitelist.length; index++) {
        if (dataWhitelist[index].link == url) { isExist = true; }
    }
    if (!isExist) {
        const whitelist: Whitelist = { link: url, creatAt: dateNow() }
        whitelistDB.insertOne(whitelist);
    }
}

export { addWhitelist }