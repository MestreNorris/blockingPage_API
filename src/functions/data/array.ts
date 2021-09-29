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

const removeDuplicates = (array) => {
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
    return newArray;
}

const sortArray = (database) => {
    database.sort(function (a, b) { return (a.link > b.link) ? 1 : ((b.link > a.link) ? -1 : 0); });
    return database;
}

const searchBinary = (arr, x) => {
    let start = 0, end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid].link === x) { return arr[mid]; }
        else if (arr[mid].link < x) { start = mid + 1; }
        else { end = mid - 1; }
    }
    return false;
}

export { numberDuplicates, sortArray, removeDuplicates, searchBinary };