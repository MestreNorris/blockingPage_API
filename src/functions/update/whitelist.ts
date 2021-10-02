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

// const links = ['https://sites.google.com', 'http://sites.google.com','https://accounts.google.com','http://accounts.google.com', 'https://docs.google.com','http://docs.google.com',
// 'https://hangouts.google.com','http://hangouts.google.com','https://meet.google.com','http://meet.google.com']
// for (let index = 0; index < links.length; index++) {
//     addWhitelist(links[index]);
// }

export { addWhitelist }