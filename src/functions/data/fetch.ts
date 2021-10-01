import axios from "axios";

const browserHeaders = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-encoding': 'gzip',
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
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome / 93.0.4577.82 Safari / 537.36'
};

const fetchData = async (url) => {
    try { return (await axios.get(url, { headers: browserHeaders }).then((response) => { return response.data })); }
    catch (_) { return null; }
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

export { fetchData, isValidUrl }