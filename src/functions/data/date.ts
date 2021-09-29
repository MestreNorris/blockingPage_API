const dateNow = () => {
    const dateNow = new Date().toLocaleString("pt-br", { timeZone: "America/Sao_Paulo" });
    return (dateNow.split(' ')[0]);
}

const formatDate = (verification_time) => {
    const date = verification_time.split('T')[0];
    const formatDate = date.split('-');
    return (formatDate[2] + "/" + formatDate[1] + "/" + formatDate[0]);
}

export { dateNow, formatDate }