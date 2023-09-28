import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse<{ data: JSON[] }>> {
  const res = await fetch('https://api.github.com/users/hanle23/repos')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  const filteredResult: JSON[] = data.flatMap((item: any) => {
    if (
      item.visibility !== 'public' ||
      item.fork === true ||
      item.name === 'hanle23'
    ) {
      return []
    }
    return item
  })
  filteredResult.sort(function (a: any, b: any) {
    return new Date(b.pushed_at).valueOf() - new Date(a.pushed_at).valueOf()
  })
  return NextResponse.json({ data: filteredResult })
}
