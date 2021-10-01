import { searchBinary, sortArray } from '../data/array';
import { dateNow } from '../data/date';
import { fetchOpenPhish } from '../externalAPI/fetchOpenPhish';
import { fetchPhishTank } from '../externalAPI/fetchPhishTank';
import { Blacklist } from '../interfaces/index'

const fetchPhishTankAndUpdateDatabase = async (blacklistDB, whitelistDB, dataBlacklist, dataWhitelist) => {
    await fetchPhishTank(dataWhitelist)
        .then(fetchArray => { updateAndInsert(fetchArray, dataBlacklist, blacklistDB, 'phishTank') })
        .catch((_) => { return null });
}

const fetchOpenPhishAndUpdateDatabase = async (blacklistDB, whitelistDB, dataBlacklist, dataWhitelist) => {
    await fetchOpenPhish(dataWhitelist)
        .then(fetchArray => {
            updateAndInsert(fetchArray, dataBlacklist, blacklistDB, 'openPhish');
        })
        .catch((err) => { return err });
}

const newArray = (arrayDatabase, arrayFetch) => {
    const newArr = [], updateActivity = [];

    for (let index = 0; index < arrayFetch.length; index++) {
        const isExist = searchBinary(arrayDatabase, arrayFetch[index].link);
        if (isExist == false) {
            const newBlacklist: Blacklist = {
                link: arrayFetch[index].link,
                creatAt: arrayFetch[index].date,
                activityDate: new Array({ date: dateNow(), phishTank: false, openPhish: false })
            };
            newArr.push(newBlacklist);
        } else { updateActivity.push(isExist); }
    }
    return { newArr, updateActivity };
}

const updateAndInsert = async (fetchArray, dataBlacklist, blacklistDB, typeDatabase) => {
    let updateActivityDatabase = [];
    if (fetchArray != null) {
        if (dataBlacklist.length > 0) { dataBlacklist = sortArray(dataBlacklist); }
        const { newArr, updateActivity } = newArray(dataBlacklist, fetchArray);
        if (newArr.length != 0) { await blacklistDB.insertMany(newArr); }

        if (updateActivity.length > 0) {
            let updateList = [];

            for (let index = 0; index < updateActivity.length; index++) {
                let lastObj = (updateActivity[index].activityDate.length) - 1;
                updateActivityDatabase.push(updateActivity[index]._id);
                if (lastObj < 0) { updateList.push(updateActivity[index]._id); }
                else {
                    if (updateActivity[index].activityDate[lastObj].date != dateNow()) {
                        updateList.push(updateActivity[index]._id);
                    }
                }
            }
            if (updateList.length > 0) {
                await blacklistDB.updateMany({ _id: { $in: updateList } }, { $push: { activityDate: { date: dateNow(), phishTank: false, openPhish: false } } });
            }
            if (updateActivityDatabase.length > 0) {
                if (typeDatabase == 'phishTank') {
                    await blacklistDB.updateMany({ _id: { $in: updateActivityDatabase }, "activityDate.date": dateNow() }, { "$set": { "activityDate.$.phishTank": true } });
                } else if (typeDatabase == 'openPhish') {
                    await blacklistDB.updateMany({ _id: { $in: updateActivityDatabase }, "activityDate.date": dateNow() }, { "$set": { "activityDate.$.openPhish": true } });
                }
            }
        }
    }
}

export { fetchPhishTankAndUpdateDatabase, fetchOpenPhishAndUpdateDatabase };