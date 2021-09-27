import Layout from '../components/Layout'
import { dateNow } from '../functions/data/info';

const IndexPage = () => (
  <Layout title="Home">
    <h1>INFORMAÇÕES DA FERRAMENTA</h1>
    <table className='info'>
      <thead>
        <tr>
          <th>Projeto</th>
          <th>BlockingPage</th>
        </tr>
        <tr>
          <th>Descrição</th>
          <th>Ferramenta para bloqueio de links de phising</th>
        </tr>
        <tr>
          <th>Autor</th>
          <th>Alan Pereira</th>
        </tr>
        <tr>
          <th>Horário</th>
          <th>{dateNow()}</th>
        </tr>
        <tr>
          <th>Versão</th>
          <th>0.0.3</th>
        </tr>
        <tr>
          <th>Banco de dados existentes</th>
          <th>Blacklist | Whitelist | Metric</th>
        </tr>
        <tr>
          <th>Formato da resposta da API</th>
          <th>Json</th>
        </tr>
        <tr>
          <th>Formato de compactação exigido no cabeçalho da requisição</th>
          <th>Accept-Encoding: gzip</th>
        </tr>
      </thead>
    </table>
  </Layout>
)

export default IndexPage
