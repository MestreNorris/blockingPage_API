import { dateNow } from "../data/date";
import { log } from "../data/log";
import { getAllDatabases, getDataAllDatabases } from "../db/getDatabase";
import { fetchOpenPhishAndUpdateDatabase, fetchPhishTankAndUpdateDatabase } from "./blacklist";
import { deleteDuplicates } from "./deleteDuplicates";
import { removeWhitelistInBlacklistDB } from "./removeWhitelist";
import { updateMetricQntRequest } from "./request";
import { addWhitelist } from "./whitelist";

const updateAll = async () => {
    try {
        const { blacklistDB, whitelistDB, metricDB } = await getAllDatabases();
        const { blacklist, whitelist, metric } = await getDataAllDatabases();

        if (metricDB != null) {
            const metricData = await metricDB.findOne();
            updateMetricQntRequest(metricDB, metricData).then(() => { log(4) });

            if (metricData.lastUpdate !== dateNow()) {
                await metricDB.updateOne({ _id: metricData._id }, { $set: { lastUpdate: dateNow() } });
                await fetchPhishTankAndUpdateDatabase(blacklistDB, whitelistDB, blacklist, whitelist).then(() => { log(0) });
                await fetchOpenPhishAndUpdateDatabase(blacklistDB, whitelistDB, blacklist, whitelist).then(() => { log(7) });
            } else { log(3) }

            // const links = ['https://sites.google.com', 'http://sites.google.com','https://accounts.google.com','http://accounts.google.com', 'https://docs.google.com','http://docs.google.com',
            // 'https://hangouts.google.com','http://hangouts.google.com','https://meet.google.com','http://meet.google.com']
            // for (let index = 0; index < links.length; index++) {
            //     addWhitelist(links[index]);
            // }

            await removeWhitelistInBlacklistDB(blacklistDB, whitelistDB, blacklist, whitelist).then((res) => { res ? log(1) : log(2) });
            await deleteDuplicates(blacklistDB, blacklist).then((res) => { res ? log(5) : log(6) });
        }
    } catch (_) { return null }
}

export { updateAll }