export function formatToCurrency(number: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: "BRL" }).format(number)
}