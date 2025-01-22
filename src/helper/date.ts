export function diaAnterior() {
    const date = new Date(); // Obtém a data atual
    date.setDate(date.getDate() - 1); // Subtrai um dia
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajusta o mês para 2 dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Ajusta o dia para 2 dígitos
    return `${year}-${month}-${day}`;
}