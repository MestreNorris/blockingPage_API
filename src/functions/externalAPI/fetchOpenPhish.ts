import { removeDuplicates } from '../data/array';
import { dateNow } from '../data/date';
import { fetchData, isValidUrl } from '../data/fetch';

const { URL_OPENPHISH } = process.env
let listBlacklist_OpenPhish = [];

const fetchOpenPhish = async (dataWhitelist) => {
    let result = { error: false, data: null, response: null }

    await fetchData(URL_OPENPHISH)
        .then((res) => {
            if (!res.error) {
                const database = res.data.split('\n');

                for (let index = 0; index < database.length; index++) {
                    let url = database[index];
                    const date = dateNow();

                    url = isValidUrl(url, dataWhitelist);
                    if (url != null) { listBlacklist_OpenPhish.push({ link: url, date }) }
                }
                result.data = removeDuplicates(listBlacklist_OpenPhish);
                result.error = false;
                result.response = res.response;
            } else { result = res; }
        })
        .catch((_) => { result.error = true });
    return result
}

export { fetchOpenPhish }