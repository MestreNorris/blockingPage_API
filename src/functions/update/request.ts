import { dateNow } from "../data/date";

const updateMetricQntRequest = async (metricDB, metricData) => {
    try {
        const metricQntRequest = metricData.qntRequest;

        if (metricQntRequest.length == 0) {
            metricDB.updateOne({ _id: metricData._id }, { $push: { qntRequest: { date: dateNow(), numberRequest: 1 } } });
        } else {
            let exist = false;
            for (let index = 0; index < metricQntRequest.length; index++) {
                if (metricQntRequest[index].date === dateNow()) {
                    metricQntRequest[index].numberRequest++;
                    metricDB.updateOne({ _id: metricData._id }, { $set: { qntRequest: metricQntRequest } });
                    exist = true;
                }
            }
            if (exist == false) {
                metricDB.updateOne({ _id: metricData._id }, { $push: { qntRequest: { date: dateNow(), numberRequest: 1 } } });
            }
        }
    } catch (_) { return null; }
}

export { updateMetricQntRequest };