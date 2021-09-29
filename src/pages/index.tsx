import Layout from '../components/Layout'
import { dateNow } from '../functions/data/date'

const IndexPage = () => (
  <Layout title="Home">
    <h1>INFORMAÇÕES DA FERRAMENTA</h1>
    <table className='info'>
      <thead>
        <tr>
          <th>PROJETO</th>
          <th>BlockingPage</th>
        </tr>
        <tr>
          <th>DESCRIÇÃO</th>
          <th>Ferramenta para bloqueio de links de phising</th>
        </tr>
        <tr>
          <th>AUTOR</th>
          <th>Alan Pereira</th>
        </tr>
        <tr>
          <th>DATA ATUAL</th>
          <th>{dateNow()}</th>
        </tr>
        <tr>
          <th>VERSÃO</th>
          <th>0.0.3</th>
        </tr>
        <tr>
          <th>BANCO DE DADOS EXISTENTES</th>
          <th>Blacklist | Whitelist | Metric</th>
        </tr>
        <tr>
          <th>FORMATO DE RESPOSTA DA API</th>
          <th>Json</th>
        </tr>
        <tr>
          <th>FORMATO DE COMPACTAÇÃO EXIGIDA NO CABEÇALHO DA REQUISIÇÃO</th>
          <th>Accept-Encoding: gzip</th>
        </tr>
      </thead>
    </table>
  </Layout>
)

export default IndexPage
