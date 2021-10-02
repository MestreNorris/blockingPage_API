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
            console.log('===============================================================================')
            const metricData = await metricDB.findOne();
            updateMetricQntRequest(metricDB, metricData).then(() => { console.log('| A quantidade de requisições realizadas foram atualizadas no banco de dados'); });

            if (metricData.lastUpdate !== dateNow()) {
                await metricDB.updateOne({ _id: metricData._id }, { $set: { lastUpdate: dateNow() } });
                await fetchPhishTankAndUpdateDatabase(blacklistDB, whitelistDB, blacklist, whitelist)
                    .then((res) => {
                        if (!res.error) { console.log('| Fetch phishTank realizado, banco de dados atualizado com sucesso!'); }
                        else {
                            console.error(
                                `| > Erro: Erro ao capturar dados do banco de dados PhishTank \n` +
                                `| | Status: ${res.response.status} \n` +
                                `| | StatusText: ${res.response.statusText} \n` +
                                `| | Url: ${res.response.url} \n` +
                                `| > Method: ${res.response.method}`)
                        }
                    })
                    .catch((_) => { console.error('| > Erro ao capturar dados do banco de dados PhishTank') })

                await fetchOpenPhishAndUpdateDatabase(blacklistDB, whitelistDB, blacklist, whitelist)
                    .then((res) => {
                        if (!res.error) { console.log('| Fetch openPhish realizado, banco de dados atualizado com sucesso!'); }
                        else {
                            console.error(
                                `| > Erro: Erro ao capturar dados do banco de dados OpenPhish \n` +
                                `| | Status: ${res.response.status} \n` +
                                `| | StatusText: ${res.response.statusText} \n` +
                                `| | Url: ${res.response.url} \n` +
                                `| > Method: ${res.response.method}`)
                        }
                    })
                    .catch((_) => { console.error('| > Erro ao capturar dados do banco de dados OpenPhish') })

            } else { console.log('| Nenhuma atualização do banco de dados blacklist foi realizada'); }

            await removeWhitelistInBlacklistDB(blacklistDB, whitelistDB, blacklist, whitelist).then((res) => { res ? console.log('| Links whitelist foram removidos do banco de dados blacklist') : console.log('| Nenhum links whitelist encontrado no banco de dados blacklist'); });
            await deleteDuplicates(blacklistDB, blacklist).then((res) => { res ? console.log('| Registros duplicados no banco de dados blacklist removidos') : console.log('| Nenhum registros duplicado encontrado no banco de dados blacklist'); });
            console.log('===============================================================================' + '\n')

        }
    } catch (_) { return null }
}

export { updateAll }