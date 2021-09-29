import { removeDuplicates } from '../data/array';
import { formatDate } from '../data/date';
import { fetchData, isValidUrl } from '../data/fetch';

const { URL_PHISHTANK } = process.env
let listBlacklist_PhishTank = [];

const fetchPhishTank = async (dataWhitelist) => {
    let database = await fetchData(URL_PHISHTANK);
    
    if (database) {
        for (let index = 0; index < database.length; index++) {
            let url = database[index].url, online = false;
            let date = formatDate(database[index].verification_time);

            if ((database[index].online == 'yes') && (database[index].verified == 'yes')) { online = true; }
            url = isValidUrl(url, dataWhitelist);
            if ((url != null) && (online == true)) { listBlacklist_PhishTank.push({ link: url, date }) }
        }

        return (removeDuplicates(listBlacklist_PhishTank))
    } else { return null }
};

export { fetchPhishTank }