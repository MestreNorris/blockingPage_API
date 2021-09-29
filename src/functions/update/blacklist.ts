import { searchBinary, sortArray } from '../data/array';
import { dateNow } from '../data/date';
import { fetchDataPhishTank } from '../externalAPI/fetchPhishTank';
import { Blacklist } from '../interfaces/index'

const updateDatabaseBlacklist = async (blacklistDB, whitelistDB, dataBlacklist, dataWhitelist) => {
    await fetchDataPhishTank(dataWhitelist)
        .then(fetchArray => {
            if (fetchArray != null) {
                //Ordena Array
                if (dataBlacklist.length > 0) { dataBlacklist = sortArray(dataBlacklist); }

                //Retorna array com dados para inserir ou atualizar
                const { newArr, updateActivity } = newArray(dataBlacklist, fetchArray);

                //Se tiver dados para adicionar, insira no DB
                if (newArr.length != 0) { blacklistDB.insertMany(newArr); }

                if (updateActivity.length > 0) {
                    let updateList = [];
                    //Identifica atividade dos links diariamente
                    for (let index = 0; index < updateActivity.length; index++) {
                        let lastObj = updateActivity[index].activityDate.length - 1;
                        if (lastObj < 0) {
                            updateList.push(updateActivity[index]._id);
                        } else {
                            if (updateActivity[index].activityDate[lastObj].date != dateNow()) {
                                updateList.push(updateActivity[index]._id);
                            }
                        }
                    }

                    //Atualiza a atividade dos links
                    if (updateList.length > 0) {
                        blacklistDB.updateMany({ _id: { $in: updateList } }, { $push: { activityDate: { date: dateNow(), databaseActivity: { pishTank: true, openPhish: false } } } });
                    }
                }
            }
        }).catch((_) => { return null });
}

const newArray = (arrayDatabase, arrayFetch) => {
    const newArr = [], updateActivity = [];

    for (let index = 0; index < arrayFetch.length; index++) {
        const isExist = searchBinary(arrayDatabase, arrayFetch[index].link);
        if (isExist == false) {
            const newBlacklist: Blacklist = {
                link: arrayFetch[index].link,
                creatAt: arrayFetch[index].date,
                activityDate: new Array({ date: dateNow(), databaseActivity: { pishTank: true, openPhish: false } })
            };
            newArr.push(newBlacklist);
        } else { updateActivity.push(isExist); }
    }
    return { newArr, updateActivity };
}

export { updateDatabaseBlacklist };