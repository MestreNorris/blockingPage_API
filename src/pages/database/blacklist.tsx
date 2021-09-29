import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { numberDuplicates, sortArray } from '../../functions/data/array';
import { getDataAllDatabases } from '../../functions/db/getDatabase';

function databaseBlacklist({ database, duplicates, title }) {
  return (
    <Layout title={title}>
      <div className="container">
        <h1>INFORMAÇÕES DO BANCO DE DADOS BLACKLIST</h1>
        <table className='info'>
          <thead>
            <tr>
              <th>NÚMERO DE REGISTROS DO BANCO DE DADOS</th>
              <th>{database.length}</th>
            </tr>
            <tr>
              <th>NÚMERO DE REGISTROS DUPLICADOS</th>
              <th>{duplicates}</th>
            </tr>
          </thead>
        </table>
        <br />
        <table className='dataBlacklist'>
          <thead>
            <tr>
              <th>ID</th>
              <th>LINK</th>
              <th>DATA DA CRIAÇÃO</th>
              <th>DIAS DE ATIVIDADE</th>
            </tr>
          </thead>
          <tbody>
            {database.map((links) => (
              <tr key={links._id}>
                <td>{links._id}</td>
                <td>{links.link}</td>
                <td>{links.creatAt}</td>
                <td>{links.activityDate.length}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {database.length == 0 &&
              <tr>
                <td colSpan={4} className='colspan'>Nenhum registro no banco de dados</td>
              </tr>}
          </tfoot>
        </table>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getDataAllDatabases();
  let duplicates = 0, database = JSON.parse(JSON.stringify(data.blacklist));
  if (database.length != 0) { database = sortArray(database); duplicates = numberDuplicates(database); }

  return { props: { database, duplicates, title: 'Blacklist' }, revalidate: 10 }
}

export default databaseBlacklist;