import { getDataAllDatabases } from '../../functions/db/getDatabase'
import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';

function databaseMetric({ database, title }) {
  return (
    <Layout title={title}>
      <div className='container'>
        <h1>INFORMAÇÕES DO BANCO DE DADOS METRIC</h1>
        <table className='info'>
          <thead>
            <tr>
              <th>NÚMERO DE REGISTROS DO BANCO DE DADOS</th>
              <th>{database.length}</th>
            </tr>
            <tr>
              <th>ÚLTIMA ATUALIZAÇÃO</th>
              <th>{database[0].lastUpdate}</th>
            </tr>
          </thead>
        </table>
        <br />
        <table className='data'>
          <thead>
            <tr>
              <th colSpan={2}>REQUISIÇÕES REALIZADAS</th>
            </tr>
            <tr>
              <th>DATA</th>
              <th>QUANTIDADE</th>
            </tr>
          </thead>
          <tbody>
            {database[0].qntRequest.map((request, index) => (
              <tr key={index}>
                <td>{request.date}</td>
                <td>{request.numberRequest}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {database[0].qntRequest.length == 0 &&
              <tr>
                <td colSpan={2} className='colspan'>Nenhuma requisição realizada</td>
              </tr>}
          </tfoot>
        </table>
        <br />
        <table className='data'>
          <thead>
            <tr>
              <th colSpan={2}>LINKS BLOQUEADOS</th>
            </tr>
            <tr>
              <th>DATA</th>
              <th>QUANTIDADE</th>
            </tr>
          </thead>
          <tbody>
            {database[0].qntBlockedPhising.map((request, index) => (
              <tr key={index}>
                <td>{request.date}</td>
                <td>{request.qntBlocked}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {database[0].qntBlockedPhising.length == 0 &&
              <tr>
                <td colSpan={2} className='colspan'>Nenhum bloqueio realizado</td>
              </tr>}
          </tfoot>
        </table>
        <br />
        <table className='data'>
          <thead>
            <tr>
              <th colSpan={2}>LISTA DE PÁGINAS MAIS ACESSADAS</th>
            </tr>
            <tr>
              <th>NOME DA PÁGINA</th>
              <th>NÚMERO DE ACESSOS</th>
            </tr>
          </thead>
          <tbody>
            {database[0].listPages.map((request, index) => (
              <tr key={index}>
                <td>{request.pageName}</td>
                <td>{request.qntAcess}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {database[0].listPages.length == 0 &&
              <tr>
                <td colSpan={2} className='colspan'>Nenhuma página acessada</td>
              </tr>}
          </tfoot>
        </table>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getDataAllDatabases();
  const database = JSON.parse(JSON.stringify(data.metric));
  return { props: { database, title: 'Metric' }, revalidate: 10 }
}

export default databaseMetric;