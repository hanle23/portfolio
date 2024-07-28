export default function CanContinue(
  total: number | null,
  offset: number,
  next: string | null,
): boolean {
  if (total !== null && next === null) {
    return false
  }
  if (total === null) {
    return true
  }
  if (offset < total) {
    return true
  }
  return true
}
