import { searchBinary, sortArray } from '../data/array';
import { fetchOpenPhish } from '../externalAPI/fetchOpenPhish';
import { fetchPhishTank } from '../externalAPI/fetchPhishTank';
import { Blacklist } from '../interfaces/index'

const fetchPhishTankAndUpdateDatabase = async (blacklistDB, whitelistDB, dataBlacklist, dataWhitelist) => {
    let result = { error: false, data: null, response: null }

    await fetchPhishTank(dataWhitelist)
        .then(res => {
            if (!res.error) {
                updateAndInsert(res.data, dataBlacklist, blacklistDB)
                    .then(() => {
                        result.error = false;
                        result.response = res.response;
                    });
            } else { result = res; }
        })
        .catch((_) => { result.error = true });
    return result;
}

const fetchOpenPhishAndUpdateDatabase = async (blacklistDB, whitelistDB, dataBlacklist, dataWhitelist) => {
    let result = { error: false, data: null, response: null }

    await fetchOpenPhish(dataWhitelist)
        .then(res => {
            if (!res.error) {
                updateAndInsert(res.data, dataBlacklist, blacklistDB)
                    .then(() => {
                        result.error = false;
                        result.response = res.response;
                    });
            } else { result = res; }
        })
        .catch((_) => { result.error = true });
    return result;
}

const newArray = (arrayDatabase, arrayFetch) => {
    const newArr = [];

    for (let index = 0; index < arrayFetch.length; index++) {
        const isExist = searchBinary(arrayDatabase, arrayFetch[index].link);
        if (isExist == false) {
            const newBlacklist: Blacklist = { link: arrayFetch[index].link, creatAt: arrayFetch[index].date };
            newArr.push(newBlacklist);
        }
    }
    return newArr;
}

const updateAndInsert = async (fetchArray, dataBlacklist, blacklistDB) => {
    if (fetchArray != null) {
        const newArr = newArray(sortArray(dataBlacklist), sortArray(fetchArray));

        if (newArr.length != 0) { await blacklistDB.insertMany(newArr); }
    }
}

export { fetchPhishTankAndUpdateDatabase, fetchOpenPhishAndUpdateDatabase };