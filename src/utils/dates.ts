const MONTHS_ES: Record<number, string> = {
  0: "Enero", 1: "Febrero", 2: "Marzo", 3: "Abril",
  4: "Mayo", 5: "Junio", 6: "Julio", 7: "Agosto",
  8: "Septiembre", 9: "Octubre", 10: "Noviembre", 11: "Diciembre"
}

export function getYearRange(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate)
  const startLabel = `${MONTHS_ES[start.getUTCMonth()]} ${start.getUTCFullYear()}`
  const endLabel = endDate != null
    ? (() => { const end = new Date(endDate); return `${MONTHS_ES[end.getUTCMonth()]} ${end.getUTCFullYear()}` })()
    : "Actual"
  return `${startLabel} - ${endLabel}`
}
