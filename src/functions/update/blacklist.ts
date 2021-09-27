import { Blacklist } from '../../interfaces/index'
import { sortArray, dateNow } from '../../functions/data/info';
import { fetchDataPhishTank } from '../externalAPI/fetchPhishTank'

const updateDatabaseBlacklist = async (blacklistDB, whitelistDB) => {
    let dataBlacklist = await blacklistDB.find().toArray();
    const dataWhitelist = await whitelistDB.find().toArray();

    await fetchDataPhishTank(dataWhitelist)
        .then(fetchArray => {
            console.log('Processando dos dados coletados de PhishTank');
            if (dataBlacklist.length > 0) { dataBlacklist = sortArray(dataBlacklist); }
            const { newArr, updateActivity } = newArray(dataBlacklist, fetchArray);
            if (newArr.length != 0) { blacklistDB.insertMany(newArr); console.log('Novos links adicionados ao BlacklistDB'); }
            return updateActivity;
        }).then((updateActivity) => {
            if (updateActivity.length > 0) {
                for (let index = 0; index < updateActivity.length; index++) {
                    for (let j = 0; j < dataBlacklist.length; j++) {
                        if (dataBlacklist[j]._id.toString() === updateActivity[index]) {
                            let status = false;
                            for (let k = 0; k < dataBlacklist[j].activityDate.length; k++) {
                                if (dataBlacklist[j].activityDate[k].date == dateNow()) { status = false; break; }
                                else { status = true; }
                            }
                            if (status == true) {
                                blacklistDB.updateOne({ _id: dataBlacklist[j]._id }, { $push: { activityDate: { date: dateNow(), databaseActivity: { pishTank: true, openPhish: false } } } });
                                console.log('Atualizou atividade de 1 documento');
                            }
                            break;
                        }
                    }
                }
            }
            console.log('Processamento concluído');
        });
}

const searchBinary = (arr, x) => {
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid].link === x) { return arr[mid]._id; }
        else if (arr[mid].link < x) { start = mid + 1; }
        else { end = mid - 1; }
    }
    return false;
}

const newArray = (arrayDatabase, arrayFetch) => {
    const newArr = [], updateActivity = [];

    for (let index = 0; index < arrayFetch.length; index++) {
        const isExist = searchBinary(arrayDatabase, arrayFetch[index]);
        if (isExist == false) {
            const newBlacklist: Blacklist = {
                link: arrayFetch[index],
                creatAt: dateNow(),
                activityDate: new Array({ date: dateNow(), databaseActivity: { pishTank: true, openPhish: false } })
            };
            newArr.push(newBlacklist);
        } else { updateActivity.push(isExist.toString()); }
    }
    return { newArr, updateActivity };
}

export { updateDatabaseBlacklist };