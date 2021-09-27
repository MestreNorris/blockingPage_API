import { getAllDatabases } from '../db/getDatabase'
import { updateMetricQntRequest } from './request'
import { updateDatabaseBlacklist } from './blacklist'
import { dateNow } from '../../functions/data/info';

const updateAll = async () => {
    try {
        const { blacklistDB, whitelistDB, metricDB } = await getAllDatabases();

        if (metricDB != null) {
            const metricData = await metricDB.findOne();
            updateMetricQntRequest(metricDB, metricData);

            if (metricData.lastUpdate !== dateNow()) {
                await metricDB.updateOne({ _id: metricData._id }, { $set: { lastUpdate: dateNow() } });
                console.log('Atualizando ...');
                updateDatabaseBlacklist(blacklistDB, whitelistDB);
            } else {
                console.log('Atualizado');
            }
        }
    } catch (_) { return null }
}

export { updateAll }