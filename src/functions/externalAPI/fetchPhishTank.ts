import { removeDuplicates } from '../data/array';
import { formatDate } from '../data/date';
import { fetchData, isValidUrl } from '../data/fetch';

const { URL_PHISHTANK } = process.env
let listBlacklist_PhishTank = [];

const fetchPhishTank = async (dataWhitelist) => {
    let result = { error: false, data: null, response: null }

    await fetchData(URL_PHISHTANK)
        .then((res) => {
            if (!res.error) {
                const database = res.data;
                for (let index = 0; index < database.length; index++) {
                    let url = database[index].url, online = false;
                    let date = formatDate(database[index].verification_time);

                    if ((database[index].online == 'yes') && (database[index].verified == 'yes')) { online = true; }
                    url = isValidUrl(url, dataWhitelist);
                    if ((url != null) && (online == true)) { listBlacklist_PhishTank.push({ link: url, date }) }
                }

                result.data = removeDuplicates(listBlacklist_PhishTank);
                result.error = false;
                result.response = res.response;
            } else { result = res; }
        })
        .catch((_) => { result.error = true });
    return result
}

export { fetchPhishTank }