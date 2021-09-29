const log = (number) => {

    switch (number) {
        case 0: return console.log('Fetch phishTank realizado, banco de dados atualizado com sucesso!');
        case 1: return console.log('Links whitelist foram removidos do banco de dados blacklist');
        case 2: return console.log('Nenhum links whitelist encontrado no banco de dados blacklist');
        case 3: return console.log('Nenhuma atualização do banco de dados blacklist foi realizada');
        case 4: return console.log('A quantidade de requisições realizadas foram atualizadas no banco de dados');
        case 5: return console.log('Registros duplicados no banco de dados blacklist removidos');
        case 6: return console.log('Nenhum registros duplicado encontrado no banco de dados blacklist');
        case 7: return console.log('Fetch openPhish realizado, banco de dados atualizado com sucesso!');
        default: break;
    }
}
export { log }