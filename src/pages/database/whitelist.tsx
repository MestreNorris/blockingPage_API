import { getDataAllDatabases } from '../../functions/db/getDatabase'
import { sortArray, numberDuplicates } from '../../functions/data/info';
import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';

function databaseWhitelist({ database, duplicates, title }) {
  return (
    <Layout title={title}>
      <div className="container">
        <h1>INFORMAÇÕES DO BANCO DE DADOS WHITELIST</h1>
        <table className='info'>
          <thead>
            <tr>
              <th id="database">NÚMERO DE REGISTROS DO BANCO DE DADOS</th>
              <th>{database.length}</th>
            </tr>
            <tr>
              <th id="duplicate">NÚMERO DE REGISTROS DUPLICADOS</th>
              <th>{duplicates}</th>
            </tr>
          </thead>
        </table>
        <br />
        <table className='data'>
          <thead>
            <tr>
              <th>ID</th>
              <th>LINK</th>
              <th>DATA DA CRIAÇÃO</th>
            </tr>
          </thead>
          <tbody className="alignDatabase">
            {database.map((links) => (
              <tr key={links._id}>
                <td>{links._id}</td>
                <td>{links.link}</td>
                <td>{links.creatAt}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {database.length == 0 &&
              <tr>
                <td colSpan={3} className='colspan'>Nenhum registro no banco de dados</td>
              </tr>}
          </tfoot>
        </table>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getDataAllDatabases();
  let duplicates = 0, database = JSON.parse(JSON.stringify(data.whitelist));
  if (database.length != 0) { database = sortArray(database); duplicates = numberDuplicates(database); }

  return { props: { database, duplicates, title: 'Whitelist' }, revalidate: 60 }
}

export default databaseWhitelist;