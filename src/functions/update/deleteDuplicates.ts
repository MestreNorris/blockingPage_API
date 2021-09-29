const deleteDuplicates = async (blacklistDB, blacklist) => {
    let listUnique = [], listDuplicates = [], isDuplicate = false;

    for (let index = 0; index < blacklist.length; index++) {
        if (listUnique.length == 0) { listUnique.push(blacklist[index]) }
        else {
            let exist = false;
            for (let j = 0; j < listUnique.length; j++) {
                if (listUnique[j].link === blacklist[index].link) { exist = true; }
            }
            if (exist == false) { listUnique.push(blacklist[index]) }
            else { listDuplicates.push(blacklist[index]._id) }
        }
    }
    if (listDuplicates.length > 0) {
        isDuplicate = true;
        await blacklistDB.deleteMany({ _id: { $in: listDuplicates } });
    }
    return isDuplicate;
}

export { deleteDuplicates }