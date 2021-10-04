import { performance } from "perf_hooks";
import { NextApiRequest, NextApiResponse } from 'next';
import { getDataAllDatabases } from '../../../functions/db/getDatabase'
import { updateAll } from '../../../functions/update/updateAll'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  var startTime = performance.now();

  const { method } = req;
  const dataDatabase = await getDataAllDatabases();

  try {
    switch (method) {
      case 'GET':
        res.status(200).json(dataDatabase);
        updateAll();
        break;
      case 'POST':
        res.status(200).json(dataDatabase);
        updateAll();
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
        res.status(405).end(`Method ${method} não suportado`)
        break;
    }
  } catch (err) { res.status(500).json({ statusCode: 500, message: err.message }) }

  millisToMinutesAndSeconds((performance.now() - startTime));
}

function millisToMinutesAndSeconds(millis) {
  let segundos = millis / 1000;
  console.log('Tempo de execução:', segundos.toFixed(2) + ' segundos');
}

export default handler;