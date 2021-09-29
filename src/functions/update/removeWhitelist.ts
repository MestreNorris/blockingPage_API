import { searchBinary, sortArray } from "../data/array";

const removeWhitelistInBlacklistDB = async (blacklistDB, whitelistDB, dataBlacklist, dataWhitelist) => {
    let isRemoved = false, removeList = [];

    if ((dataBlacklist.length > 0) && (dataWhitelist.length > 0)) {
        dataBlacklist = sortArray(dataBlacklist);

        for (let index = 0; index < dataWhitelist.length; index++) {
            const isExist = searchBinary(dataBlacklist, dataWhitelist[index].link);
            if (isExist != false) { removeList.push(isExist._id); }
        }

        if (removeList.length > 0) { isRemoved = true; await blacklistDB.deleteMany({ _id: { $in: removeList } }); }
    }
    return isRemoved;
}

export { removeWhitelistInBlacklistDB }