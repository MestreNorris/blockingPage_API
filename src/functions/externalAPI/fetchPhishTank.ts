const axios = require('axios');
const cheerio = require('cheerio');

const { URL_PHISHTANK } = process.env
let listBlacklist = [];

const browserHeaders = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'cache-control': 'max-age=0',
    'dnt': '1',
    'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome / 93.0.4577.82 Safari / 537.36'
};

const getHtml = async (page) => {
    try { return (await axios.get(URL_PHISHTANK + page, { headers: browserHeaders }).then((response) => response.data)); }
    catch (_) { return false; }
};

const getDataInHtml = (html, dataWhitelist) => {
    const $ = cheerio.load(html);
    const table = $('table > tbody > tr');
    if (table.length > 2) {
        for (let index = 1; index < table.length - 1; index++) {
            const data = $(table[index]).text().split('http');
            const url = 'http' + data[1].split('added')[0];
            const link = isValidUrl(url, dataWhitelist);
            if ((link != null) && (isDuplicate(listBlacklist, link))) { listBlacklist.push(link); }
        }
        return true;
    } else { return false }

};

const fetchDataPhishTank = async (dataWhitelist) => {
    let getData = true, page = 0;

    while (listBlacklist.length) { listBlacklist.pop(); }

    do {
        await getHtml(page)
            .then((html) => {
                if (html) {
                    const data = getDataInHtml(html, dataWhitelist);
                    if (data) { page++; console.log(page); } else { getData = false; }
                } else { getData = false; }
            })
            .catch(() => { getData = false; });
    } while (getData);

    return listBlacklist;
};

function isValidUrl(string, dataWhitelist) {
    try {
        const url = new URL(string);
        const link = url.protocol + "//" + url.host
        if ((link.includes('http')) || (link.includes('https'))) {
            if (dataWhitelist.length != 0) {
                for (let index = 0; index < dataWhitelist.length; index++) {
                    if (dataWhitelist[index].link === link) { return string; }
                }
            }
            return link;
        }
        else { return null; }
    }
    catch (_) { return null }
}

function isDuplicate(array, link) {
    for (let index = 0; index < array.length; index++) { if (array[index] === link) { return false; } }
    return true;
}

export { fetchDataPhishTank }