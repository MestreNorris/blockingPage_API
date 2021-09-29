import { removeDuplicates } from '../data/array';
import { dateNow } from '../data/date';
import { fetchData, isValidUrl } from '../data/fetch';

const { URL_OPENPHISH } = process.env
let listBlacklist_OpenPhish = [];

const fetchOpenPhish = async (dataWhitelist) => {
    const db = await fetchData(URL_OPENPHISH);
    let database = db.split('\n');

    if (database) {
        for (let index = 0; index < database.length; index++) {
            let url = database[index];
            const date = dateNow();

            url = isValidUrl(url, dataWhitelist);
            if (url != null) { listBlacklist_OpenPhish.push({ link: url, date }) }
        }
        return (removeDuplicates(listBlacklist_OpenPhish))
    } else { return null }
}

export { fetchOpenPhish }