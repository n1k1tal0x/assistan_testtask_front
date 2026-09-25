const MS_PER_DAY = 24 * 60 * 60 * 1000

export function calculateDays(dateFrom: string, dateTo: string): number {
  const from = new Date(dateFrom)
  const to = new Date(dateTo)
  return Math.round((to.getTime() - from.getTime()) / MS_PER_DAY) + 1
}
