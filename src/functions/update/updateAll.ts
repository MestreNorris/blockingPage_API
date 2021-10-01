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
            updateMetricQntRequest(metricDB, metricData).then(() => { console.log('A quantidade de requisições realizadas foram atualizadas no banco de dados'); });

            if (metricData.lastUpdate !== dateNow()) {
                await metricDB.updateOne({ _id: metricData._id }, { $set: { lastUpdate: dateNow() } });
                //await fetchPhishTankAndUpdateDatabase(blacklistDB, whitelistDB, blacklist, whitelist).then(() => { console.log('Fetch phishTank realizado, banco de dados atualizado com sucesso!'); });

                await fetchOpenPhishAndUpdateDatabase(blacklistDB, whitelistDB, blacklist, whitelist)
                    .then(() => { console.log('Fetch openPhish realizado, banco de dados atualizado com sucesso!'); })
                    .catch(err => { console.log(err) });

            } else { console.log('Nenhuma atualização do banco de dados blacklist foi realizada'); }

            // const links = ['https://sites.google.com', 'http://sites.google.com','https://accounts.google.com','http://accounts.google.com', 'https://docs.google.com','http://docs.google.com',
            // 'https://hangouts.google.com','http://hangouts.google.com','https://meet.google.com','http://meet.google.com']
            // for (let index = 0; index < links.length; index++) {
            //     addWhitelist(links[index]);
            // }

            await removeWhitelistInBlacklistDB(blacklistDB, whitelistDB, blacklist, whitelist).then((res) => { res ? console.log('Links whitelist foram removidos do banco de dados blacklist') : console.log('Nenhum links whitelist encontrado no banco de dados blacklist'); });
            await deleteDuplicates(blacklistDB, blacklist).then((res) => { res ? console.log('Registros duplicados no banco de dados blacklist removidos') : console.log('Nenhum registros duplicado encontrado no banco de dados blacklist'); });
        }
    } catch (_) { return null }
}

export { updateAll }