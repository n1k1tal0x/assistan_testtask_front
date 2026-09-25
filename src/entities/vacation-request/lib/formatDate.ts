export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
