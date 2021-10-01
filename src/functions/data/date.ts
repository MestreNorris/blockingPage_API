const dateNow = () => {
    const date = new Date().toLocaleString("pt-br", { timeZone: "America/Sao_Paulo" });
    return (date.split(' ')[0]);
}

const formatDate = (verification_time) => {
    const date = verification_time.split('T')[0];
    const format = date.split('-');
    return (format[2] + "/" + format[1] + "/" + format[0]);
}

export { dateNow, formatDate }