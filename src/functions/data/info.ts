const numberDuplicates = (array) => {
    let newArray = [];

    for (let index = 0; index < array.length; index++) {
        if (newArray.length == 0) { newArray.push(array[index]) }
        else {
            let exist = false;
            for (let j = 0; j < newArray.length; j++) {
                if (newArray[j].link == array[index].link) { exist = true; }
            }
            if (exist == false) { newArray.push(array[index]) }
        }
    }
    return (array.length - newArray.length);
}

const sortArray = (database) => {
    database.sort(function (a, b) { return (a.link > b.link) ? 1 : ((b.link > a.link) ? -1 : 0); });
    return database;
}

const dateNow = () => {
    const dateNow = new Date().toLocaleString("pt-br", { timeZone: "America/Sao_Paulo" });
    return (dateNow.split(' ')[0]);
}

export { numberDuplicates, sortArray, dateNow };